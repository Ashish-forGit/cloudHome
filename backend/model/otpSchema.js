const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectId } = mongoose.Schema.Types;

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'Users', // Adjust the reference model name if needed
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 30 * 60 * 1000, // Expires in 10 minutes
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash the OTP before saving
otpSchema.pre('save', async function (next) {
    if (this.isModified('otp')) {
        this.otp = await bcrypt.hash(this.otp, 12);
    }
    next();
});

// Verify OTP method
otpSchema.methods.verifyOtp = async function (otp) {
    return bcrypt.compare(otp, this.otp);
};

const otpModel = mongoose.model('OTPs', otpSchema);

module.exports = { otpModel } ;
