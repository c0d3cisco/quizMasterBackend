'use strict';
// VENDOR - 1 //

const { io } = require('socket.io-client');
const newValue = process.env.NEW_VALUE;
const username = process.env.USERNAME.toUpperCase();

console.log('Login as:', username);
let socket = io(`http://localhost:3001/${newValue}`);

socket.on('connect', () => console.log(`Vendor Link with Server: ${newValue.toUpperCase()}`));

// this is for the 'validationTest' hi example
socket.on('respond', (payload) =>{
  console.log(payload);
} );

socket.on('responseBack', (payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  console.log(username.padStart(62));
  console.log('-'.repeat(num).padStart(62));
  console.log(payload.padStart(62));
});

socket.on('responseOut', (username, payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  console.log(username);
  console.log('-'.repeat(num));
  console.log(payload);
});

socket.on('roomResponseBack', (payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  console.log(`${'rmchat: ' + username}`.padStart(62));
  console.log('-'.repeat(num).padStart(62));
  console.log(payload.padStart(62));
});

socket.on('roomResponseOut', (username, payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  console.log(`${'rmchat: ' + username}`);
  console.log('-'.repeat(num));
  console.log(payload);
});

socket.on('roomFull', (payload) => console.log(`Room ${payload} is full`));

let savedRoom;

process.stdin.on('data', (data) => {
  let enteredValue = data.toString().slice(0, -1);

  if(enteredValue === 'hi'){
    socket.emit('validationTest', 'hello' );
  }

  if(enteredValue.slice(0, 2) === 'm,'){
    // console.log('your message was',enteredValue.slice(3));
    socket.emit('chatMessage', username, enteredValue.slice(3));
  }

  if(enteredValue.slice(0, 3) === 'mr,'){
    // console.log('your message was',enteredValue.slice(3));
    socket.emit('roomMessage', username, enteredValue.slice(4), savedRoom);

  }

  if(enteredValue.slice(0, 3) === 'rm-'){
    socket.emit('leave-room', savedRoom);
  }
  
  if(enteredValue.slice(0, 3) === 'rm-'){
    socket.emit('leave-room', savedRoom);
    // console.log(savedRoom);
    savedRoom = enteredValue.slice(4);
    socket.emit('join-room', savedRoom);
    // console(savedRoom);
  }

  if(enteredValue === 'triviaRoom'){
    // socket.emit('join-room', channel);
  }

  if(enteredValue === 'quest'){
    fetchData();
  }

  // if(enteredValue === 'kill'){
  //   process.exit();
  // }


  if(enteredValue === 'socket'){
    console.log(socket);
  }
});


async function fetchData() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=boolean');
    const data = await response.json();
    // Handle the retrieved JSON data
    console.log(data.results);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.log('Error:', error);
  }
}



