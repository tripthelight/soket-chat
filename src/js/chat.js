'use strict';

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');

sendButton.addEventListener('click', () => {
  
})

socket.emit('chatting', 'from front');

socket.on('chatting', (data) => {
  console.log(data);
});

console.log(socket);