require('dotenv').config();
const exprees = require('express');
const {authRouter} = require('./routes/authRoutes.js')
const cors = require('cors');
const { otpRouter } = require('./routes/otpRoutes.js');
const { verify } = require('jsonwebtoken');
const verifyToken = require('./middlewares/verifyToken.js');
require('./config/db.js')


const app = exprees();
app.use(exprees.json());

app.use(cors({origin: true}));

app.use('/api/v1/auth', authRouter);

app.use(verifyToken);

app.use('/api/v1/otp', otpRouter);

app.listen(process.env.PORT,()=>{
    console.log(`----------Server started -> ${process.env.PORT}---------`);
})