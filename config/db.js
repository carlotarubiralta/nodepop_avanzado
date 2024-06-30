'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + process.env.DB_URI);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (err) {
    console.log('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
