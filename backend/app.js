const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

app.use(bodyParser.json());

app.use('/api/posts',postsRoutes);
app.use('/api/user',userRoutes);

module.exports = app;