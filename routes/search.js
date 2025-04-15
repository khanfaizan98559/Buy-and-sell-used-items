const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product=require("../models/Product.js")

    router.get('/', async (req, res) => {
    const query = req.query.q;

    // Validate that the query is a string
    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ error: 'Invalid search query' });
    }

    try {
        const regex = new RegExp(query, 'i');
        const results = await Product.find({ 'details.title': { $regex: regex } });
        res.json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
