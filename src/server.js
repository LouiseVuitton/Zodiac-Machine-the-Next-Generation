// src/server.js

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

// LOAD MONGOOSE PACKAGEZ
const mongoose = require('mongoose');

// CONNECT TO MongoDB, CREATE AND USE DATABASE
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// IMPORT MODELS
require('./models/file.model.js');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
const router = require('./routes');
app.use(express.static(publicPath));
app.use('/api', router);


app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
