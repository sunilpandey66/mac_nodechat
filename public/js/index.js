var socket = io();

socket.on('connect', function () {
  console.log('Connected to server!!');

  /*
  socket.emit('createMessage', {
    from: 'sunil@example.com',
    text: 'Hey. This is sunil.',
    date : '20:12:20'
  });*/
});

/*receive from server*/
socket.on('newMessage', function (message) {
  console.log('New Message!', message);
  var li= jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});

/*send to Server*/
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from : "user",
    text : jQuery('[name=message]').val()
  },function(){
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
