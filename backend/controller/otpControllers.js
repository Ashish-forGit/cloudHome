const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { otpModel } = require('../model/otpSchema'); // Adjust the path as needed
const { userModel } = require('../model/userModel'); // Adjust the path as needed

require('dotenv').config(); // Ensure this is called to load environment variables

const sendOTPMail = async (email, otp) => {
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
            subject: 'OTP for Login',
            text: `Your OTP is ${otp}`, // Plain text version
            html: `
                <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                    <h2 style="color: #4CAF50;">OTP for Login</h2>
                    <p>Hello ,</p>
                    <p>Your OTP for login is:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #FF5722;">${otp}</p>
                    <p>Please use this OTP to complete your login process. It will expire soon, so make sure to use it promptly.</p>
                    <p>Thank you,<br>cloudHome</p>
                </div>
            `
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
        const { email, userId} = req.user;
        const restrictedTimeForOTP = 10 * 60 * 1000;

        const sentOPTMail = await otpModel.findOne({
            email,
            createdAt: {
                $gte: Date.now() - restrictedTimeForOTP,
            },
        });

        if (sentOPTMail) {
            res.status(200);
            res.json({
                status: "success",
                message: `Otp is already is sent to ${email}`,
                data: {
                    createdAt: sentOPTMail.createdAt,
                },
            });
            return;
        }

        console.log("sentOPTMail:", sentOPTMail);

        const randomOTP = Math.floor(Math.random() * 9000 + 1000);

        const isMailSent = await sendOTPMail(email, randomOTP);

        if (!isMailSent) {
            res.status(500);
            res.json({
                status: "Fail",
                message: `Otp NOT sent to ${email}`,
                data: {},
            });
            return;
        }

        await otpModel.create({
            otp: randomOTP,
            email,
            userId
        });

        res.status(201);
        res.json({
            status: "success",
            message: `Otp sent to ${email}`,
            data: {
                otp : randomOTP
            },
        });
    } catch (err) {
        console.log("----------------------------");
        console.log(err);
        console.log("----------------------------");
        res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
            data: err,
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        
        const restrictedTimeForOTP = 10 * 60 * 1000;
        const otpEntry = await otpModel.findOne({
            email,
            createdAt: {
                $gte: Date.now() - restrictedTimeForOTP,
            },
        });

        if (!otpEntry) {
            return res.status(404).json({
                status: 'fail',
                message: 'Verification failed! Please Generate New OTP',
                data: {},
            });
        }


        const hashedOtp =  otpEntry.otp;
        const isCorrect = await otpEntry.verifyOtp(otp, hashedOtp)

        // Check if OTP is expired
        // if (otpEntry.expiresAt < Date.now()) {
        //     return res.status(400).json({
        //         status: 'fail',
        //         message: 'OTP has expired',
        //         data: {},
        //     });
        // }

        // Verify OTP
        // const isValidOtp = await otpEntry.verifyOtp(otp);

        if (!isCorrect) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incorrect OTP',
                data: {},
            });
        }

        await userModel.findOneAndUpdate({ email }, { isEmailVerified: true})

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
