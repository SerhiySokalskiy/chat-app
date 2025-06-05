import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddChatModal({ onClose, fetchChats, setSelectedChat, chat }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

    useEffect(() => {
    if (chat) {
      setFirstName(chat.firstName);
      setLastName(chat.lastName);
    }
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      alert('Будь ласка, введіть ім\'я та прізвище.');
      return;
    }
    try {
        if (chat) {
            const id = chat._id
            await axios.patch(`http://localhost:5000/api/chats/${id}`, { firstName, lastName });
        } else {
        await axios.post('http://localhost:5000/api/chats/', {
            firstName,
            lastName,
        });
    }
      onClose();
    } catch (error) {
      console.error('Помилка при створенні чату:', error);
    } finally {
        fetchChats()
        setSelectedChat(null);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Новий чат</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ім'я"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Прізвище"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <button type="submit">{chat? "Редагувати": "Створити"}</button>
          <button type="button" onClick={()=>{ onClose(); setSelectedChat(null);}}>Скасувати</button>
        </form>
      </div>
    </div>
  );
}

export default AddChatModal;
