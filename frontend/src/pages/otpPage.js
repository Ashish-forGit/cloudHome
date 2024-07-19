import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLogout } from '../store/slices/authSlice';
import '../../AuthPage.css';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar';

const OtpPage = () => {

    const { email } = useSelector( (e)=>e.auth )
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    if(otp.length<4){
        alert('Please enter 4 digit OTP')
    }else{
        const num = parseInt(otp);
        if (num >= 1000 && num <=9999) {
            alert("correct otp is "+num)
        } else{
            alert('Invalid otp! Please enter correct otp')
        }
    }
    
  };

  const handleLogout = () => {
    dispatch(appLogout());
  };

  return (
    <>
    <Navbar/>
    <div className="auth-page">
      <div className="auth-container">
        <p>Email: {email}</p>
        <input
            maxLength={4}
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="auth-input"
        />
        <div className='otp-column c1'/>
        <div className='otp-column c2'/>
        <div className='otp-column c3'/>
        <div className='otp-column c4'/>
        <button onClick={handleSubmit} className="auth-button">
          Verify
        </button>
        
      </div>
    </div>
    </>
  );
};

export default OtpPage;
