const express = require('express');
const passport = require('passport');
const router = express.Router();

// Twitter giriş rotası
router.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter callback rotası
router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Başarılı giriş sonrasında yönlendirme
    res.redirect('/profile');
  }
);

module.exports = router;
