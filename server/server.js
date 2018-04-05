const path =require('path');
const express = require('express');
const publicpath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3001;


console.log(publicpath);
var app = express();

app.use(express.static(publicpath));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
