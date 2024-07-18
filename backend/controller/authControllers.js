const { userModel } = require('../model/userModel'); 
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');

dotenv.config();

const generateJWTToken = (obj) => {
    try {
        const token = jwt.sign(
            {
                exp: 120, // seconds
                data: obj
            },
            process.env.JWT_SECRET_KEY
        );
        return token;

    } catch (error) {
        console.error("Error generating JWT:", error);
        return null;
    }
}

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Log the request body
        console.log(req.body);

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required",
                data: {}
            });
        }

        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already exists',
                data: {}
            });
        }

        // Create a new user (password will be hashed in the pre-save hook)
        const user = await userModel.create({ email, password });

        res.status(201).json({
            status: 'success',
            message: 'User created',
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    isEmailVerified: user.isEmailVerified
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: error
        });
    }
};

const logIn = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required"
            });
        }

        // Check if the email exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid user',
                data:{}
            });
        }

         // Check if the password is correct
        const isPasswordCorrect = await user.verifyPassword(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid password',
                data: {}
            });
        }
        

        // Log in the user
        res.status(200).json({
            status: 'success',
            message: 'User logged in',
            data: {
                user: {
                    name: user.name,
                    email: user.email
                },
                token: generateJWTToken({
                    _id: user._id, 
                    email: user.email 
                }) 
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = { signUp, logIn };
