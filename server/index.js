const express = require('express');
const socketio = require('socket.io');
const router = require('./router');
const { getUser, removeUser, addUser, getUserInRoom } = require('./users');

const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(router);

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const user = addUser({ id: socket.id, name, room });

    //if (error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name} welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined` });

    socket.join(user.room);

    //callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    io.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has disconnected!!!`,
    });
  });
});

server.listen(PORT, () => {
  console.log(`port:${PORT}`);
});
