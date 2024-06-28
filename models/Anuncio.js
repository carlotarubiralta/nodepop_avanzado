const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  venta: { type: Boolean, required: true },
  precio: { type: Number, required: true },
  foto: { type: String, required: true },
  tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'], required: true }
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
