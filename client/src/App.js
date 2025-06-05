import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

    const fetchChats = async () => {
      const res = await axios.get('http://localhost:5000/api/chats');
      setChats(res.data);
    };

  useEffect(() => {
    fetchChats();
  }, []);

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);


  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {user ? (
        <div style={{padding: '0px 16px'}}>
          <a href="http://localhost:5000/auth/logout">
            <button style={{ padding: '8px 16px' }}>Вийти</button>
          </a>
        </div >
          ) : (
        <div style={{padding: '0px 16px'}}>
          <a href="http://localhost:5000/auth/google">
            <button style={{ padding: '8px 16px' }}>Увійти через Google</button>
          </a>
        </div>  
      )}
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <ChatList
        chats={chats}
        onSelect={setSelectedChat}
        selectedId={selectedChat?._id}
        fetchChats={fetchChats}
        setShownChat = {setSelectedChat}
        searchTerm={searchTerm}
      />
      </div>
      <ChatView chat={selectedChat} user={user} userAvatar={user? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=random&rounded=true&bold=true`: `https://ui-avatars.com/api/?name=&background=random&rounded=true&bold=true`} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
