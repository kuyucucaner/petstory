import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';  // Backend'deki Google OAuth rotası
  };

  return <button onClick={handleGoogleLogin}>Google ile Giriş Yap</button>;
};

export default GoogleLoginButton;
