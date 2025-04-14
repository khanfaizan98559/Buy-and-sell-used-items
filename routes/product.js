const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

// Product routes
router.post('/', productController.createProduct); // Create a new product
router.get('/', productController.getAllProducts); // Get all products
router.get('/:id', productController.getProductById); // Get a product by ID
router.put('/:id', productController.updateProduct); // Update a product by ID
router.delete('/:id', productController.deleteProduct); // Delete a product by ID
router.get('/category/:categoryId', productController.getProductsByCategory); // Get products by category
router.get('/search', productController.searchProducts); // Search products by name

// Category routes
router.post('/category', productController.createCategory); // Create a new category
router.get('/categories', productController.getAllCategories); // Get all categories
router.get('/category/:id', productController.getCategoryById); // Get a category by ID
router.put('/category/:id', productController.updateCategory); // Update a category by ID
router.delete('/category/:id', productController.deleteCategory); // Delete a category by ID

module.exports = router;