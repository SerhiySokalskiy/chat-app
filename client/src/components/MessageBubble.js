import React from 'react';
import dayjs from 'dayjs';

const MessageBubble = ({ message, isOwn, avatar, senderName }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        marginBottom: '16px',
      }}
    >
      <img
        src={avatar}
        alt="avatar"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          margin: isOwn ? '0 0 0 10px' : '0 10px 0 0'
        }}
      />

      <div style={{ maxWidth: '70%' }}>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>
          {senderName}
        </div>

        <div
          style={{
            backgroundColor: isOwn ? '#dfffd8' : '#f0f0f0',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '14px'
          }}
        >
          {message.text}
        </div>

        <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>
          {dayjs(message.createdAt).format('HH:mm')}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
