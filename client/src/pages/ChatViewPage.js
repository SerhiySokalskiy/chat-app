import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ChatViewPage = () => {
    const { id } = useParams();
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(
        () => {
            const fetchChatAndMessages = async () => {
                try {
                    const chatRes = await axios.get(`https://chat-app-b87f.onrender.com/api/chats/${id}`);
                    const messagesRes = await axios.get(`https://chat-app-b87f.onrender.com/api/messages/${id}`);
                    setChat(chatRes.data);
                    setMessages(messagesRes.data);
                } catch (err) {
                    console.error('Error loading chat:', err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchChatAndMessages();
        }, [id]);
    
    if (loading) return <p>Loading chat...</p>;
    if (!chat) return <p>Chat not found</p>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    position: 'relative'
  }}
>
  {/* Кнопка "Назад" */}
  <button
    onClick={() => navigate('/')}
    style={{
      background: 'none',
      border: 'none',
      color: '#007bff',
      fontSize: '14px',
      cursor: 'pointer',
      padding: 0,
      transition: 'opacity 0.2s',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.6)}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
  >
    ← Назад
  </button>

  {/* Заголовок по центру */}
  <h2 style={{
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
    fontSize: '18px',
    fontWeight: '500',
  }}>
    {chat.firstName} {chat.lastName}
  </h2>

  <div style={{ width: '60px' }} />
</div>


            <div>
                {messages.map((msg) => (
                <div
                    key={msg._id}
                    style={{
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                    margin: '10px 0',                        padding: '8px 12px',
                    backgroundColor: msg.sender === 'user' ? '#dfffd8' : '#f0f0f0',
                    borderRadius: '12px',
                    maxWidth: '70%',
                    display: 'inline-block',
                    }}>
                    {msg.text}
                </div>
                ))}
            </div>
        </div>
    );
};

export default ChatViewPage;