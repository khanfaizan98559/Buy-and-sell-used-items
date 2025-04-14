const express = require('express');
const router = express.Router();
const {isSignedIn}= require("../middleware.js")

// Home route
router.get('/', (req, res) => {
  console.log(res.locals)
  res.render('pages/index');

});

// router
//   .get("/sell",(req,res,next)=>{
//     isSignedIn,
//   })

// Contact route
router.get('/product', (req, res) => {
  res.render('pages/product');
});

router.get('/contact', (req, res) => {
  res.render('pages/contact');
});

router.get('/about', (req, res) => {
  res.render('pages/about');
});

module.exports = router;