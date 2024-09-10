const express = require('express');
const passport = require('passport');
const router = express.Router();

// Facebook giriş rotası
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook callback rotası
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

module.exports = router;
