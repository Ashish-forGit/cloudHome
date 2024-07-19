const exprees = require('express');
const {  generateOtp } = require('../controller/otpControllers');


const otpRouter = exprees.Router();

otpRouter.get('/generate', generateOtp)



module.exports = {otpRouter};