const nodemailer = require('nodemailer');
const crypto = require('crypto');
const OtpModel = require('../model/otpSchema'); // Adjust the path as needed

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

        console.log(response);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};



const generateOtp = async (req, res) => {
    try {
        const { email,  userId } = req.user;
        console.log("----------------->",userId);
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
        await saveOtpToDatabase(email, userId, otp);

        return res.status(201).json({
            status: "success",
            message: `OTP sent to ${email}`,
            data: {
                email,
                userId,
                otp
            },
        });
    } catch (err) {
        console.log("----------------------------");
        console.log(err);
        console.log("----------------------------");
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
            data: err,
        });
    }
};

const saveOtpToDatabase = async (email, userId, otp) => {
    try {
        const newOtp = new OtpModel({
            email,
            userId, // Ensure userId is included
            otp
        });

        await newOtp.save();
    } catch (error) {
        console.error("Error saving OTP to database:", error);
        throw error;
    }
};




module.exports = { generateOtp };
