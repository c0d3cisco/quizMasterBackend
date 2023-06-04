
// console.clear();
clearTerminal();
// logNumbers();

process.stdin.on('data', (data) => {
  let enteredValue = data.toString().slice(0, -1);
  clearLastLine();
  
  if(enteredValue.slice(0, 3) === 'x--'){
    restartWithDifferentValue(enteredValue.slice(4));
  }

  if(enteredValue.slice(0, 4) === 'chrm'){
    process.exit();

  }
  
  
});
// Call the restart function with a different value to initiate the restart

console.log('Welcome to Quiz Master! Good luck in you endeavors!');

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


function restartWithDifferentValue(newValue) {
  // Perform any cleanup or reset operations here
  
  // Set the new value as an environment variable
  process.env.NEW_VALUE = newValue;
  process.env.USERNAME = 'Kenya';
  
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

