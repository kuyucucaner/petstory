const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db'); // DB konfigurasyonu
const { swaggerUi, swaggerSpec } = require('./config/swagger'); // Swagger Dokumantasyonu
const rateLimiter = require('./config/rate-limit'); // Fazla İstek Koruması !!
const xss = require('xss-clean'); // Cross Site Scripting Koruması !!
const hpp = require('hpp'); // HTTP Parametre Kirlenmesine Karşı Koruma
const compression = require('compression'); // Gzip Sıkıştırması

require('dotenv').config();
require('./config/google-passport');
require('./config/facebook-passport');
require('./config/twitter-passport');
require('./config/instagram-passport');

// Routes References
const registerRoutes = require('./routes/register-routes');
const loginRoutes = require('./routes/login-routes');
const googleRoutes = require('./routes/google-routes');
const facebookRoutes = require('./routes/facebook-routes');
const instagramRoutes = require('./routes/instagram-routes');
const twitterRoutes = require('./routes/twitter-routes');

connectDB();
// Uygulama oluşturma
const app = express();

// Orta katmanlar (middlewares)
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(xss());
app.use(hpp());
app.use(compression());

// Passport.js ayarları
app.use(passport.initialize());
app.use(passport.session());

//Routes 
app.use('/api/v1/register', registerRoutes);
app.use('/api/v1/login', loginRoutes);
app.use(googleRoutes);
app.use(facebookRoutes);
app.use(instagramRoutes);
app.use(twitterRoutes);




app.use(helmet());

app.use(morgan('dev'));
app.use(rateLimiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Frontend build klasörünü backend üzerinden sunma
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Diğer tüm istekler için index.html dosyasını sunma
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Bir hata oluştu!');
});

// Port Ayarlama ve Sunucuyu Başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));