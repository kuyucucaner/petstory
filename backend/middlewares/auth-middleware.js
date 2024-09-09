const jwt = require('jsonwebtoken');

const AuthMiddleware = function (req, res, next) {
  const token = req.header('x-auth-token');


  if (!token) {
    return res.status(401).json({ message: 'Token yok, yetkilendirilmemiş' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
};

module.exports = AuthMiddleware;
