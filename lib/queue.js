const Queue = require('bull');
const path = require('path');

// Crear una cola para thumbnails
const thumbnailQueue = new Queue('thumbnail', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '' // Cambia esto si tienes autenticación en tu instancia de Redis
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
