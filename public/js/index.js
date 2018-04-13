var socket = io();

socket.on('connect', function () {
  console.log('Connected to server!!');
});

/*receive from server*/
socket.on('newMessage', function (message) {
  console.log('New Message!', message);
  var li= jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});

/*For Geolocation messgages emiting from the server*/
socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target ="_blank"> My current Location </a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
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


var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('GeoLocation not supported on your browser.');
    }
      navigator.geolocation.getCurrentPosition(function(position){
    //console.log(position);
          socket.emit('createLocationMessage',{
          latitude : position.coords.latitude,
          longitude : position.coords.longitude
          });

        }),function(){
          alert('Unable to fetch location!');
          }
});
