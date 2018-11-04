const express = require('express');
const router = express.Router();
const User = require('../models/user');
const brcypt = require('bcrypt');

router.post("/signup", (req, res, next) => {
  brcypt.hash(req.body.password, 10)
    .then(hash => {
      let user = new User({
        email: req.body.email,
        password: hash
      })

      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created',
            result: result
          })
        }).catch(err => {
          res.status(500).json({
            error: err
          })
        });

    });
});

module.exports = router;