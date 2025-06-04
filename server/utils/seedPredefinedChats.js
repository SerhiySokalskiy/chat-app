const Chat = require('../models/Chat');
const generateAvatar = require('./generateAvatar');

const seedPredefinedChats = async () => {
  const existingChats = await Chat.find();
  if (existingChats.length === 0) {
    const predefined = [
      { firstName: 'Jack', lastName: 'Bauer' },
      { firstName: 'Angela', lastName: 'Yu' },
      { firstName: 'James', lastName: 'Bond' }
    ];

    const chatsWithAvatars = predefined.map(({ firstName, lastName }) => ({
      firstName,
      lastName,
      avatar: generateAvatar(firstName, lastName)
    }));

    await Chat.insertMany(chatsWithAvatars);
    console.log('Predefined chats seeded');
  }
};

module.exports = { seedPredefinedChats };