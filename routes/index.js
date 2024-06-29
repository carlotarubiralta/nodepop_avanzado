const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const { nombre, venta, precioMin, precioMax, tag, page = 1, limit = 8, sort = 'nombre' } = req.query;
    const filters = {};

    if (nombre) {
      filters.nombre = new RegExp(`^${nombre}`, 'i'); // Filtrar por nombre que empiece con el dato buscado
    }
    if (venta !== undefined && venta !== '') {
      filters.venta = venta === 'true'; // Filtrar por tipo de anuncio (venta o búsqueda)
    }
    if (precioMin || precioMax) {
      filters.precio = {};
      if (precioMin) filters.precio.$gte = Number(precioMin);
      if (precioMax) filters.precio.$lte = Number(precioMax);
    }
    if (tag) {
      filters.tags = tag; // Filtrar por tag
    }

    const anuncios = await Anuncio.find(filters)
      .skip((Number(page) - 1) * limit)
      .limit(Number(limit))
      .sort(sort);

    const totalAnuncios = await Anuncio.countDocuments(filters);
    const totalPages = Math.ceil(totalAnuncios / limit);

    res.render('index', { 
      title: 'Nodepop', 
      anuncios, 
      nombre: nombre || '', 
      venta: venta || '', 
      precioMin: precioMin || '', 
      precioMax: precioMax || '', 
      tag: tag || '',
      page: Number(page),
      limit: Number(limit),
      sort,
      totalPages
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
