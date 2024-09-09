const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


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
        url: 'http://localhost:5000', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
