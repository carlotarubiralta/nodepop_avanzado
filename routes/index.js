const express = require('express');
const router = express.Router();
const anunciosController = require('../controllers/anunciosController');

/* GET home page. */
router.get('/', anunciosController.getAnuncios);

module.exports = router;
