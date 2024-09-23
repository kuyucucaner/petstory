const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model');

const googleAuthCallback = async (req, res) => {
  const { googleId, firstName, lastName, email, photo } = req.user;

  console.log("Google User Data:", req.user); // Google'dan gelen veriler

  try {
    // Google'dan gelen email veya googleId ile kullanıcı olup olmadığını kontrol et
    let user = await UserModel.findOne({ email });

    if (!user) {
      // Eğer kullanıcı yoksa, yeni bir kullanıcı oluştur
      user = new UserModel({
        googleId,
        email,
        firstName,
        lastName,
        photo,
      });
      await user.save(); // Yeni kullanıcıyı veritabanına kaydet
    }

    // Kullanıcı zaten varsa veya yeni oluşturulduysa JWT token oluştur
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }); // Token'ı cookie'ye kaydediyoruz

    res.redirect('http://localhost:3000/'); // Başarılı girişten sonra yönlendirme
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};


// Logout işlemi
const logout = (req, res) => {
  req.logout(); // Kullanıcıyı çıkış yap
  res.redirect('/'); // Ana sayfaya yönlendir
};

module.exports = { googleAuthCallback, logout };
