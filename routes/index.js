const express = require('express');
const router = express.Router();
const { isSignedIn } = require("../middleware.js");

// Home route
router.get('/', (req, res) => {
  res.render('pages/index');
});

// Sell page route
router.get('/sell', (req, res) => {
  res.render('pages/sell');
});

// Product page route
router.get('/product', (req, res) => {
  res.render('pages/product');
});

// Contact page route
router.get('/contact', (req, res) => {
  res.render('pages/contact');
});

// About page route
router.get('/about', (req, res) => {
  res.render('pages/about');
});

router.get('/faq', (req, res) => {
  res.render('pages/faq');
});

module.exports = router;