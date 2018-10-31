process.env.NODE_ENV = 'development';
const mongoose = require('mongoose');
const data = require('./testData/index.js');
const seed = require('./seed.js');
const DB_URL = require('../config/index.js');

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => seed(data))
  .then(() => {
    console.log('development database seeded');
    mongoose.disconnect();
  });