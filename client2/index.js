const { Namespace } = require('socket.io');

// console.clear();
clearTerminal();
// logNumbers();

require('dotenv').config({ path: '../.env'});

process.stdin.on('data', (data) => {
  let enteredValue = data.toString().slice(0, -1);
  clearLastLine();
  
  if(enteredValue.slice(0, 3) === 'x--'){
    restartWithDifferentValue(enteredValue.slice(4));
  }

  if(enteredValue === 'clear'){
    clearTerminal();
  }

  if(enteredValue === 'chrm'){
    process.exit();
  }

  if(enteredValue === 'help'){
    console.log(`'chrm' - - - - - - - - - - -  Kills script to change rooms. `);
    console.log(`'socket' * * * * * * * * * *  See your socket info`);
    console.log(`'x-- <namespace>'  - - - - -  Namespaces: home, trivia, math.`);
    console.log('                              to enter namespace after');
    console.log('                              server initiation.');
    console.log('                              CAUTION: space after dash is');
    console.log('                              crucial.');
    console.log(`'m, <message>' * * * * * * *  CHAT in after entering namespace.`);
    console.log(`'rm- <roomName>' - - - - - -  RoomName of your choosing.`);

  }
  
});
// Call the restart function with a different value to initiate the restart

console.log('Welcome to Quiz Master! Good luck in your endeavors!');

function logNumbers() {
  let i = 3;
  const interval = setInterval(() => {
    if (i === 1) {
      console.log(`${i}...`);
      clearInterval(interval);
      setTimeout(() => {
        clearTerminal();
        console.log('START');
      }, 1000);
    } else {
      console.log(`${i}...`);
      i--;
    }
  }, 1000);
}


console.log('Right-aligned text'.padStart(62));


function restartWithDifferentValue(namespace) {
  // Perform any cleanup or reset operations here
  
  // Set the new value as an environment variable
  process.env.NAMESPACE = namespace;
  process.env.USERNAME = 'Cisco';
  // process.env.PASSWORD = 

  
  // Restart the execution by calling the entry point file or re-executing the code
  require('./client.js');
}

function clearTerminal() {
  if (process.stdout.isTTY) {
    process.stdout.write('\x1B[2J\x1B[0f');
  }
}

function clearLastLine() {
  process.stdout.write('\x1B[1A\x1B[2K');
}


// set up a way to adjust screen size

// a way to limit room sizes
