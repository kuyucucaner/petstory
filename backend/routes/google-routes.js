const express = require('express');
const passport = require('passport');
const { googleAuthCallback , logout } = require('../controllers/google-contoller');

const router = express.Router();


// Google OAuth giriş rotası
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth geri dönüş rotası (JWT token oluşturulur)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthCallback
);

// Çıkış işlemi
router.get('/logout', logout);

module.exports = router;
