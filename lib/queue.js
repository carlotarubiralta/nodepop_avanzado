'use strict';

const Queue = require('bull');
const path = require('path');

// Crear una cola para thumbnails
const thumbnailQueue = new Queue('thumbnail', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '' 
  }
});

// Función para publicar tareas en la cola
function publish(queueName, data) {
  switch (queueName) {
    case 'thumbnail':
      thumbnailQueue.add(data);
      break;
    default:
      throw new Error(`Unknown queue: ${queueName}`);
  }
}

module.exports = {
  publish
};
