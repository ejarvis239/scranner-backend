const mongoose = require('mongoose');
const express = require('express');
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');

const app = express();
const DB_URL = process.env.DB_URL || require('./config/index.js')
const { handle404s, handle400s, handle500s } = require('./errors');
console.log(DB_URL, '<<<<<<<');
mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log(`Database ${DB_URL} connected`));

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.get("/", (req, res, next) =>
  res.sendFile(`${__dirname}/views/index.html`)
);

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
});

app.use(handle404s);

app.use(handle400s);

app.use(handle500s);

module.exports = app;
