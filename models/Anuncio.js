'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  venta: { type: Boolean, required: true },
  precio: { type: Number, required: true },
  foto: { type: String, required: true },
  tags: { type: [String], index: true },
  traducciones: {
    en: { type: String }
  }
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
