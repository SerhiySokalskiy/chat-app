import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MessageBubble from './MessageBubble';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io('https://chat-app-b87f.onrender.com');

const ChatView = ({ chat, user, userAvatar }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post('https://chat-app-b87f.onrender.com/api/messages', {
        chatId: chat._id,
        sender: 'user',
        text: message
      });

      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err.message);
    }
  };

  useEffect(() => {
    if (!chat) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`https://chat-app-b87f.onrender.com/api/messages/${chat._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    socket.on('newMessage', (msg) => {
        setMessages(prev => [...prev, msg]);
        if (msg.sender === 'bot') {
          toast.info(`Нове повідомлення від ${msg.senderName}: ${msg.text}`);
        }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) return <div style={{ flexGrow: 1 }} />;

  return (
    <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <img
          src={chat.avatar}
          alt={chat.firstName}
          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
        />
        <h2 style={{ margin: 0, fontSize: '18px' }}>{chat.firstName} {chat.lastName}</h2>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '16px' }}>
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={msg.sender === 'user'}
            avatar={msg.sender === 'user' ? userAvatar : chat.avatar}
            senderName={
              msg.sender === 'user'
              ? (user?.displayName || 'Ви')
              : `${chat.firstName}`
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Введіть повідомлення..."
          style={{
            flexGrow: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '10px 16px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Надіслати
        </button>
      </div>
    </div>
  );
};

export default ChatView;
