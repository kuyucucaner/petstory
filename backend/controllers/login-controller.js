const UserModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await UserModel.findOne({ email }).select('+password');
      if (!user) {
        return res.status(400).json({ message: 'Geçersiz email girdiniz.' });
      }
      console.log("User password:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log('is Match : ' , isMatch);
      if (!isMatch) {
        return res.status(400).json({ message: 'Geçersiz şifre girdiniz.' });
      }
  
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
  
    } catch (error) {
      console.error("Sunucu Hatası:", error.message);
      res.status(500).json({ message: 'Sunucu hatası' });
    }
  };
  

module.exports = login;
