import React from 'react';

import './Message.css';

const Message = ({ message: { user, text }, name }) => {
  let isSendByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  console.log(user, '   ', name);

  if (user === trimmedName) isSendByCurrentUser = true;

  return isSendByCurrentUser ? (
    <div className='messageContainer sendMessage'>
      <p className='messageText sendText'>{text}</p>
      <span className='userName'>you</span>
    </div>
  ) : (
    <div className='messageContainer receiveMessage'>
      <p className='messageText receiveText'>{text}</p>
      <span className='userName'>{user}</span>
    </div>
  );
};

export default Message;
