const axios = require("axios");
require("dotenv").config();

/**
 * Google reCAPTCHA doğrulama middleware'i.
 * Kullanıcının gönderdiği CAPTCHA token'ını doğrular.
 */
const recaptchaMiddleware = async (req, res, next) => {
  const { token } = req.body; // Kullanıcıdan gelen CAPTCHA token'ı
  const secretKey = process.env.RECAPTCHA_SECRETKEY; // .env'den alınan reCAPTCHA gizli anahtarı
  console.log(process.env.RECAPTCHA_SECRETKEY); // Bu çıktıyı kontrol edin

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "CAPTCHA token eksik.",
    });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    const { success, score } = response.data;

    if (success && score > 0.5) {
      req.recaptcha = { success: true, score }; // req içine doğrulama sonucunu ekleyin
      return next(); // Middleware'in başarılı şekilde devam etmesini sağlar
    } else {
      return res.status(400).json({
        success: false,
        message: "CAPTCHA doğrulaması başarısız.",
      });
    }
  } catch (error) {
    console.error("reCAPTCHA doğrulama hatası:", error.message);
    return res.status(500).json({
      success: false,
      message: "Sunucu hatası. CAPTCHA doğrulaması gerçekleştirilemedi.",
    });
  }
};

module.exports = recaptchaMiddleware;
