const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Category name
  coverImage: { type: String }, // URL for the category cover image
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } // Products under this category
  ]
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category; // Export the Category model

