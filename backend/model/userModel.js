const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    imageUrl: String,
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
userSchema.methods.verifyPassword = async (password, hashedPassword) =>{
    return bcrypt.compare(password, hashedPassword);
}
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
    }
    next();
});

const userModel = mongoose.model('Users', userSchema);

module.exports = { userModel }; 
