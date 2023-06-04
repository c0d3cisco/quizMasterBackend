'use strict';

// SERVER //
require('dotenv').config({ path: '../.env'});
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

// combinations/initiations
const io = new Server();
const home = io.of('/home');
const math = io.of('/math');
const trivia = io.of('/trivia');
let maxInRoom = 2;

//HOME PAGE
home.on('connection', (socket) => {

  console.log('sockets connected to HOME namespace', socket.id);

  socket.on('chatMessage', (username, payload) =>{
    console.log(payload);
    socket.emit('responseBack', payload);
    socket.broadcast.emit('responseOut', username, payload);
    // socket.broadcast.emit('respond', `${payload}`);
  });

  socket.on('validationTest', (payload) =>{
    socket.emit('respond', 'back to you');
    // socket.broadcast.emit('respond', `${payload}`);
  });
});


//MATH 
math.on('connection', (socket) => {

  socket.on('roomMessage', (username, message, savedRoom) => {
    socket.emit('roomResponseBack', message);
    socket.to(savedRoom).emit('roomResponseOut', username, message);
  })

  console.log('sockets connected to MATH namespace', socket.id);

  socket.on('leave-room', (room) => {
    socket.leave(room);
    console.log('these are the rooms', socket.adapter.rooms);
  });

  socket.on('join-room', (room) =>{


    socket.join(room);

    // logic to control size of room
    if(math.adapter.rooms?.get(room)?.size > maxInRoom) {
      socket.leave(room)
      socket.emit('roomFull', room)
    }

    console.log('sockets connected to MATH namespace', socket.id);
    console.log('these are the rooms', socket.adapter.rooms);

  });
  

  socket.on('validationTest', (payload) =>{
    socket.emit('respond', 'back to you');
  });

  socket.on('chatMessage', (username, payload) =>{
    console.log(payload);
    socket.emit('responseBack', payload);
    socket.broadcast.emit('responseOut', username, payload);
    // socket.broadcast.emit('respond', `${payload}`);
  });


});

// TRIVIA ROOM
trivia.on('connection', (socket) => {

  console.log('sockets connected to TRIVIA namespace', socket.id);

  socket.emit('leave-room', (room) => {
    socket.join(room);
  });

  // socket.on('join-room', (room) =>{
  //   if(room === 'duel') socket.join('math');
  //   console.log(socket.id);
  //   console.log('sockets connected to MATH namespace', socket.id);
  //   console.log('these are the rooms', socket.adapter.rooms);

  // });

  socket.on('leave-room', (room) => {
    socket.leave(room);
    console.log('these are the rooms', socket.adapter.rooms);
  });

  socket.on('join-room', (room) =>{


    socket.join(room);

    // logic to control size of room
    if(math.adapter.rooms?.get(room)?.size > maxInRoom) {
      socket.leave(room)
      socket.emit('roomFull', room)
    }

    console.log('sockets connected to MATH namespace', socket.id);
    console.log('these are the rooms', socket.adapter.rooms);

  });

  socket.on('chatMessage', (payload) =>{
    console.log(payload);
    socket.emit('chatMessage', payload);
  });

});


// #AIprompted
process.stdin.on('data', data => {
  let enteredValue = data.toString().slice(0, -1);

  if(enteredValue === 'logHome'){
    console.log('***********home***********', home.sockets);
  }

  if(enteredValue === 'logMath'){
    console.log('***********math***********', math.sockets);
  }

  if(enteredValue === 'logTrivia'){
    console.log('***********trivia***********', trivia.sockets);
  }

  

});

io.listen(PORT);
