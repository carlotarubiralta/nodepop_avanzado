const cote = require('cote');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs-extra');

// Configuración del microservicio
const responder = new cote.Responder({ name: 'Thumbnail Creator Service' });

responder.on('create-thumbnail', async (req, cb) => {
  const { imagePath } = req;
  const thumbnailDir = path.join('public', 'images', 'thumbnails');
  const thumbnailPath = path.join(thumbnailDir, path.basename(imagePath));

  try {
    // Crear el directorio de thumbnails si no existe
    await fs.ensureDir(thumbnailDir);

    const image = await Jimp.read(imagePath);
    await image.resize(100, 100).writeAsync(thumbnailPath);
    cb(null, { thumbnailPath });
  } catch (error) {
    cb(error);
  }
});
