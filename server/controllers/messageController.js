const Message = require('../models/Message');
const Chat = require('../models/Chat');
const axios = require('axios');
const { io } = require('../index');

exports.createMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    if (!chatId || !text) {
      return res.status(400).json({ error: "chatId and text are required" });
    }

    const senderName = req.user ? req.user.displayName : 'Ви';

    const userMsg = await Message.create({
      chatId,
      sender: 'user',
      senderName,
      text
    });

    const io = req.app.get('io');
    io.emit('newMessage', userMsg);
    res.status(201).json(userMsg);

    setTimeout(async () => {
      try {
        const quoteRes = await axios.get('https://api.chucknorris.io/jokes/random');
        const quote = quoteRes.data.value;

        if (!quote || typeof quote !== 'string') {
          throw new Error('Quote is missing or not a string');
        }

        const chat = await Chat.findById(chatId);
        const fullName = `${chat.firstName} ${chat.lastName}`;
        console.log("fullname:" + fullName)
        const botMsg = await Message.create({
          chatId,
          sender: 'bot',
          senderName: fullName,
          text: quote
        });

        io.emit('newMessage', botMsg);

      } catch (err) {
        console.error('Failed to fetch or save quote:', err.message);
      }
    }, 3000);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessagesByChat = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
  res.json(messages);
};