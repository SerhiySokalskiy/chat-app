const Chat = require('../models/Chat');
const Message = require('../models/Message');
const generateAvatar = require('../utils/generateAvatar');

exports.createChat = async (req,res)=>{
    try {
        const {firstName, lastName} = req.body;
        if (!firstName || !lastName) return res.status(400).json({error: 'All fields are required'});
        const avatar = generateAvatar(firstName, lastName);
        const newChat = await Chat.create({firstName, lastName, avatar});
        res.status(201).json(newChat)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getAllChats = async (req, res) => {
    const chats = await Chat.find().sort({updatedAt: -1});
    res.json(chats);
}

exports.updateChat = async (req,res) => {
    const { firstName, lastName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        req.params.id,
        {firstName, lastName},
        {new: true}
    );
    res.json({success: true});
}

exports.getChatById = async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) return res.status(404).json({ error: 'Chat not found' });
  res.json(chat);
};

exports.deleteChat = async (req, res) => {
  const chatId = req.params.id;
  await Message.deleteMany({ chatId });
  await Chat.findByIdAndDelete(chatId);
  res.json({ success: true });
};

exports.searchChats = async (req, res) => {
  const q = req.query.q;
  const chats = await Chat.find({
    $or: [
      { firstName: new RegExp(q, 'i') },
      { lastName: new RegExp(q, 'i') }
    ]
  });
  res.json(chats);
};