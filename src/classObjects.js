'use stick';

class Queue {
  constructor(){
    this.data = {}; // initializing an empty object to just keys later to store
    this.size = 0;
  }

  store(key,value){
    this.data[key] = value;
    console.log(`${value.message} was added to the queue with a key of ${key}`);
    this.size++;
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    console.log(`${key} was removed`);
    let value = this.data[key];
    delete this.data[key]; // delete is only the key property
    this.size--;
    return value;
  }
}


class MessageSaved {
  constructor(username, message, namespace){
    let time = Date.now();
    this.messageID=`${username}:${'HASHED&%$#$%PASS874&'.slice(0, 10)}:${time}`;
    this.username = username;
    this.time = time;
    this.message = message;
    this.namespace = namespace.name.slice(1);
  }
} 

module.exports = { Queue, MessageSaved };