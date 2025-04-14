const Chat = require('../models/Chat');
const Message = require('../models/Message');

// Create a new chat
exports.createChat = async (req, res) => {
  try {
    const { participants } = req.body;

    // Ensure exactly two participants
    if (participants.length !== 2) {
      return res.status(400).json({ success: false, message: 'A chat must have exactly two participants.' });
    }

    // Check if a chat between these participants already exists
    const existingChat = await Chat.findOne({ participants: { $all: participants } });
    if (existingChat) {
      return res.status(200).json({ success: true, chat: existingChat });
    }

    // Create a new chat
    const chat = new Chat({ participants });
    await chat.save();
    res.status(201).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all chats for a user
exports.getUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chat.find({ participants: userId }).populate('participants', 'name email');
    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single chat by ID
exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate('participants', 'name email');
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }
    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Send a message in a chat
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, sender, content } = req.body;

    // Create a new message
    const message = new Message({ chat: chatId, sender, content });
    await message.save();

    // Update the chat's last message
    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all messages in a chat
exports.getMessagesByChatId = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name email');
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a chat by ID
exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    // Delete all messages associated with the chat
    await Message.deleteMany({ chat: req.params.chatId });

    res.status(200).json({ success: true, message: 'Chat and its messages deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};