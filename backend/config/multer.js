const multer = require('multer');
const sanitize = require('sanitize-filename'); // sanitize-filename modülünü kullanın

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const sanitizedFileName = sanitize(Date.now() + '-' + file.originalname);
    cb(null, sanitizedFileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
