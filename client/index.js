'use strict';
// VENDOR //
const Chance = require('chance');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/math');


socket.on('connect', () => console.log('Vendor Link with Server: SUCCESSFUL'));

socket.on('respond', (payload) =>{
  console.log(payload);
} );



process.stdin.on('data', data => {
  if(data.toString().slice(0, -1) === 'hi'){
    socket.emit('validationTest', 'hello' );
  }
});


