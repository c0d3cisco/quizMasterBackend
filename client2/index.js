'use strict';
// VENDOR //

const { io } = require('socket.io-client');

let socket = io('http://localhost:3001/home');


socket.on('connect', () => console.log('Vendor Link with Server: SUCCESSFUL'));

// this is for the 'validationTest' hi example
socket.on('respond', (payload) =>{
  console.log(payload);
} );

socket.on('chatMessage', (payload) => {
  console.log(payload);
});

process.stdin.on('data', (data) => {
  let enteredValue = data.toString().slice(0, -1);

  if(enteredValue === 'hi'){
    socket.emit('validationTest', 'hello' );
  }

  if(enteredValue.slice(0, 2) === 'm-'){
    // console.log('your message was',enteredValue.slice(3));
    socket.emit('chatMessage', enteredValue.slice(3));
  }

  if(enteredValue === 'home'){
    socket.disconnect();
    
    socket = null;
    
    // Create a new socket with the new namespace
    socket = io('http://localhost:3001/home');

    socket.on('connect', () => {
      console.log('Vendor Link with Server: Namespace Changed to HOME');
      // Start sending data or perform any necessary actions in the new namespace
    });
  }

  if(enteredValue === 'math'){
    socket.disconnect();
    // Create a new socket with the new namespace
    socket = io('http://localhost:3001/math');

    socket.on('connect', () => {
      console.log('Vendor Link with Server: Namespace Changed to MATH');
      // Start sending data or perform any necessary actions in the new namespace
    });
  }

  if(enteredValue === 'trivia'){
    socket.disconnect();
    // Create a new socket with the new namespace
    socket = io('http://localhost:3001/trivia');

    socket.on('connect', () => {
      console.log('Vendor Link with Server: Namespace Changed to TRIVIA');
      // Start sending data or perform any necessary actions in the new namespace
    });
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
    // Handle the retrieved JSON data
    console.log(data.results);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.log('Error:', error);
  }
}



