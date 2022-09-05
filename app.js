const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const moment = require('moment');

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'src')));

io.on('connection', function(socket) {
  socket.on('chatting', function(data) {
    const { name, msg } = data;
    io.emit('chatting', {
      name,
      msg,
      time: moment(new Date()).format('h:mm A')
    });
  })
});

server.listen(PORT, function() {
  console.log(`server is running : ${PORT}`);
});