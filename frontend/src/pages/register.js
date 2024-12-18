import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/auth-slice";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(""); // Şifre gücü durumu
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const { firstName, lastName, email, password, confirmPassword, phone } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({ ...formData, [name]: value });
  
    if (name === "password") {
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength);
      document.querySelector("input[name='password']").className = `form-input ${strength}`;
    }
  
    if (name === "confirmPassword") {
      const isMatch = value === formData.password;
      const className = isMatch ? "match" : "no-match";
      document.querySelector("input[name='confirmPassword']").className = `form-input ${className}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
      alert("Tüm alanlar doldurulmalıdır!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    if (!recaptchaToken) {
      alert("Lütfen reCAPTCHA doğrulamasını tamamlayın.");
      return;
    }

    // Formu gönder
    dispatch(registerUser({ ...formData, recaptchaToken }));
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return "Zayıf";
    }
    const hasNumbers = /\d/.test(password);
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && hasNumbers && hasLetters && hasSpecialChars) {
      return "Güçlü •";
    }
    if (password.length >= 6 && hasNumbers && hasLetters) {
      return "Orta •";
    }
    return "Zayıf •";
  };

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
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Telefon"
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
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Şifreyi Tekrar Girin"
              className="form-input"
              required
            />
          </div>
          
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
              Şifre Gücü: {passwordStrength}
            </p>

          <div className="form-group">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={onRecaptchaChange}
            />
          </div>
          <button type="submit" disabled={loading} className="form-button">
            {loading ? "Kayıt Oluyor..." : "Kayıt Ol"}
          </button>
          <Link to="/login" className="form-button-login">
            Giriş Yap
          </Link>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
