import React from 'react'
import '../../SignupPage.css';

const LoginPage = () => {
    
  return (
    <div className="signup-container">
            <input type='text' placeholder='Username' className="signup-input" />
            <input type='password' placeholder='Password' className="signup-input" />
            <button className="signup-button">Login</button>
        </div>
  )
}

export default LoginPage;