const express = require('express');
const passport = require('passport');
const { googleAuthCallback , logout } = require('../controllers/google-contoller');

const router = express.Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     googleAuth:
 *       type: oauth2
 *       flows:
 *         authorizationCode:
 *           authorizationUrl: https://accounts.google.com/o/oauth2/auth
 *           tokenUrl: https://oauth2.googleapis.com/token
 *           scopes:
 *             profile: Access to your profile information
 *             email: Access to your email address
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Google OAuth ile giriş
 *     tags:
 *       - Authentication
 *     description: Google OAuth 2.0 ile kullanıcı kimlik doğrulaması başlatır.
 *     responses:
 *       302:
 *         description: Kullanıcıyı Google OAuth 2.0 kimlik doğrulama sayfasına yönlendirir.
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth geri dönüş (callback)
 *     tags:
 *       - Authentication
 *     description: Google OAuth kimlik doğrulamasından geri dönüş sağlar ve JWT token oluşturur.
 *     responses:
 *       200:
 *         description: Başarılı kimlik doğrulama, JWT token ile birlikte döner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       302:
 *         description: Kimlik doğrulama başarısız olursa login sayfasına yönlendirir.
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Çıkış yap
 *     tags:
 *       - Authentication
 *     description: Kullanıcıyı sistemden çıkarır.
 *     responses:
 *       200:
 *         description: Başarılı çıkış
 */

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
