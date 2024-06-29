const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

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

router.get('/anuncios', async (req, res, next) => {
  try {
    const { nombre, venta, precio, tag, start = 0, limit = 10, sort = 'nombre' } = req.query;
    const filters = {};

    if (nombre) {
      filters.nombre = new RegExp(`^${nombre}`, 'i'); // Filtrar por nombre que empiece con el dato buscado
    }
    if (venta !== undefined) {
      filters.venta = venta === 'true'; // Filtrar por tipo de anuncio (venta o búsqueda)
    }
    if (precio) {
      const [minPrecio, maxPrecio] = precio.split('-').map(Number);
      filters.precio = {};
      if (!isNaN(minPrecio)) filters.precio.$gte = minPrecio;
      if (!isNaN(maxPrecio)) filters.precio.$lte = maxPrecio;
    }
    if (tag) {
      filters.tags = tag; // Filtrar por tag
    }

    const anuncios = await Anuncio.find(filters)
      .skip(Number(start))
      .limit(Number(limit))
      .sort(sort);

    res.json({ success: true, results: anuncios });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
