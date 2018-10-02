const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );

  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
})

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "saldskfj",
      title: "post 1",
      content: "post 1 content from server"
    },
    {
      id: "kljhfafa",
      title: "post 2",
      content: "post 2 content from server"
    }
  ];

  res.status(200).json({
    message: 'Posts fetched from server successfully',
    posts: posts
  });
});

module.exports = app;