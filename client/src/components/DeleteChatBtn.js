import React from 'react'
import { LucideTrash } from 'lucide-react'
import axios from 'axios'

const DeleteChatBtn = ({fetchChats, setShownChat, chatid}) => {

    const onDelete = async () => {
        console.log("chat id :" + chatid)
        try {
            await axios.delete(`https://chat-app-b87f.onrender.com/api/chats/${chatid}`);
            fetchChats();
            setShownChat(null);
        } catch (error) {
            console.error('Помилка при видаленні чату:', error);
            }
        }

    return (
        <button onClick={() => onDelete()} style={{
            marginLeft: '8px',
            padding: '4px',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            }} >
              <LucideTrash className="w-4 h-4 text-gray-600" 
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

export default DeleteChatBtn;