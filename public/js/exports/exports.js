export async function createUser(username, password) {
  let url = "/users/";
  // create user json object using the input data
  let user = {
    username: username,
    password: password,
    profile: `Cool guy ${username} is cool!`,
    room: "",
  };
  try {
    // check if username already exists
    const url_ = `/users/v2/${username}`;
    const users = await (await fetch(url_)).json();
    console.log(users)
    if (users.length === 0) {
      // send a post request with the user object as request body to the API
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const resJson = await res.json();
      const cookies = [
        {
          name: "message",
          value: "Account creation success!",
        },
        {
          name: "profile",
          value: user.profile,
        },
        {
          name: "message-id",
          value: "success",
        },
        {
          name: "id",
          value: resJson._id,
        },
        {
          name: "username",
          value: user.username,
        },
        {
          name: "room",
          value: "",
        },
      ];
      setCookies(cookies);
      return resJson;
    } else {
      document.cookie = "message=Username already exists;";
      document.cookie = "message-id=warn";
    }
  } catch (error) {
    // in case there is an error
    document.cookie = `message=${error}`
    document.cookie = `message-id=warn`
  }
}

export async function getUsers(parentElement, childType) {
  let url = "/users/";
  // resets users list html to be empty
  parentElement.innerHTML = "";
  try {
    // fetch all users from api with a GET request to the url
    const res = await fetch(url);
    // parse the data into an array of JSON objects
    const resJson = await res.json();
    // for each user object, add it to users list as a list item with only username
    resJson.forEach((user) => {
      parentElement.innerHTML += `<${childType}>${user.username}</${childType}>`;
    });
  } catch (error) {
    document.cookie = `message=${error}`
    document.cookie = `message-id=warn`
  }
}

export async function loginUser(username, password) {
  let url = `/users/login/${username}?password=${password}`;
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    document.cookie = `message=${error}`
    document.cookie = `message-id=warn`
  }
}

/* Cookie Functions */
export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getCookies() {
  let cookies = document.cookie.split(";");
  let cookiesObject = {};

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();

    if (cookie !== "") {
      let cookiePair = cookie.split("=");
      let ckey = cookiePair[0];
      let cvalue = cookiePair[1];
      cookiesObject[ckey] = cvalue;
    }
  }
  return cookiesObject;
}

export function setCookies(cookies) {
  for (let i = 0; i < cookies.length; i++) {
    document.cookie = `${cookies[i].name}=${cookies[i].value}`;
  }
}

export function joinRoom(roomCode, window) {
  setCookies([
    {
      name: "room",
      value: roomCode,
    },
  ]);
  window.location.href = "/chat";
}
