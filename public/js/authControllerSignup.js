const signupForm = document.getElementById("signupForm");
const statusMessage = document.getElementById("status-message");
import {
  createUser,
  getCookie,
  setCookies,
} from "/public/static/js/exports/exports.js";

if (getCookie("username")) {
  window.location.href = "/";
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;
  let passwordC = e.target.elements.passwordC.value;

  if (password === passwordC) {
    const response = createUser(username, password);
    statusMessage.textContent = getCookie("message");
    if (getCookie("message-id") == "warn") {
      statusMessage.className = "warn";
      statusMessage.textContent = getCookie("message");
      e.target.elements.username.value = "";
      e.target.elements.password.value = "";
      e.target.elements.passwordC.value = "";
      e.target.elements.username.focus();
    } else if (getCookie("message-id") == "success") {
      statusMessage.className = "success";
      window.location.href = "/";
    }
  } else {
    statusMessage.className = "warn";
    statusMessage.textContent = "The passwords do not match!";
    e.target.elements.username.value = "";
    e.target.elements.password.value = "";
    e.target.elements.passwordC.value = "";
  }
});
