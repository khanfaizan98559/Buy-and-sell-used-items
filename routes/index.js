const express = require('express');
const router = express.Router();
const { isSignedIn } = require("../middleware.js");
const indexController = require('../controller/index.js');
const {  cloudinary,productStorage } = require('../middleware/cloudConfig'); // Import multer and cloudinary
const multer = require('multer');
const upload=multer(productStorage);
const productController=require("../controller/product.js")
const Product=require("../models/Product.js")



router.get('/', async(req, res) => {
  const categories =await productController.getRandomCategories();
  const featuredProducts = await productController.getRandomProducts();
  const newArrival = await productController.getRandomProducts();
  const forYou = await productController.getRandomProducts();
  res.render('pages/index',{categories,featuredProducts,newArrival,forYou});
});

// Sell page route
router
.route('/sell')
.get(indexController.renderSellPage)
.post(
  upload.fields([
  { name: 'images'}]),
  indexController.listProduct),


// Product page route
router.get('/product/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id)
  res.render('pages/product',{product});
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

router.get('/chat',(req, res) => {
  res.render('pages/chat');
});

router.get('/sellerterms', (req, res) => {
  res.render('pages/sellerterms');
});

router.get('/privacy', (req, res) => {
  res.render('pages/privacy');
});


module.exports = router;