const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio');
const fs = require('fs');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/nodepop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');

  // Leer datos de anuncios.json
  const anunciosData = JSON.parse(fs.readFileSync('./anuncios.json', 'utf8'));

  // Borrar colección existente y cargar nuevos datos
  return Anuncio.deleteMany({})
    .then(() => {
      return Anuncio.insertMany(anunciosData.anuncios);
    })
    .then(() => {
      console.log('Base de datos inicializada');
      mongoose.connection.close();
    });
}).catch(err => {
  console.error('Error:', err);
  mongoose.connection.close();
});
