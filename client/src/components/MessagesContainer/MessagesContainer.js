import React, { useRef, useEffect } from 'react';
import './MessagesContainer.css';

import Message from '../Message/Message';

const MessagesContainer = ({ messages, name }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className='messagesContainer'>
      {messages.map((message, i) => (
        <Message key={i} message={message} name={name} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
