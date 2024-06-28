var express = require('express');
var router = express.Router();
var Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const { nombre, venta, precio, tag, start, limit, sort } = req.query;
    const filters = {};

    if (nombre) {
      filters.nombre = new RegExp('^' + nombre, 'i'); // Filtrar por nombre que empiece con el dato buscado
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
      .skip(Number(start) || 0)
      .limit(Number(limit) || 10)
      .sort(sort || 'nombre');

    res.render('index', { 
      title: 'Nodepop', 
      anuncios: anuncios, 
      nombre: nombre || '', 
      venta: venta || '', 
      precio: precio || '', 
      tag: tag || '',
      start: start || 0,
      limit: limit || 10,
      sort: sort || 'nombre'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
