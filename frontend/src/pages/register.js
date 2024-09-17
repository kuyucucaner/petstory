// src/components/Register.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/auth-slice';

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading, error } = auth;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  const { firstName, lastName, email, password, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Kayıt başarılı olduğunda yapılacaklar, örneğin yönlendirme
      console.log('Kayıt Başarılı!');
      // Örneğin, yönlendirme: navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={onChange}
          placeholder="Adınız"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={onChange}
          placeholder="Soyadınız"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="E-posta"
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Şifre"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={onChange}
          placeholder="Telefon"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Kayıt Oluyor...' : 'Kayıt Ol'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;
