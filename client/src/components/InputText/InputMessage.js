import React from 'react';
import './InputMessage.css';

const InputMessage = ({ message, setMessage, sendMessage }) => {
  return (
    <div className='inputMessageContainer'>
      <div className='disconnect-btn'>disconnect</div>
      <input
        className='messageInput'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message...'
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button className='sendBtn' onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </div>
  );
};

export default InputMessage;
