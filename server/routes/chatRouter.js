const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.createChat);
router.get('/', chatController.getAllChats);
router.get('/search', chatController.searchChats);
router.get('/:id', chatController.getChatById);
router.patch('/:id', chatController.updateChat);
router.delete('/:id', chatController.deleteChat);

module.exports = router;