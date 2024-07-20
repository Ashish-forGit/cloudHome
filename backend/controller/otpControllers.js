const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { otpModel } = require('../model/otpSchema'); // Adjust the path as needed
const { userModel } = require('../model/userModel'); // Adjust the path as needed

require('dotenv').config(); // Ensure this is called to load environment variables

const sendOtpMail = async (email, otp) => {
    try {
        let mailer = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const response = await mailer.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for login',
            text: `Your OTP is ${otp}`
        });

        console.log('Email sent:', response);
        return true;
    } catch (error) {
        console.log('Error sending email:', error);
        return false;
    }
};

const generateOtp = async (req, res) => {
    try {
        const { email } = req.user; // Changed from req.user to req.body for consistency

        console.log(`Generating OTP for email: ${email}`);

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
                data: {},
            });
        }

        

        // Generate random OTP
        const otp = crypto.randomInt(1000, 9999).toString(); // Ensure OTP is a string

        const isMailSent = await sendOtpMail(email, otp);

        if (!isMailSent) {
            return res.status(500).json({
                status: "fail",
                message: `OTP NOT sent to ${email}`,
                data: {},
            });
        }

        // Create an entry in the database with that OTP
        await saveOtpToDatabase(email, user._id, otp);

        return res.status(201).json({
            status: "success",
            message: `OTP sent to ${email}`,
            data: {
                email,
                userId: user._id,
                otp
            },
        });


        if (user.isEmailVerified) {
            return res.status(200).json({
                status: 'already_verified',
                message: 'User is already verified',
                data: {},
            });
        }
    } 
    catch (err) {
        console.log('Error generating OTP:', err);
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
            data: err,
        });
    }
};

const saveOtpToDatabase = async (email, userId, otp) => {
    try {
        

        const newOtp = new otpModel({
            email,
            userId,
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
        });

        const savedOtp = await newOtp.save();
        console.log('OTP saved:', savedOtp);
    } catch (error) {
        console.error("Error saving OTP to database:", error);
        throw error;
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        console.log(`Verifying OTP for email: ${email}, OTP: ${otp}`);

        // Find the latest OTP entry by email
        const otpEntry = await otpModel.findOne({ email }).sort({ createdAt: -1 });

        if (!otpEntry) {
            return res.status(400).json({
                status: 'fail',
                message: 'OTP not found',
                data: {},
            });
        }

        // Check if OTP is expired
        if (otpEntry.expiresAt < Date.now()) {
            return res.status(400).json({
                status: 'fail',
                message: 'OTP has expired',
                data: {},
            });
        }

        // Verify OTP
        const isValidOtp = await otpEntry.verifyOtp(otp);

        if (!isValidOtp) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid OTP',
                data: {},
            });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
                data: {},
            });
        }

        // Mark user as verified
        user.isEmailVerified = true;
        await user.save();

        // Optionally, delete the used OTP from the database
        await otpModel.deleteOne({ _id: otpEntry._id });

        return res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully',
            data: {},
        });

    } catch (err) {
        console.error('Error verifying OTP:', err);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal Server Error',
            data: err,
        });
    }
};

module.exports = { generateOtp, verifyOtp };
