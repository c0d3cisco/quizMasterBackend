'use strict';

const { Queue } = require('../src/classObjects.js');

function handlerQueueLoading (payload, messageQueue) {
  console.log(payload);
  let currentQueue = messageQueue.read(`${payload.namespace}`);
  if(!currentQueue){
    let queueKey = messageQueue.store(payload.namespace, new Queue);
    currentQueue = messageQueue.read(queueKey);
  }
  currentQueue.store(`${payload.username}:<futurePassWordHASH>:${payload.time}`, payload);
}


function handlerDequeue(payload, messageQueue) {
  let currentQueue = messageQueue.read(payload.queueId);
  if(!currentQueue){
    throw new Error('whoops');
  }
  return currentQueue.remove(payload.guid);
}



module.exports = { handlerDequeue, handlerQueueLoading };
