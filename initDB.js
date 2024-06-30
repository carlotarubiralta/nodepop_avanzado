const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio');
const fs = require('fs');

mongoose.connect('mongodb://localhost/nodepop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', async () => {
  try {
    console.log('Connected to MongoDB');

    // Leer datos del archivo anuncios.json
    const data = fs.readFileSync('anuncios.json', 'utf8');
    const anuncios = JSON.parse(data);

    // Eliminar todos los anuncios existentes
    await Anuncio.deleteMany({});
    console.log('Existing data cleared');

    // Insertar nuevos anuncios con traducciones
    await Anuncio.insertMany(anuncios);
    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  } finally {
    mongoose.disconnect();
  }
});
