import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'rule-validator-api Api-documentation',
      version: '0.1.0',
      description:
            'This is an app that validates relevant inputs ',
      contact: {
        name: 'Mupenzi cedrick',
        url: 'https://pextech.github.io/MyRezume/html/',
        email: 'mcstain1639@gmail.com',
      },
    },
    servers: [
      {
        url: 'https://rule-validator.herokuapp.com/',
      },
    ],
    produces: ['application/json'],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

export default router;
