const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
  chat: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Chat', 
    required: true // Reference to the Chat this message belongs to
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true // Reference to the User who sent the message
  },
  content: { 
    type: String, 
    required: true // The text content of the message
  },
  timestamp: { 
    type: Date, 
    default: Date.now // When the message was sent
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);