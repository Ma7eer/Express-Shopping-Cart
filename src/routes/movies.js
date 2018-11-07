const express = require('express');
const router = express.Router();
const Movie = require('../models/product');

// show movies form
router.get('/add', function(req, res, next) {
  res.render('movies/new');
});

// add new movie
router.post('/add', function(req, res, next) {
  let movie = new Movie({
    imagePath: req.body.imagePath,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  });
  movie.save();
  res.redirect('/');
});

module.exports = router;