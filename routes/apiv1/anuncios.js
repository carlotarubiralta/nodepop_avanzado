const express = require('express');
const router = express.Router();
const anunciosController = require('../../controllers/anunciosController');
const upload = require('../../middlewares/upload');

// Swagger documentation
/**
 * @swagger
 * /apiv1/anuncios:
 *   get:
 *     summary: Obtiene una lista de anuncios
 *     tags: [Anuncios]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del artículo
 *       - in: query
 *         name: venta
 *         schema:
 *           type: boolean
 *         description: Tipo de anuncio (venta o búsqueda)
 *       - in: query
 *         name: precio
 *         schema:
 *           type: string
 *         description: Rango de precio (min-max)
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Tag del artículo
 *       - in: query
 *         name: start
 *         schema:
 *           type: integer
 *         description: Índice de inicio para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de resultados
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Orden de los resultados
 *     responses:
 *       200:
 *         description: Lista de anuncios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Anuncio'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Anuncio:
 *       type: object
 *       required:
 *         - nombre
 *         - venta
 *         - precio
 *         - foto
 *         - tags
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del artículo
 *         venta:
 *           type: boolean
 *           description: Indica si el artículo está en venta (true) o en búsqueda (false)
 *         precio:
 *           type: number
 *           description: Precio del artículo
 *         foto:
 *           type: string
 *           description: URL de la foto del artículo
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags del artículo
 */

// Ruta para obtener anuncios
router.get('/anuncios', anunciosController.getAnunciosAPI);

// Ruta para la creación de anuncios con imagen
router.post('/anuncios', upload.single('foto'), anunciosController.createAnuncio);

// Ruta para actualizar la imagen de un anuncio existente
router.put('/anuncios/:id/foto', upload.single('foto'), anunciosController.updateAnuncioFoto);

router.delete('/anuncios/:id', anunciosController.deleteAnuncio);

module.exports = router;
