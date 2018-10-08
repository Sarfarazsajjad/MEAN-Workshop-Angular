const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');

app.use(bodyParser.json());

app.use('/api/posts',postsRoutes);

module.exports = app;