const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika içinde
  max: 100, // Her IP için maksimum 100 istek
  message: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin."
});

module.exports = limiter;
