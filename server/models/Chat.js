const mongoose = require('mongoose');

const modelChat = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Chat', modelChat);