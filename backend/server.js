const express = require('express');
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
const registerRoutes = require('./routes/register-routes');

require('dotenv').config();

connectDB();
// Uygulama oluşturma
const app = express();

// Orta katmanlar (middlewares)
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());
app.use(compression());

//Routes 
app.use('/api/v1/register', registerRoutes);



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