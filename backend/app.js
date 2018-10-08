const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const Post = require('./models/post');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );

  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  console.log(post);
  post.save((err) => {
    if (err) console.log(err);
  });
  res.status(201).json({
    message: 'post was created successfully',
    post: post
  });
})

app.get('/api/posts', (req, res, next) => {
  Post.find().then((postDocuments) => {
    res.status(200).json({
      message: 'Posts fetched from server successfully',
      posts: postDocuments
    });
  })
});

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if(post){
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found!'});
    }s
  });
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title : req.body.title,
    content : req.body.content
  });

  Post.updateOne({ _id: req.body._id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: 'update successful!'});
  });
});

app.delete('/api/posts/:id', (req, res, next)=>{
  Post.deleteOne({_id:req.params.id},(err)=>{
    if(err){
      console.log('error deleting');
      res.send('error deleting post:'+req.params.id);
    } 
    else{
      res.status(200).json({
        message: 'Post deleted successfully',
        postId: req.params.id
      });
    }
  });
});

module.exports = app;