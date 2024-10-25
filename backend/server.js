const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db'); // DB configuration
const { swaggerUi, swaggerSpec } = require('./config/swagger'); // Swagger Documentation
const rateLimiter = require('./config/rate-limit'); // Rate Limiting Protection
const xss = require('xss-clean'); // XSS Protection
const hpp = require('hpp'); // HTTP Parameter Pollution Protection
const compression = require('compression'); // Gzip Compression

require('dotenv').config();
require('./config/google-passport');

// Routes References
const registerRoutes = require('./routes/register-routes');
const loginRoutes = require('./routes/login-routes');
const googleRoutes = require('./routes/google-routes');
const petRoutes = require('./routes/pet-routes');
const itemRoutes = require('./routes/item-routes');
const userRoutes = require('./routes/user-routes');

// Database connection
connectDB();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Logging HTTP requests

// Security headers (Helmet)
helmet({
  crossOriginResourcePolicy: false,
})
// CORS configuration (Allowing your React frontend)
app.use(cors({
  origin: 'http://localhost:3000', // React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials like cookies
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Protection against XSS, HTTP parameter pollution, etc.
app.use(xss());
app.use(hpp());

// Compression (Gzip)
app.use(compression());

// Rate Limiter
app.use(rateLimiter);

// Express session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Serve cookies only over HTTPS in production
      httpOnly: true, // Prevent client-side access to cookies
      sameSite: 'Lax', // CSRF protection (Lax or Strict is better)
    },
  })
);

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/v1/register', registerRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/pet', petRoutes);
app.use('/api/v1/item', itemRoutes);
app.use('/api/v1/user', userRoutes);
app.use(googleRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static files - Images and other uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS for the /uploads endpoint
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow React frontend
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Serve the frontend React build (production)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route to serve React app's index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred!' });
});

// Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
