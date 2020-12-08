import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import TopBar from '../TopBar/TopBar';
import InputText from '../InputText/InputMessage';
import MessagesContainer from '../MessagesContainer/MessagesContainer';

import './Chat.css';

let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    socket.emit('join', { name, room });
    setName(name);
    setRoom(room);
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    console.log('hello');
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    return () => socket.off();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='backgroundImage'>
      <div className='outerContainer'>
        <div className='container'>
          <TopBar />
          <MessagesContainer messages={messages} name={name} />
          <InputText
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
