import React, { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="chat">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.user === 'You' ? 'chat-message-self' : ''}`}>
            <span className="chat-user">{message.user}</span>
            <span className="chat-text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input type="text" placeholder="Type your message" />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Chat;
