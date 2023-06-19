// import config, express, mongoose, users router, path, and initialize express app
const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const users = require("./routes/users");
const path = require("path");
const app = express();

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
    res.sendFile(path.join(__dirname, "public", "index.html"));
    // log to the console that there was a request
    console.log("GET / REQUEST");
})

// Connect to MongoDB using Mongoose
mongoose.connect(config.MONGOOSEURI)
    .then(() => {
        console.log("Successfully connected to MongoDB🍃");
        // Run API server
        app.listen(config.PORT, () => {
            console.log(`API running on port ${config.PORT}`);
        })
    }).catch((error) => {
        // in case of an error.
        console.log(`Something bad happened: ${error}`);
    })