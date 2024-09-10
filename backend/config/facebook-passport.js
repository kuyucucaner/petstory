const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const UserModel = require('../models/user-model');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name'] // İstediğiniz Facebook profil bilgileri
},
async function(accessToken, refreshToken, profile, done) {
  try {
    // Kullanıcıyı Facebook profiliyle bul veya yeni bir kullanıcı oluştur
    let user = await UserModel.findOne({ facebookId: profile.id });
    if (!user) {
      // Eğer kullanıcı yoksa, yeni bir kullanıcı oluştur
      user = await UserModel.create({
        facebookId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}
));
