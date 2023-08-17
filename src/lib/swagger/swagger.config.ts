import swaggerJsDoc from 'swagger-jsdoc';

import { config } from '../../config';

export const swaggerDocsOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Backend Test',
      version: config.APP_VERSION,
      description: `<h3 style="margin-bottom:0">This is a REST API developed by the Wizeline Backend Team</h3>`,
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Local server',
      },
      // {
      //   url: `https://${config.API_DOMAIN}`,
      //   description: 'Dev server',
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/routes/**/*.ts',
    './routes/**/*.js',
    './src/lib/swagger/swagger.definitions.ts',
    './lib/swagger/swagger.definitions.js',
  ],
};