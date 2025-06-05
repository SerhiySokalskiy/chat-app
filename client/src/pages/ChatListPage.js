import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatListPage = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchChats = async ()=> {
            try {
                const res = await axios.get('http://localhost:5000/api/chats');
                setChats(res.data);
            } catch (error) {
                console.error('Failed to fetch chats', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchChats();
    }, []);

    if (loading) return <p>Loading chats...</p>;

    return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Chats</h2>
      {chats.map((chat) => (
        <div
            onClick={() => navigate(`/chat/${chat._id}`)}
            key={chat._id}
            style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
        >
          <img
            src={chat.avatar}
            alt={`${chat.firstName} ${chat.lastName}`}
            style={{ width: 48, height: 48, borderRadius: '50%', marginRight: '12px' }}
          />
          <div style={{ fontSize: '16px', fontWeight: 500 }}>
            {chat.firstName} {chat.lastName}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatListPage;
