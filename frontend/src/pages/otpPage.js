import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../AuthPage.css';
import Navbar from '../components/navbar';
import useGenerateNewOtp from '../hooks/usegenerateNewOtp';
import useVerifyOtp from '../hooks/useVerifyOtp';

const OtpPage = () => {

    const { email } = useSelector( (e)=>e.auth )
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const { generateNewOtp } = useGenerateNewOtp();
  const { verifyOtp } = useVerifyOtp();

  const handleSubmit = async () => {
    if(otp.length<4){
        alert('Please enter 4 digit OTP')
    }else{
        const num = parseInt(otp);
        if (num >= 1000 && num <=9999) {
          await verifyOtp(email, otp);
        } else{
            alert('Invalid otp! Please enter correct otp')
        }
    }
    
  };



  useEffect(() => {
    generateNewOtp();
}, []);

  return (
    <>
    <Navbar/>
    <div className="otp-page-container">
                <p>Email : {email}</p>
                <div className="otp-input-container">
                    <input maxLength={4} type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <div className="otp-column c1" />
                    <div className="otp-column c2" />
                    <div className="otp-column c3" />
                    <div className="otp-column c4" />
                </div>
                <button onClick={handleSubmit}>Verify Otp</button>
            </div>
    </>
  );
};

export default OtpPage;
