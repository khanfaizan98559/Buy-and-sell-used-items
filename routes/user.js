const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// User routes
router.post('/register', userController.createUser); // Register a new user
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get a user by ID
router.put('/:id', userController.updateUser); // Update a user by ID
router.delete('/:id', userController.deleteUser); // Delete a user by ID
router.post('/login', userController.loginUser); // User login

module.exports = router;