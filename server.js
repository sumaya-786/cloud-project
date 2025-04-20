const express=require("express");
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'group-chat')));

//socket connection on
io.on('connection', (socket) => {
    console.log('A user connected');

socket.on('chat message', (msg) => {
    console.log('Server received:', msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

//server start listening

server.listen(3000, () => {
  console.log("port is listening on 3000");
});


  