// src/components/Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/auth-slice';
import '../styles/register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  const { firstName, lastName, email, password, phone } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !phone) {
      console.error('Tüm alanlar doldurulmalıdır!');
      return;
    }
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Kayıt başarılı!');
      // Örneğin yönlendirme eklenebilir: navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="Adınız"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Soyadınız"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="E-posta"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Şifre"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Telefon"
              className="form-input"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="form-button">
            {loading ? 'Kayıt Oluyor...' : 'Kayıt Ol'}
          </button>
          <button type="button" className="form-button-login">
  <Link to="/login" className="button-link">Giriş Yap</Link>
</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
