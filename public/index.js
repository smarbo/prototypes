// initialize all variables - inputs, buttons, API url, etc.
const usernameInput = document.getElementById("input-username")
const passwordInput = document.getElementById("input-password")
const submitButton = document.getElementById("button-submit")
const getUsersButton = document.getElementById("button-get-users")
const usersList = document.getElementById("users-list")
const url = "http://localhost:3000/users/"

// add 'click' event listener to submit button - creates new user
submitButton.addEventListener("click", async() => {
    // fetch username and password from their input fields
    let username = usernameInput.value
    let password = passwordInput.value
        // create user json object using the input data
    let user = {
        username: username,
        password: password,
        profile: `Cool guy ${username} is cool!`
    }
    try {
        // send a post request with the user object as request body to the API
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        console.log(await res.json());
        console.log("Success")
    } catch (error) {
        // in case there is an error
        console.log(error);
    }

})

// add 'click' event listener to get users button - gets all current users from db
getUsersButton.addEventListener("click", async() => {
    // resets users list html to be empty
    usersList.innerHTML = ""
    try {
        // fetch all users from api with a GET request to the url
        const res = await fetch(url)
            // parse the data into an array of JSON objects
        const resJson = await res.json()
        console.log(resJson);
        // for each user object, add it to users list as a list item with only username
        resJson.forEach(user => {
            usersList.innerHTML += `<li>${user.username}</li>`
        });
    } catch (error) {
        // in case there is an error
        console.log(error);
    }
})