const joinForm = document.getElementById("joinForm");
const statusMessage = document.getElementById("status-message");
import { getCookie, setCookies, joinRoom } from "/public/static/js/exports/exports.js";


let username = getCookie("username");
if(!username){
    window.location.href = "/"
}



joinForm.addEventListener("submit", async(e)=> {
    e.preventDefault();
    let roomCode = e.target.elements.room.value;
    joinRoom(roomCode, window);
})
