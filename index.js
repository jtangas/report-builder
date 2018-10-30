'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import ip from 'ip';
import compression from 'compression';

import routes from './server/routes';
import devServer from './server/middleware/devServer';
import renderTemplate from './templates/index-page';

mongoose.connect('mongodb://localhost:27018');

const { NODE_ENV, PORT } = process.env;

let app = express();
let port = PORT || 5000;
let router = routes();

app.use(compression());

if (NODE_ENV === 'development') {
  devServer(app);
}

router.use((req, res, next) => {
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.get('*', (req, res) => {
  if (NODE_ENV === 'development') {
    renderTemplate('main.js');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

app.listen(port, '0.0.0.0', err => {
  if (err) console.log(err);

  console.log('LAN: ' + ip.address());
  console.log('PORT: ' + port);
});