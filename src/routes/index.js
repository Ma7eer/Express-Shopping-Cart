var express = require('express');
var router = express.Router();

/* setting up enviroment variables */
require('dotenv/config');

var stripe = require("stripe")(process.env.STRIPE_API_KEY);

var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  console.log(process.env.STRIPE_API_KEY);
  Product.find(function(err, docs) {
    res.render('shop/index', { products: docs, successMsg: successMsg });
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
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', { totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
});

router.post('/checkout', function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('shop/cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    if(err) {
      req.flash('error', err.message);
      res.redirect('/checkout');
    }
    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');
});
})

module.exports = router;
