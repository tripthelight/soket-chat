'use strict';

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('#chatting-input');
const sendButton = document.querySelector('.send-button');
const displayContainer = document.querySelector('.display-container');

chatInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    send();
    chatInput.value = '';
  }
});

sendButton.addEventListener('click', send);

function send() {
  const param = {
    name: nickname.value,
    msg: chatInput.value
  }

  if (nickname.value == '') {
    document.querySelector('#nickname').focus();
    alert('닉네임을 입력해 주세요.')
  } else if (chatInput.value == '') {
    document.querySelector('#chatting-input').focus();
    alert('아무말이나 입력해 주세요.');
  } else {
    socket.emit('chatting', param);
  }
}

socket.on('chatting', (data) => {
  console.log(data);
  const { name, msg, time } = data;
  const item = new Limodel(name, msg, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function Limodel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement('li');
    li.classList.add(nickname.value === this.name ? 'sent' : 'received');
    const dom = `
    <span class="profile">
      <span class="user">${this.name}</span>
      <img src="https://placeimg.com/50/50/any" alt="profile" class="image" />
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>
    `;
    li.innerHTML = dom;
    chatList.appendChild(li);
  }
}