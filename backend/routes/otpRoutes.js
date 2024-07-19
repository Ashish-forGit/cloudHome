const exprees = require('express');
const {  generateOtp, verifyOtp } = require('../controller/otpControllers');


const otpRouter = exprees.Router();

otpRouter.get('/generate', generateOtp)
otpRouter.post('/verify', verifyOtp);



module.exports = {otpRouter};