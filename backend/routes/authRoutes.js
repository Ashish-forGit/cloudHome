const exprees = require('express')
const {signUp,logIn} = require('../controller/authControllers.js')
const authRouter = exprees.Router();

authRouter.route('/signup').post(signUp)
authRouter.route('/login').post(logIn)


module.exports = {authRouter};