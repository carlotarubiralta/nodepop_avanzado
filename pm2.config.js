'use strict';

module.exports = {
    apps: [
      {
        name: 'app',
        script: './bin/www',
        env: {
          PORT: 3000, // Cambia este valor si es necesario
          NODE_ENV: 'development'
        },
        env_production: {
          PORT: 3000, // Cambia este valor si es necesario
          NODE_ENV: 'production'
        }
      },
      {
        name: 'thumbnailCreator',
        script: './microservices/thumbnailCreator.service.js',
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };
  