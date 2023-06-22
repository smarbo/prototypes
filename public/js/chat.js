const messageForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users")
import { getCookie } from "/public/static/js/exports/exports.js";

// get username and room from cookie
const username = getCookie("username");
const room = getCookie("room");

if(!username){
    window.location.href = "/";
} else if(!room){
    window.location.href = "/join";
}

const socket = io();

// join room
socket.emit('joinRoom', {username, room});

// get room and users
socket.on("roomUsers", ({ room, users })=> {
    renderRoomName(room);
    renderUsers(users);
})

// message from server
socket.on("message", message => {
    renderMessage(message);
})

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // get message text
    const msg = e.target.elements.msg.value;
    // emit it to server
    socket.emit("chatMessage", msg)

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

// render message to DOM
function renderMessage(message) {
    const div = document.createElement('div');
    div.classList.add("message");
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    chatMessages.appendChild(div)
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderRoomName(room){
    roomName.textContent = room;
}

function renderUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join()}
    `
}