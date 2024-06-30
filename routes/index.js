const express = require('express');
const router = express.Router();
const anunciosController = require('../controllers/anunciosController');

// Ruta para obtener anuncios (con vistas)
router.get('/', anunciosController.getAnuncios);

// Ruta para obtener anuncios (API)
router.get('/api/anuncios', anunciosController.getAnunciosAPI);

// Ruta para crear un anuncio
router.post('/api/anuncios', anunciosController.createAnuncio);

// Ruta para actualizar la foto de un anuncio
router.put('/api/anuncios/:id/foto', anunciosController.updateAnuncioFoto);

// Ruta para eliminar un anuncio
router.delete('/api/anuncios/:id', anunciosController.deleteAnuncio);

// Middleware para manejar errores 404
router.use((req, res, next) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

// Middleware global para manejo de errores
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor', details: err.message });
});

module.exports = router;
