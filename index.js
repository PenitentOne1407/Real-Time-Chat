const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const users = {};

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    users[username] = socket;
    socket.username = username;
    io.emit('user-list', Object.keys(users));
  });

  socket.on('chat message', ({ from, to, msg }) => {
    if (to && users[to]) {
      users[to].emit('private message', { from, to, msg });
      users[from].emit('private message', { from, to, msg });
    } else {
      io.emit('chat message', { from, msg });
    }
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      delete users[socket.username];
      io.emit('user-list', Object.keys(users));
    }
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
