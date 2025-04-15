const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
module.exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all products
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller').populate('category');
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product by ID
module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller').populate('category');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product by ID
module.exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a product by ID
module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get products by category
module.exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('seller');
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search products by name
module.exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const products = await Product.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get 20 random products
module.exports.getRandomProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 20 } }, // Randomly select 20 products
      {
        $lookup: {
          from: 'users', // Populate seller details
          localField: 'seller',
          foreignField: '_id',
          as: 'seller',
        },
      },
      {
        $lookup: {
          from: 'categories', // Populate category details
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
    ]);

    res.status(200).json({ success: true, products });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new category
module.exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all categories
module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single category by ID
module.exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('products');
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a category by ID
module.exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a category by ID
module.exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get 20 random categories
module.exports.getRandomCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      { $sample: { size: 20 } }, // Randomly select 20 categories
      {
        $lookup: {
          from: 'products', // Populate products in each category
          localField: '_id',
          foreignField: 'category',
          as: 'products',
        },
      },
    ]);

    res.status(200).json({ success: true, categories });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
  }
};

