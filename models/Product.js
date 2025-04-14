const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  images: [{ type: String, required: true }], // Array of image URLs
  price: { type: Number, required: true }, // Original price
  offerPrice: { type: Number, required: true }, // Discounted price
  description: { type: String, required: true }, // Product description
  features: [{ type: String }], // List of product features
  brand: { type: String, required: true }, // Brand name
  services: [{ type: String }], // List of services (e.g., free delivery, warranty)
  location: { type: String, required: true }, // Location of the product
  category: { type:mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
   }, 
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true // Reference to the User model
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);