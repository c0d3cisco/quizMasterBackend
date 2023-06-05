'use strict';

const { MessageSaved } = require('../src/classObjects.js');
const { handlerQueueLoading } = require('./handlers.js');

function everyThing(socket, namespace, messageQueue, maxInRoom){ 

  // out going message for ROOM only
  socket.on('roomMessage', (username, message, savedRoom) => {
    socket.emit('roomResponseBack', message);
    socket.to(savedRoom).emit('roomResponseOut', username, message);
  });

  // console.log(`sockets connected to ${namespaceParam}namespace`, socket.id);
  
  // leave room
  socket.on('leave-room', (room) => {
    socket.leave(room);
    console.log('these are the rooms', socket.adapter.rooms);
  });

  // join room
  socket.on('join-room', (room) =>{


    socket.join(room);
    
    // logic to control size of room
    if(namespace.adapter.rooms?.get(room)?.size > maxInRoom) {
      socket.leave(room)
      socket.emit('roomFull', room)
    } else {
    socket.emit('room-joined', `you have joined room: ${room}`);
    }
    
    console.log('sockets connected to MATH namespace', socket.id);
    console.log('these are the rooms', socket.adapter.rooms);

  });
  

  socket.on('validationTest', (payload) =>{
    socket.emit('respond', 'back to you');
  });

  // chat message to ALL
  socket.on('chatMessage', (username, message) =>{
    console.log(message);
    socket.emit('responseBack', message);
    socket.broadcast.emit('responseOut', username, message);
    // socket.broadcast.emit('respond', `${payload}`);
    handlerQueueLoading(new MessageSaved(username, message, namespace), messageQueue);

    
  });

  // get message from queue
  socket.on('getNamespaceMessage', (payload) => {
    console.log('attempting to get messages');
    let currentQueue = messageQueue.read(payload.namespace);
    console.log(currentQueue);
    if(currentQueue?.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit('loadSavedMessage', currentQueue.read(messageId));
      });
    }
  })

}

module.exports = { everyThing };