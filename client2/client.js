'use strict';
// VENDOR - 1 //

const { io } = require('socket.io-client');
const namespace = process.env.NAMESPACE;
const username = process.env.USERNAME.toUpperCase();


console.log('Login as:', username);
let socket = io(`http://localhost:3001/${namespace}`);

socket.on('connect', () => console.log(`Vendor Link with Server: ${namespace.toUpperCase()}`));

// this is for the 'validationTest' hi example
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


const colorReset = '\x1b[0m';
const colorRed = '\x1b[31m';
const colorCyan = '\x1b[36m';// CYAN
const colorCyanLight = '\x1b[96m';
const colorCyanDark = '\x1b[30;46m';
const colorOrange = '\x1b[38;5;202m';
const colorOrangeLight = '\x1b[38;5;216m'; // KEEP FOR OTHER IN DUEL ROOM
const colorOrangeDark = '\x1b[38;5;166m';
const colorGreen = '\x1b[32m';
const colorGreenLight = '\x1b[92m';
const colorGreenDark = '\x1b[90m';
const colorYellow = '\x1b[33m'; 
const colorYellowLight = '\x1b[93m'; // KEEP FOR SENDER DUEL ROOM
const colorYellowDark = '\x1b[33;1m';

function printColorfulMessage(message, color) {
  console.log(`${color}${message}${colorReset}`);
}

// printColorfulMessage('This is a red message', colorRed);
// printColorfulMessage('This is a green message', colorGreen);
// printColorfulMessage('This is a yellow message', colorYellow);
// printColorfulMessage('This is a cyan message', colorCyan);
// printColorfulMessage('This is an orange message', colorOrange);

// printColorfulMessage('This is a lighter cyan message', colorCyanLight);
// printColorfulMessage('This is a darker cyan message', colorCyanDark);
// printColorfulMessage('This is a lighter orange message', colorOrangeLight);
// printColorfulMessage('This is a darker orange message', colorOrangeDark);
// printColorfulMessage('This is a lighter green message', colorGreenLight);
// printColorfulMessage('This is a darker green message', colorGreenDark);
// printColorfulMessage('This is a lighter yellow message', colorYellowLight);
// printColorfulMessage('This is a darker yellow message', colorYellowDark);

