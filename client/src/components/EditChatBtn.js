import React from 'react';
import { Pencil } from "lucide-react";

const EditChatBtn = ({setSelectedChat, setShowModal, chat}) => {

    const handleEdit = (chat) => {
        setSelectedChat(chat);
        setShowModal(true);
    };

    return (
        <button onClick={() => handleEdit(chat) } style={{
            marginLeft: '8px',
            padding: '4px',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Pencil className="w-4 h-4 text-gray-600" 
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="gray"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </button>
    )
}

export default EditChatBtn;