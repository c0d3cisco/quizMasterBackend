'use strict';
// VENDOR - 1 //

const { io } = require('socket.io-client');
const newValue = process.env.NEW_VALUE;
const username = process.env.USERNAME.toUpperCase();

console.log('Login as:', username);
let socket = io(`http://localhost:3001/${newValue}`);


socket.on('connect', () => console.log('Vendor Link with Server: SUCCESSFUL'));

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

process.stdin.on('data', (data) => {
  let enteredValue = data.toString().slice(0, -1);

  if(enteredValue === 'hi'){
    socket.emit('validationTest', 'hello' );
  }

  if(enteredValue.slice(0, 2) === 'm,'){
    // console.log('your message was',enteredValue.slice(3));
    socket.emit('chatMessage', username, enteredValue.slice(3));
  }
  
  if(enteredValue === 'mathRoom'){
    // make it work later
  }

  if(enteredValue === 'triviaRoom'){
    // make it work later
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



