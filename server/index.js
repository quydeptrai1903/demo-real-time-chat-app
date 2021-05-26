const express = require('express');
const socketio = require('socket.io');
const router = require('./router');

const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(router);

const server = http.createServer(app);

const io = socketio(server);

var queue = []; // list of sockets waiting for peers
var rooms = {}; // map socket.id => room
var names = {}; // map socket.id => name
var allUsers = {}; // map socket.id => socket

const findPeerForLoneSocket = (socket) => {
  if (queue.length !== 0) {
    let peer = queue.pop();
    if (socket.id === peer.id) return;

    let room = socket.id + '#' + peer.id;

    // join them both
    peer.join(room);
    socket.join(room);

    // register rooms to their names
    rooms[peer.id] = room;
    rooms[socket.id] = room;
    console.log('rooms: ', rooms);
    // exchange names between the two of them and start the chat
    peer.emit('chat start', { name: names[peer.id], room: room });
    socket.emit('chat start', { name: names[socket.id], room: room });
  } else queue.push(socket);
};
let i = 1;

io.on('connection', (socket) => {
  console.log('User ' + socket.id + ' connected' + i);
  i++;

  socket.on('login', function (name) {
    names[socket.id] = name.trim().toLowerCase();

    console.log(`socketid: ${socket.id}`);
    console.log(`name: ${names[socket.id]}`);

    allUsers[socket.id] = socket;

    // now check if sb is in queue
    findPeerForLoneSocket(socket);
  });

  socket.on('send message', (message, callback) => {
    let name = names[socket.id];
    let room = rooms[socket.id];

    console.log(`name: ${name}`);
    console.log(`room: ${room}`);
    console.log('message: ', message);
    io.to(room).emit('message', { user: name, text: message });
    callback();
  });

  socket.on('disconnect', function () {
    let room = rooms[socket.id];
    queue.pop();
    if (room === undefined) return;

    socket.broadcast.to(room).emit('chat end');
    let peerID = room.split('#');
    delete rooms[peerID[0]];
    delete rooms[peerID[1]];
    console.log('room del: ', rooms);
  });

  // socket.on('disconnect', () => {
  //   const user = removeUser(socket.id);

  //   io.to(user.room).emit('message', {
  //     user: 'admin',
  //     text: `${user.name} has disconnected!!!`,
  //   });
  // });
});

server.listen(PORT, () => {
  console.log(`port:${PORT}`);
});
