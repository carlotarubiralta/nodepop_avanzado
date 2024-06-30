const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio'); // Asegúrate de que la ruta es correcta

mongoose.connect('mongodb://localhost/nodepop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', async () => {
  try {
    console.log('Connected to MongoDB');
    const anuncios = await Anuncio.find({});
    console.log('Anuncios:', anuncios);
  } catch (error) {
    console.error('Error retrieving data:', error);
  } finally {
    mongoose.disconnect();
  }
});
