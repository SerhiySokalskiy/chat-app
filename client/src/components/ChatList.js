import React, {useState} from 'react';
import AddChatModal from './AddChatModal';
import './ChatListStyle.css';
import EditChatBtn from './EditChatBtn';
import DeleteChatBtn from './DeleteChatBtn';

const ChatList = ({ chats, onSelect, selectedId, fetchChats,setShownChat, searchTerm }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  
  const filteredChats = chats.filter((chat) => {
    const fullName = `${chat.firstName} ${chat.lastName}`;
    return chat.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || chat.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || fullName.toLowerCase().includes(searchTerm.toLowerCase())
  }
  );

  return (
    <div style={{ width: '300px', borderRight: '1px solid #ddd', padding: '16px' }}>
      <h3 style={{ textAlign: 'center' }}>Чати</h3>
      {filteredChats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onSelect(chat)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            marginBottom: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: selectedId === chat._id ? '#f0f0f0' : 'transparent'
          }}
        >
          <img
            src={chat.avatar}
            alt={chat.firstName}
            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
          />
          <div>{chat.firstName} {chat.lastName}</div>
          <EditChatBtn setSelectedChat={setSelectedChat} setShowModal={setShowModal} chat={chat}/>
          <DeleteChatBtn fetchChats={fetchChats} setShownChat={setShownChat} chatid={chat._id}/>
        </div>
      ))}
      <button onClick={() => setShowModal(true)} className="add-chat-button" >
        +
      </button>
      {showModal && <AddChatModal onClose={() => setShowModal(false)} setSelectedChat={setSelectedChat} fetchChats={fetchChats} chat={selectedChat}/>}
    </div>
  );
};

export default ChatList;
