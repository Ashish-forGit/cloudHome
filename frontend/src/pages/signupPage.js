import React, { useState } from 'react';
import useSignup from '../hooks/useSignup';
import '../../SignupPage.css'; // Adjust the path if necessary
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup } = useSignup();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return password.length >= 6 && passwordRegex.test(password);
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long and contain at least one special character and one number.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      signup({ email, password });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
      <div className="logo-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQwUhRIiizAYHYlPyiVC_g3D2jw4TR2QpyA&s" alt="Logo" className="logo" />
        </div>
      <h3>cloudHome</h3>
      
        <input
          type="text"
          placeholder="Email"
          className="signup-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error-message">{emailError}</div>}
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button onClick={handleSubmit} className="signup-button">
          Sign Up
        </button>
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
