const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req, res, next) => {
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

router.get('', (req, res, next) => {
  Post.find().then((postDocuments) => {
    res.status(200).json({
      message: 'Posts fetched from server successfully',
      posts: postDocuments
    });
  })
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if(post){
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found!'});
    }s
  });
});

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next)=>{
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

module.exports = router;