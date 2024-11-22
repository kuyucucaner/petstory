// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/auth-slice';
import GoogleLoginButton from '../components/google-login-button';  // Google butonunu ekledik
import '../styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error('Email veya şifre boş olamaz');
      return; // Eğer email veya şifre boşsa, işlemi durdur
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Giriş başarılı!');
      // Giriş başarılı olduğunda yapılacak işlemler
    }
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className='login-title'>Giriş Yap</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="E-posta"
              required
              className="form-input-email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Şifre"
              required
              className="form-input-password"
            />
          </div>
          <button type="submit" disabled={loading} className="form-button">
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
          <button type="button" className="form-button-register">
  <Link to="/register" className="button-link">Kayıt Ol</Link>
</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="google-login-section">
          <GoogleLoginButton />
        <Link to="/reset-password-request" className='reset-password-request'>Şifremi Unuttum</Link>
          </div>
      </div>
    </div>
  );
};

export default Login;
