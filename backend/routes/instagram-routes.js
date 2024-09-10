const express = require('express');
const passport = require('passport');
const router = express.Router();

// Instagram giriş rotası
router.get('/auth/instagram', passport.authenticate('oauth2'));

// Instagram callback rotası
router.get('/auth/instagram/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Başarılı giriş sonrasında yönlendirme
    res.redirect('/profile');
  }
);

module.exports = router;
