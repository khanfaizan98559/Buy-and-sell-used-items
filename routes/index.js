const express = require('express');
const router = express.Router();
const { isSignedIn } = require("../middleware.js");
const indexController = require('../controller/index.js');
const {  cloudinary,productStorage } = require('../middleware/cloudConfig'); // Import multer and cloudinary
const multer = require('multer');
const upload=multer(productStorage);
const productController=require("../controller/product.js")
const Product=require("../models/Product.js")
const Log =require("../models/Log.js")


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
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('pages/error', {
                errorCode: 404,
                errorMessage: "Product Not Found",
                description: "The product you are looking for does not exist or has been removed."
            });
        }
        // if(req.user){
        //   const newLog = new Log({
        //     userId: req.user,
        //     actionType: "PRODUCT_VISIT",
        //     details: product.details.title,
        //   });
        //   await newLog.save();
        //   await req.user.logs.append(newLog);
        //   await req.user.save();
        // }
          
        res.render('pages/product', { product });
    } catch (error) {
        res.status(500).render('pages/error', {
            errorCode: 500,
            errorMessage: "Internal Server Error",
            description: "An error occurred while fetching the product. Please try again later."
        });
    }
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

router.get("/error",(req,res)=>{
  res.render('pages/error');
})


module.exports = router;