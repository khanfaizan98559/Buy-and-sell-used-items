const Log = require('../models/Log');

// Create a new log entry
exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).json({ success: true, log });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('user', 'name email');
    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get logs by user ID
exports.getLogsByUserId = async (req, res) => {
  try {
    const logs = await Log.find({ user: req.params.userId }).populate('user', 'name email');
    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single log by ID
exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id).populate('user', 'name email');
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    res.status(200).json({ success: true, log });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get logs from the last 10 days
exports.getLast10DaysLogs = async (req, res) => {
  try {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const logs = await Log.find({ timestamp: { $gte: tenDaysAgo } }).populate('user', 'name email');
    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a log by ID
exports.deleteLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    res.status(200).json({ success: true, message: 'Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

