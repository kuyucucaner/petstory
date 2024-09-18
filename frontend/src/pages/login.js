// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/auth-slice';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading, error } = auth;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)); // Login action'ı dispatch ediliyor
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Giriş başarılı olduğunda yapılacak işlemler (örneğin yönlendirme)
      console.log('Giriş başarılı!');
    }
  }, [isAuthenticated]);

  return (
    <form onSubmit={onSubmit}>
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
      <button type="submit" disabled={loading}>
        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
