// initialize all variables - inputs, buttons, API url, etc.
const usernameInput = document.getElementById("input-username")
const passwordInput = document.getElementById("input-password")
const submitButton = document.getElementById("button-submit")
const loginButton = document.getElementById("button-login")
const welcomeMessage = document.getElementById("welcome-message")
const message = document.getElementById("message")
const getUsersButton = document.getElementById("button-get-users")
import { getCookie } from "/public/static/js/exports/exports.js"
import { getCookies } from "/public/static/js/exports/exports.js"
import { createUser } from "/public/static/js/exports/exports.js"
import { getUsers } from "/public/static/js/exports/exports.js"
import { loginUser } from "/public/static/js/exports/exports.js"
const usersList = document.getElementById("users-list")
const url = "http://localhost:3000/users/"

console.log("Loaded index.js")
welcomeMessage.textContent = "You are not logged in."

// add 'click' event listener to submit button - creates new user
submitButton.addEventListener("click", async() => {
    // fetch username and password from their input fields
    let username = usernameInput.value
    let password = passwordInput.value
    await createUser(username, password)
    await getUsers(usersList, "li")
    renderMessages()
})

loginButton.addEventListener("click", async() => {
    let username = usernameInput.value
    let password = passwordInput.value
    await loginUser(username, password);
    renderMessages()
})

function renderMessages() {
    if (getCookie("id")) {
        welcomeMessage.textContent = `Welcome, ${getCookie("username")}!`
    } else {
        welcomeMessage.textContent = "You are not logged in."
    }
    message.textContent = getCookie("message")
    document.cookie = "message="
}



// add 'click' event listener to get users button - gets all current users from db
getUsersButton.addEventListener("click", getUsers(usersList, "li"))
renderMessages()
console.log(getCookies());
console.log(getCookie("message"))