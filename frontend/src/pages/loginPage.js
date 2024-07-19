import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { ImSoundcloud2 } from "react-icons/im";
import '../../SignupPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, loading, error } = useLogin();

  const validateEmail = (email) => {
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password && password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      login({ email, password });
    }
  };

  return (
    <div className="signup-container">
      <ImSoundcloud2 />
      <img src="./img/logo.png" alt="cloudHome" className="logo" />
      <input
        type="text"
        placeholder="Email"
        className="signup-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <div className="error-message">{emailError}</div>}
      <input
        type="password"
        placeholder="Password"
        className="signup-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <div className="error-message">{passwordError}</div>}
      {error && <div className="error-message">{error}</div>}
      <button className="signup-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default LoginPage;
