import React from 'react';
import GoogleImage from '../images/google.png';
import '../styles/google-login.css';
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';  // Backend'deki Google OAuth rotası
  };

  return <button className='google-login-button' onClick={handleGoogleLogin}><img className='google-image' src={GoogleImage} alt=" Google Login Image"/></button>;
};

export default GoogleLoginButton;
