const express = require('express');
const router = express.Router();
const chatController = require('../controller/Chat');

// Chat routes
router.post('/', chatController.createChat); // Create a new chat
router.get('/user/:userId', chatController.getUserChats); // Get all chats for a user
router.get('/:chatId', chatController.getChatById); // Get a single chat by ID
router.delete('/:chatId', chatController.deleteChat); // Delete a chat by ID

// Message routes
router.post('/message', chatController.sendMessage); // Send a message in a chat
router.get('/:chatId/messages', chatController.getMessagesByChatId); // Get all messages in a chat

module.exports = router;