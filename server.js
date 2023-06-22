// import config, express, mongoose, users router, path, and initialize express app
const config = require('./config');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const users = require("./routes/users");
const path = require("path");
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const formatMessage = require("./public/js/exports/messages");
const {userJoin,getCurrentUser, userLeave, getRoomUsers} = require("./public/js/exports/users");
const botName = "SmarboBot";

// Express.JS Middleware functions
app.use("/users", users);
app.use(express.json());
app.use(express.urlencoded());
app.use("/public/static/", express.static("public"))

// Routes
// '/' route - home page
app.get("/", (req, res) => {
    // set status code to 200 - success
    res.statusCode = 200;
    // send back the index.html file which is the home page
    res.sendFile(path.join(__dirname, "public", "html", "index.html"));
    // log to the console that there was a request
    console.log("GET / REQUEST");
})

app.get("/signup", (req,res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "public", "html", "signup.html"))
    console.log("GET /signup REQUEST");
})

app.get("/login", (req,res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "public", "html", "login.html"))
    console.log("GET /login REQUEST");
})

app.get("/logout", (req,res) => {
    res.statusCode = 200;
    res.clearCookie("username")
    res.clearCookie("id")
    res.clearCookie("profile")
    res.clearCookie("message")
    res.clearCookie("message-id")
    res.clearCookie("room")
    res.redirect("/");

})

app.get("/test", (req,res) => {
    // set statud code to 200 - success
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "public", "html", "test.html"));
    console.log("GET /test REQUEST");
})

app.get("/chat", (req,res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "public", "html", "chat.html"))
    console.log("GET /chat REQUEST");
})

app.get("/join", (req,res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, "public", "html", "join.html"))
    console.log("GET /join REQUEST");
})

// run when client connects to websocket
io.on('connection', socket => {
    socket.on("joinRoom", ({username, room})=> {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        // broadcast to all that user has joined
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has joined the chat`));
        // welcome user who joined
        socket.emit("message", formatMessage(botName, `Welcome to Nodechat Room "${room}"! Disappearing messages are enabled. Remember to be kind and respectful towards others :)`))

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
    
    
    //listen for chatMessage
    socket.on("chatMessage", (msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username,msg));
    })
    // on disconnect broadcast to all that user has left
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat.`));
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            })   
        }
        console.log("Socket Connection Closed")

        
    })
})

console.log("Attempting to connect to MongoDB...");
// Connect to MongoDB using Mongoose
mongoose.connect(config.MONGOOSEURI)
    .then(() => {
        console.log("Successfully connected to MongoDB🍃");
        // Run API server
        console.log("Attempting to run server...");
        server.listen(config.PORT, () => {
            console.log(`API running on port ${config.PORT}`);
        })
    }).catch((error) => {
        // in case of an error.
        console.log(`Something bad happened: ${error}`);
    })