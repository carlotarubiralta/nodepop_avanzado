const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true, maxlength: 100 },
  venta: { type: Boolean, required: true },
  precio: { type: Number, required: true, min: 0 },
  foto: { type: String, required: true, trim: true },
  tags: { 
    type: [String], 
    required: true, 
    enum: ['work', 'lifestyle', 'motor', 'mobile'],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4'] 
  }
});

function arrayLimit(val) {
  return val.length <= 4;
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
