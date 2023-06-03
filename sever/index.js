'use strict';

// SERVER //
require('dotenv').config({ path: '../.env'});
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

// combinations/initiations
const io = new Server();
const math = io.of('/math');


//create connection point for endpoint
math.on('connection', (socket) => {

  console.log('sockets connected to cap namespace', socket.id);
  socket.on('validationTest', (payload) =>{
    socket.emit('respond', 'back to you');
  } );




  
});



io.listen(PORT);
