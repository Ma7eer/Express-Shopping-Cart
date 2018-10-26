var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    res.render('shop/index', { products: docs });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart.totalQty);
    res.redirect('/');
  })
});

router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    res.render('shop/cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('shop/cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', { totalPrice: cart.totalPrice});
})

module.exports = router;
