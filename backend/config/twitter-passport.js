const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const UserModel = require('../models/user-model');

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback",
  includeEmail: true // Twitter API'den e-posta bilgisi almak için
},
async function(token, tokenSecret, profile, done) {
  try {
    // Kullanıcıyı Twitter ID'sine göre bul veya yeni bir kullanıcı oluştur
    let user = await UserModel.findOne({ twitterId: profile.id });
    if (!user) {
      user = await UserModel.create({
        twitterId: profile.id,
        firstName: profile.displayName.split(' ')[0], // Eğer firstName ve lastName tek bir alanda ise
        lastName: profile.displayName.split(' ')[1] || '', // LastName olmayabilir
        email: profile.emails ? profile.emails[0].value : null, // Bazı durumlarda e-posta gelmeyebilir
        photo: profile.photos[0].value // Profil fotoğrafı
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}
));
