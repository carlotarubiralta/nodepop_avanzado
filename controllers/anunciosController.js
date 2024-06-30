const Anuncio = require('../models/Anuncio');
const path = require('path');
const { publish } = require('../lib/queue');

// Obtener todos los anuncios
exports.getAnuncios = async (req, res, next) => {
  try {
    const { nombre, venta, precioMin, precioMax, tag, page = 1, limit = 8, sort = '_id', lang } = req.query;

    // Establecer el idioma si se proporciona en la consulta
    if (lang) {
      res.setLocale(lang);
    }

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

    const skip = (Number(page) - 1) * Number(limit);

    const anuncios = await Anuncio.find(filters)
      .skip(skip)
      .limit(Number(limit))
      .sort(sort);

    const totalAnuncios = await Anuncio.countDocuments(filters);
    const totalPages = Math.ceil(totalAnuncios / limit);

    const anunciosTraducidos = anuncios.map(anuncio => {
      const nombreTraducido = req.getLocale() === 'en' ? (anuncio.traducciones?.en || anuncio.nombre) : anuncio.nombre;
      const tagsTraducidos = anuncio.tags.map(tag => req.__(`tag_${tag}`));
      return { ...anuncio._doc, nombre: nombreTraducido, tags: tagsTraducidos };
    });

    res.render('index', {
      title: req.__('title'),
      anuncios: anunciosTraducidos,
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

// Obtener anuncios para la API
exports.getAnunciosAPI = async (req, res, next) => {
  try {
    const { nombre, venta, precioMin, precioMax, tag, page = 1, limit = 8, sort = '_id' } = req.query;
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

    const skip = (Number(page) - 1) * Number(limit);

    const anuncios = await Anuncio.find(filters)
      .skip(skip)
      .limit(Number(limit))
      .sort(sort);

    const totalAnuncios = await Anuncio.countDocuments(filters);
    const totalPages = Math.ceil(totalAnuncios / limit);

    const anunciosTraducidos = anuncios.map(anuncio => {
      const nombreTraducido = req.getLocale() === 'en' ? (anuncio.traducciones.en || anuncio.nombre) : anuncio.nombre;
      const tagsTraducidos = anuncio.tags.map(tag => req.__(`tag_${tag}`));
      return { ...anuncio._doc, nombre: nombreTraducido, tags: tagsTraducidos };
    });

    res.json({
      success: true,
      results: anunciosTraducidos,
      total: totalAnuncios,
      page: Number(page),
      totalPages,
    });
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo anuncio
exports.createAnuncio = async (req, res, next) => {
  try {
    const { nombre, venta, precio, tags } = req.body;

    if (!nombre || !venta || !precio || !tags || !req.file) {
      return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
    }

    const foto = req.file.filename;

    const anuncio = new Anuncio({
      nombre,
      venta,
      precio,
      tags: tags.split(','),
      foto
    });

    await anuncio.save();

    res.status(201).json({ success: true, result: anuncio });
  } catch (err) {
    next(err);
  }
};

// Actualizar la foto de un anuncio
exports.updateAnuncioFoto = async (req, res, next) => {
  try {
    const anuncioId = req.params.id;
    const anuncio = await Anuncio.findById(anuncioId);

    if (!anuncio) {
      return res.status(404).json({ success: false, error: 'Anuncio no encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'La imagen es obligatoria' });
    }

    const foto = req.file.filename;
    anuncio.foto = foto;

    await anuncio.save();

    // Publicar una tarea en la cola para crear un thumbnail
    publish('thumbnail', {
      imagePath: path.join(__dirname, '../public/images/anuncios', foto),
      thumbnailPath: path.join(__dirname, '../public/images/thumbnails', foto)
    });

    res.json({ success: true, result: anuncio });
  } catch (err) {
    next(err);
  }
};

// Eliminar un anuncio
exports.deleteAnuncio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Anuncio.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Anuncio no encontrado' });
    }

    res.json({ success: true, message: 'Anuncio eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};
