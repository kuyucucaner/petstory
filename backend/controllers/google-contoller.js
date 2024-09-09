const jwt = require('jsonwebtoken');


const googleAuthCallback = (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


  res.cookie('token', token, { httpOnly: true });

  res.status(200).json({ token });
};


const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports ={ googleAuthCallback , logout };