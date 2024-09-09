const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger seçenekleri
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pet Adoption API',
      version: '1.0.0',
      description: 'Pet Adoption API documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Sunucu URL'si
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger'ın dokümantasyonu çekmesi gereken dosyalar
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
