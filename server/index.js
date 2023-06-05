'use strict';

// SERVER //
require('dotenv').config({ path: '../.env'});
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const { everyThing } = require('./socketHandlers.js');

// combinations/initiations
const io = new Server();
const home = io.of('/home');
const math = io.of('/math');
const trivia = io.of('/trivia');
let maxInRoom = 2;

const { handlerDequeue, handlerQueueLoading } = require('./handlers');
const {Queue, MessageSaved} = require('../src/classObjects.js');
const messageQueue = new Queue();


console.log(`connecting to ${PORT}`);
//HOME PAGE
home.on('connection', (socket) => {

  console.log('sockets connected to HOME namespace', socket.id);

  everyThing(socket, home, messageQueue, maxInRoom);

});


//MATH 
math.on('connection', (socket) => {


  console.log('sockets connected to MATH namespace', socket.id);
  everyThing(socket, math, messageQueue, maxInRoom);

});

// TRIVIA ROOM
trivia.on('connection', (socket) => {

  console.log('sockets connected to TRIVIA namespace', socket.id);

  everyThing(socket, trivia, messageQueue, maxInRoom);

});



process.stdin.on('data', data => {
  let enteredValue = data.toString().slice(0, -1);

  if(enteredValue === 'logHome'){
    console.log('***********home***********', home.name.slice(1));
  }

  if(enteredValue === 'logMath'){
    console.log('***********math***********', math.sockets);
  }

  if(enteredValue === 'logTrivia'){
    console.log('***********trivia***********', trivia.sockets);
  }

  if(enteredValue === 'ql'){
    console.info(messageQueue.data?.home);
    console.table(messageQueue);
    // console.table(messageQueue.data?.home);
  }

  

});

io.listen(PORT);


// const consoleTerminal = `
// ∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵
// ∴∵     'hello'                              ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵                                          ∴∵
// ∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵∴∵
// `


