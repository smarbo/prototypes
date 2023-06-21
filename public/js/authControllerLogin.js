const loginForm = document.getElementById("loginForm");
const statusMessage = document.getElementById("status-message");
import { loginUser, getCookie, setCookies } from "/public/static/js/exports/exports.js";

if(getCookie("username")){
    window.location.href = "http://localhost:3000/join"
}

loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    const response = await loginUser(username, password);

    statusMessage.textContent = getCookie("message");
    if(getCookie("message-id") == "warn"){
        statusMessage.className = "warn";
    } else if(getCookie("message-id") == "success"){
        statusMessage.className = "success";
    }

    window.location.href = "http://localhost:3000/join"
})
