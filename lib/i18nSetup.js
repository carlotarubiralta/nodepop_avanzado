'use strict';

const i18n = require('i18n');
const path = require('path');

// Configuración de i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'es',
  queryParameter: 'lang',
  cookie: 'nodepop-locale',
  register: global,
  syncFiles: true,
  autoReload: true
});

module.exports = i18n;
