var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = function(from,latitude,longitude) {
  return{
        from,
        url : 'http://google.com/maps?q=${latitude}, ${longitude}',
        createdAt: new Date().getTime()
      };
};
module.exports = {generateMessage,generateLocationMessage};
