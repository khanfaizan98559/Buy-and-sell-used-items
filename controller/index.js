const validate = require('../middleware/validate.js');
const {  cloudinary,storage } = require('../middleware/cloudConfig.js'); // Import multer and cloudinary
const multer = require('multer'); // Import multer for file uploads
const upload = multer({ storage });
const Product = require('../models/Product.js'); // Import the Product model
const User  = require('../models/user.js'); // Import the User model
const Category = require('../models/Category.js'); // Import the Category model
const Address=require("../models/Address.js")
const productController=require("./product.js")

module.exports.renderSellPage=async (req, res) => {
  const categories=await productController.getAllCategories();
  res.render('pages/sell',{categories});
};

module.exports.listProduct = async(req, res) => {
  let currUser;
  currUser=req.user

  let {details, pricing, address} = req.body;
  
  const data={
    details:{
      title:details.title,
      description:details.description,
      category:details.category,
      condition:details.condition,
      features:details.features,
    },
    pricing:pricing,
  }

  const newProduct=new Product(data)
  validate.validateProduct(newProduct)
  
  if(address.alias.toLowerCase()==="other"){
    let data={
      user:currUser,
      alias:address.otherAlias,
      street:address.street,
      city:address.city,
      state:address.state,
      zipCode:address.zipCode,
      country:address.country
    }
    validate.validateAddress(data)
    const newAddress=new Address(data);
    await newAddress.save();
    newProduct.address=newAddress;
    currUser.addresses.push(newAddress);

  }else{
    newProduct.address=await Address.findOne({user:currUser, alias:address.alias});
  }
  
  
  if(details.category.toLowerCase() === "other"){
    validate.validateCategory(details.otherCategory)
    let otherCategory=details.otherCategory
    const newCategory = new Category({name:otherCategory});
    newCategory.products.push(newProduct)
    await newCategory.save();
    newProduct.details.category=newCategory;
  }else{
    newProduct.details.category=await Category.findOne({name:details.category});
  }

  newProduct.seller=currUser;

  newProduct.images = [];

  if (req.files && req.files.images && Array.isArray(req.files.images)) {
    for (const file of req.files.images) {
      const imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: `/SwapNest/products/${newProduct._id}` },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error);
            }
            resolve(result.secure_url);
          }
        );
        uploadStream.end(file.buffer); // Stream the buffer
      });

      newProduct.images.push(imageUrl);
    }
  }

  await newProduct.save();
  currUser.sellingProducts.push(newProduct)
  await currUser.save()

  res.redirect('/');
};
