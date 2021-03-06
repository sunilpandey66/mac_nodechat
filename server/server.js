const path =require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message.js')

const publicpath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3001;
console.log(publicpath);
var app = express();
var server = http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicpath));

io.on('connection', (socket) => {
  console.log('New user connected');
/*Initial message sent to client*/
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


/*function to listen to messgaes from browser*/
      socket.on('createMessage',function(message,callback){
          console.log('createMessage', message);
          io.emit('newMessage',generateMessage(message.from,message.text))
          callback('this is from the server');
      });

/*for Geolocation listening from the client*/
    socket.on('createLocationMessage',function(coords){
      console.log('createLocationMessage', coords);
      io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude))
      });


/*function to do something when disconnect*/
      socket.on('disconnect', () => {
      console.log('User was disconnected');
  });
});
/*server in listen mode*/
  server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
