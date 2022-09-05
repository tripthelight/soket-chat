'use strict';

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('#chatting-input');
const sendButton = document.querySelector('.send-button');
const displayContainer = document.querySelector('.display-container');

window.addEventListener('DOMContentLoaded', loadLiCheck);

chatInput.addEventListener('keypress', function(event) {
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

socket.on('chatting', function (data) {
  // const { name, msg, time } = data;
  const name = data.name;
  const msg = data.msg;
  const time = data.time;
  const item = new Limodel(name, msg, time);
  item.makeLi();
  displayContainer.scrollTop = displayContainer.scrollHeight;
});

function Limodel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = function () {
    loadLiCheck();

    const li = document.createElement('li');
    li.classList.add(nickname.value === this.name ? 'sent' : 'received');

    let dom = '';
    dom += '<span class="profile">';
    dom += '<span class="user">' + this.name + '</span>';
    dom += '<img src="https://placeimg.com/50/50/any' + "?nocache=" + Math.random() + '" alt="profile" class="image" />';
    dom += '</span>';
    dom += '<span class="message">' + this.msg + '</span>';
    dom += '<span class="time">' + this.time + '</span>';
    li.innerHTML = dom;

    chatList.appendChild(li);
  }
}

function loadLiCheck() {
  let liElem = document.querySelectorAll('.chatting-list li');
  if (liElem.length > 100) {
    for (let i = 0; i < liElem.length-10; i++) {
      liElem[i].parentNode.removeChild(liElem[i]);
    }
  }
}
