const UserModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

 const register = async (req, res) => {
  const { firstName, lastName, email, password , phone} = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor' });
    }
    user = new UserModel({
      firstName,
      lastName,
      email,
      password,
      phone
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sunucu Hatası');
  }
};
module.exports = register;