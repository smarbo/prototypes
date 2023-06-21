const signupForm = document.getElementById("signupForm");
const statusMessage = document.getElementById("status-message");
import { createUser, getCookie, setCookies } from "/public/static/js/exports/exports.js";

if(getCookie("username")){
    window.location.href = "http://localhost:3000/join"
}

signupForm.addEventListener("submit", async(e)=> {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;

    const response = createUser(username, password);
    statusMessage.textContent = getCookie("message");
    if(getCookie("message-id") == "warn"){
        statusMessage.className = "warn";
    } else if(getCookie("message-id") == "success"){
        statusMessage.className = "success";
    }

    window.location.href = "http://localhost:3000/join"
})