const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'src')));

io.on('connection', (socket) => {
  socket.on('chatting', (data) => {
    io.emit('chatting', data);
  })
});

server.listen(PORT, () => {
  console.log(`server is running : ${PORT}`);
});