const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  details:{
    type:Object,
    title: { type: String, required: true }, // Product name
    category: { type:mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
     },
     condition:{ type: String, required: true }, // Condition of the product (e.g., new, used)
     description: [{ type: String, required: true }], // Product description
     features: [{
      type: Object,
      featureType: { type: String, required: true }, // Type of feature (e.g., color, size)
      featureValue: { type: String, required: true }, // Value of the feature (e.g., red, large)      
     }], // List of product features

  },
  images: [{ type: String}], // Array of image URLs
  pricing:{
    type:Object,
    basePrice: { type: Number, required: true }, // Original price
    offerPrice: { type: Number, required: true }, // Discounted price
    discountedPrice: { type: Number, required: true }, // Price after discount
    taxRate: { type: Number, required: true }, // Tax rate
    shippingOptions: {
      type: Object,
      freeShipping: { type: Boolean, default: false }, // Free shipping option
      shippingCost: { type: Boolean, default: false }, // Shipping cost
      shippingCost:{ type: Number, default: 0 }, // Cost of shipping
      returnPolicy: { type: String, default: 'No Return Policy', enum:["No", "30-days","7-days"] }, // Return policy
    },
  },
  
  address: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Address', // Reference to the Address model
    default:null
  }, // Location of the product
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default:null
  },
  buyer:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null // Reference to the User model
  }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


module.exports = Product;