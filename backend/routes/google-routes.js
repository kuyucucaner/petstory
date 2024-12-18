const express = require('express');
const passport = require('passport');
const { googleAuthCallback , logout } = require('../controllers/google-contoller');
const recaptcha = require('../config/recaptcha');
const router = express.Router();
const rateLimit = require('../config/rate-limit');

// Google OAuth giriş rotası
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth geri dönüş rotası (JWT token oluşturulur)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthCallback
);

router.post('/verify-captcha' , rateLimit ,recaptcha);
// Çıkış işlemi
router.get('/logout', logout);

module.exports = router;
