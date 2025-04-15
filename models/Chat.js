const mongoose = require('mongoose');

// Define the chat schema
const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Two users involved in the chat
  ],
  messages: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Message' } // References to messages in this chat
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message' // Reference to the last message in the chat
  }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema) || mongoose.model('Chat', chatSchema);
module.exports = Chat;