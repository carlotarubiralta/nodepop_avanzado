const Anuncio = require('../models/Anuncio');

exports.getAnuncios = async (req, res, next) => {
  try {
    const { nombre, venta, precioMin, precioMax, tag, page = 1, limit = 8, sort } = req.query;
    const filters = {};

    if (nombre) {
      filters.nombre = new RegExp(`^${nombre}`, 'i');
    }
    if (venta !== undefined && venta !== '') {
      filters.venta = venta === 'true';
    }
    if (precioMin || precioMax) {
      filters.precio = {};
      if (precioMin) filters.precio.$gte = Number(precioMin);
      if (precioMax) filters.precio.$lte = Number(precioMax);
    }
    if (tag) {
      filters.tags = tag;
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
};

exports.getAnunciosAPI = async (req, res, next) => {
  try {
    const { nombre, venta, precioMin, precioMax, tag, start, limit, sort } = req.query;
    const filters = {};

    if (nombre) {
      filters.nombre = new RegExp(`^${nombre}`, 'i');
    }
    if (venta !== undefined && venta !== '') {
      filters.venta = venta === 'true';
    }
    if (precioMin || precioMax) {
      filters.precio = {};
      if (precioMin) filters.precio.$gte = Number(precioMin);
      if (precioMax) filters.precio.$lte = Number(precioMax);
    }
    if (tag) {
      filters.tags = tag;
    }

    const anuncios = await Anuncio.find(filters)
      .skip(Number(start) || 0)
      .limit(Number(limit) || 10)
      .sort(sort || 'nombre');

    const totalAnuncios = await Anuncio.countDocuments(filters);

    res.json({ success: true, results: anuncios, total: totalAnuncios });
  } catch (err) {
    next(err);
  }
};
