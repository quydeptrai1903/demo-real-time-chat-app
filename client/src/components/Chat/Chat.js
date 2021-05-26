import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import TopBar from '../TopBar/TopBar';
import InputText from '../InputText/InputMessage';
import MessagesContainer from '../MessagesContainer/MessagesContainer';

import './Chat.css';

const DISCONNECT = 'DISCONNECT';
const WAITING_NEW_STRANGER = 'WAITING_NEW_STRANGER';
const READY_TO_CHAT = 'READY_TO_CHAT';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const [connection, setConnection] = useState(false);
  const [status, setStatus] = useState(DISCONNECT);
  const ENDPOINT = 'localhost:5000';

  console.log('status: ', status);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);

    socket.on('connect', () => {
      console.log('zozoozoz66');
    });

    socket.on('chat start', function ({ name, room }) {
      setStatus(READY_TO_CHAT);
      setRoom(room);
      setName(name);
    });

    socket.on('chat end', function (data) {
      // this will close chat window and alert user that the peer ended chat
      // socket.leave(room); // it's possible to leave from both server and client, hoever it is better to be done by the client in this case
      setRoom('');
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    return () => socket.off();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('send message', message, () => setMessage(''));
    }
  };

  const findNewStranger = () => {
    if (status === WAITING_NEW_STRANGER || status === READY_TO_CHAT) return;
    setStatus(WAITING_NEW_STRANGER);
    socket.emit('login', name);
  };

  const renderInput = () => {
    if (status === DISCONNECT)
      return <div className='notice'>Bấm nút bên trên để tìm người mới</div>;
    if (status === WAITING_NEW_STRANGER)
      return <div className='notice'>Chờ đợi người lạ vào chat.....</div>;
    if (status === READY_TO_CHAT)
      return (
        <InputText
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      );
  };

  return (
    <div className='backgroundImage'>
      <div className='outerContainer'>
        <div className='container'>
          <TopBar findNewStranger={findNewStranger} />
          <MessagesContainer messages={messages} name={name} />
          {renderInput()}
        </div>
      </div>
    </div>
  );
};

export default Chat;
