const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
module.exports = app;

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
