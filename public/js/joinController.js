const joinForm = document.getElementById("joinForm");
const statusMessage = document.getElementById("status-message");
import { getCookie, setCookies } from "/public/static/js/exports/exports.js";

if(!getCookie("username")){
    window.location.href = "http://localhost:3000/"
}

let username = getCookie("username");

joinForm.addEventListener("submit", async(e)=> {
    e.preventDefault();
    let roomCode = e.target.elements.room.value;
    setCookies([
        {
            name: "room",
            value: roomCode
        }
    ])
    window.location.href = "http://localhost:3000/chat";
})