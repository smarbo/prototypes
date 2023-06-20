// import express, user model, and express router
const express = require("express");
const User = require("../models/userModel");
let router = express.Router();

// Express.JS Middleware functions
router.use(express.urlencoded())
router.use(express.json())

// router route '/' this is used for requests without parameters
router
// create user POST route
    .route("/")
    .post(async(req, res) => {
        console.log("POST /users/ REQUEST");
        try {
            // create user with request body
            const user = await User.create(req.body);
            // send back the user object if successful
            res.status(200).json(user);
        } catch (error) {
            // in case there is an error
            console.log(error.message);
            console.log(req.body)
            res.status(500).json({ message: error.message });
        }
    })

// get users GET route
.get(async(req, res) => {
    console.log("GET /users/ REQUEST");
    try {

        // find all users in the DB
        const users = await User.find({});
        // send back all users if successful - in an array of JSON objects
        res.status(200).json(users);
    } catch (error) {
        // in case of an error
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

// router route '/:id' this is used if you want to use a specific user
router
// find user by id GET route
    .route("/:id")
    .get(async(req, res) => {
        console.log("GET /users/:id REQUEST");
        try {
            // fetch ID from request parameters
            const { id } = req.params;
            // find user with the ID
            const user = await User.findById(id);
            // if success then send back the user
            res.status(200).json(user)
        } catch (error) {
            // in case of an error
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    })
    // update user by id PUT route
    .put(async(req, res) => {
        console.log("PUT /users/:id REQUEST");
        try {
            // fetch ID from request parameters
            const { id } = req.params;
            console.log(req.body);
            // find and update user with the ID and update using request body
            const user = await User.findByIdAndUpdate(id, req.body);
            // if no user exists with the ID
            if (!user) {
                return res.status(404).json({ message: `Cannot find user with ID ${id}` });
            }
            // if success, send back the updated user object
            res.status(200).json(await User.findById(id));
        } catch (error) {
            // in case of an error
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    })
    // delete user by id DELETE route
    .delete(async(req, res) => {
        console.log("DELETE /users/:id REQUEST");
        try {
            // fetch ID from request parameters
            const { id } = req.params;
            // find user by id and delete them
            const user = await User.findByIdAndDelete(id);
            // if no user exists
            if (!user) {
                return res.status(404).json({ message: `Cannot find user with ID ${id}` });
            }
            // if successful, send back the user who was deleted
            res.status(200).json({ user });
        } catch (error) {
            // in case of an error
            console.log(error.message)
            res.status(500).json({ message: error.message });
        }
    })

router
// login user by username GET route
    .route("/login/:username")
    .get(async(req, res) => {
        console.log("GET /users/login/:username REQUEST");
        try {
            const { username } = req.params;
            const { password } = req.query;

            const userArray = await User.find({
                username: username,
            });
            const user = userArray[0]

            console.log(user.username)
            console.log(user.password)
            console.log(password)
            if (!user) {
                res.cookie("message", "User not found")
                res.cookie("message-id", "warn");
                console.log("User doesnt exist");
                return res.status(404).json({ message: `Cannot find user with username ${username}}` });

            }
            if (user.password === password) {
                // successfully log in!
                console.log(user.password)
                res.cookie("username", user.username);
                res.cookie("id", user._id)
                res.cookie("profile", user.profile);
                res.cookie("message", "Logged in successfully!")
                res.cookie("message-id", "success")
                res.status(200).json({ message: "Success login" })
            } else {
                console.log("Incorrect password")
                res.cookie("message", "Incorrect password!")
                res.status(403).json({ message: "Bad password" })
            }
        } catch (error) {
            console.log(error.message)
            res.cookie("message", "User not found!")
            res.status(404).json({ message: error.message });
        }
    })

router
    .route("/v2/:username")
    .get(async(req, res) => {
        console.log("GET /users/:username REQUEST");
        try {
            const { username } = req.params
            const user = await User.find({
                username: username
            });
            res.status(200).json(user);
        } catch (error) {
            console.log(error)
        }
    })

// export the router
module.exports = router;