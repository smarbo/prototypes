const welcomeMessage = document.getElementById("welcome-msg");
import { getCookie } from "/public/static/js/exports/exports.js";

welcomeMessage.textContent = ` Welcome, ${getCookie("username")}!`;