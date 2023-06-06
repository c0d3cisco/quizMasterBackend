'use strict';
// VENDOR - 1 //

const { io } = require('socket.io-client');
const namespace = process.env.NAMESPACE;
const username = process.env.USERNAME.toUpperCase();


console.log('Login as:', username);
let socket = io(`http://localhost:3001/${namespace}`);

socket.on('connect', () => console.log(`Vendor Link with Server: ${namespace.toUpperCase()}`));

socket.on('respond', (payload) =>{
  console.log(payload);
} );


socket.emit('getNamespaceMessage', {namespace: `${namespace}`});

socket.on('loadSavedMessage', (payload) => {
  let message = payload.message;
  let usernameFromMessage = payload.username;
  let userIdentification= payload.messageID.split(':')[0];
  let num = message.length > 80 ? 80 : message.length;
  if(userIdentification === username){
    printColorfulMessage(usernameFromMessage.padStart(62), colorCyan);
    printColorfulMessage('-'.repeat(num).padStart(62), colorGreenLight);
    printColorfulMessage(message.padStart(62), colorCyan);
  } else {
    printColorfulMessage(usernameFromMessage, colorGreenLight);
    printColorfulMessage('-'.repeat(num), colorCyan);
    printColorfulMessage(message, colorGreenLight);
  }
});

socket.on('responseBack', (payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  printColorfulMessage(username.padStart(62), colorCyan);
  printColorfulMessage('-'.repeat(num).padStart(62), colorGreenLight);
  printColorfulMessage(payload.padStart(62), colorCyan);
});

socket.on('responseOut', (username, payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  printColorfulMessage(username, colorGreenLight);
  printColorfulMessage('-'.repeat(num), colorCyan);
  printColorfulMessage(payload, colorGreenLight);
});

socket.on('roomResponseBack', (payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  printColorfulMessage(`${'rmchat: ' + username}`.padStart(62), colorOrangeLight);
  printColorfulMessage('-'.repeat(num).padStart(62), colorYellowLight);
  printColorfulMessage(payload.padStart(62), colorOrangeLight);
});

socket.on('roomResponseOut', (username, payload) => {
  let num = payload.length > 80 ? 80 : payload.length;
  printColorfulMessage(`${'rmchat: ' + username}`, colorYellowLight);
  printColorfulMessage('-'.repeat(num), colorOrangeLight);
  printColorfulMessage(payload, colorYellowLight);
});

socket.on('roomFull', (payload) => console.log(`Room ${payload} is full`));
socket.on('room-joined', (payload) => console.log(payload));


let savedRoom;

process.stdin.on('data', (data) => {
  let enteredValue = data.toString().slice(0, -1);

  if(enteredValue === 'hi'){
    socket.emit('validationTest', 'hello' );
  }

  if(enteredValue.slice(0, 2) === 'm,'){
    socket.emit('chatMessage', username, enteredValue.slice(3));
  }

  if(enteredValue.slice(0, 3) === 'mr,'){
    socket.emit('roomMessage', username, enteredValue.slice(4), savedRoom);

  }

  if(enteredValue.slice(0, 2) === 'lr'){
    socket.emit('leave-room', savedRoom);
  }
  
  if(enteredValue.slice(0, 3) === 'rm-'){
    socket.emit('leave-room', savedRoom);
    savedRoom = enteredValue.slice(4);
    socket.emit('join-room', savedRoom);
  }

  if(enteredValue === 'quest'){
    fetchData();
  }

  if(enteredValue === 'socket'){
    console.log(socket);
  }
});


async function fetchData() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=boolean');
    const data = await response.json();
    console.log(data.results);
  } catch (error) {
    console.log('Error:', error);
  }
}

// ChatGPT helped
const colorReset = '\x1b[0m';
const colorCyan = '\x1b[36m';// CYAN
const colorOrangeLight = '\x1b[38;5;216m'; // KEEP FOR OTHER IN DUEL ROOM
const colorGreenLight = '\x1b[92m';
const colorYellowLight = '\x1b[93m'; // KEEP FOR SENDER DUEL ROOM

function printColorfulMessage(message, color) {
  console.log(`${color}${message}${colorReset}`);
}
