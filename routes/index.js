const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('pages/index');
});

// Contact route
router.get('/contact', (req, res) => {
  res.render('pages/contact');
});

module.exports = router;