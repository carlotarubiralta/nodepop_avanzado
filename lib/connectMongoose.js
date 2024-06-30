'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const connectMongoose = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectMongoose;
