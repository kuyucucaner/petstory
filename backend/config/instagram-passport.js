const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const UserModel = require('../models/user-model');
const axios = require('axios');

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://api.instagram.com/oauth/authorize',
  tokenURL: 'https://api.instagram.com/oauth/access_token',
  clientID: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/instagram/callback"
},
async function(accessToken, refreshToken, params, done) {
  try {
    // Instagram API'den kullanıcı bilgilerini alma
    const response = await axios.get('https://graph.instagram.com/me', {
      params: {
        fields: 'id,username',
        access_token: accessToken
      }
    });

    const profile = response.data;

    // Kullanıcıyı Instagram ID'sine göre bul veya yeni bir kullanıcı oluştur
    let user = await UserModel.findOne({ instagramId: profile.id });
    if (!user) {
      user = await UserModel.create({
        instagramId: profile.id,
        firstName: profile.username, // Instagram'da ad ve soyad yok, bu nedenle username kullanılıyor
        lastName: '', // Instagram'dan lastName bilgisi alınmadığı için boş bırakıyoruz
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}
));
