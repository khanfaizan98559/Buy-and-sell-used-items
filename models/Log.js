const mongoose = require('mongoose');

// Define the log schema
const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Reference to the User associated with the log
  },
  actionType: {
    type: String,
    required: true,
    enum: ['PRODUCT_VISIT', 'SEARCH'] // Predefined action types
  },
  details: {
    type: String, // Additional details about the action (e.g., product title or search query)
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now // When the action occurred
  },
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema) || mongoose.model('Log', logSchema);

module.exports = Log; // Export the Log model for use in other parts of the application