const path =require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicpath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3001;


console.log(publicpath);
var app = express();
var server = http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicpath));

io.on('connection', (socket) => {
  console.log('New user connected');


 socket.emit('newMessage', {
   from: 'Barcode44',
   text: 'Hi I am in the chatroom !!',
   Date:  '15:15:20'

 });

socket.on('createMessage',function(newEmail){
  console.log('createMessage', newEmail);
})

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
