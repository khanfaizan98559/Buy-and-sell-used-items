const express = require('express');
const router = express.Router();
const logController = require('../controller/Log');

// Log routes
router.post('/', logController.createLog); // Create a new log entry
router.get('/', logController.getAllLogs); // Get all logs
router.get('/user/:userId', logController.getLogsByUserId); // Get logs by user ID
router.get('/:id', logController.getLogById); // Get a single log by ID
router.get('/recent/10days', logController.getLast10DaysLogs); // Get logs from the last 10 days
router.delete('/:id', logController.deleteLog); // Delete a log by ID

module.exports = router;