var socket = io();

socket.on('connect', function () {
  console.log('Connected to server!!');

  socket.emit('createMessage', {
    from: 'sunil@example.com',
    text: 'Hey. This is sunil.',
    date : '20:12:20'
  });
});



socket.on('newMessage', function (newMsg) {
  console.log('New Message!', newMsg);
});


socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
