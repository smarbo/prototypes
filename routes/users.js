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


// export the router
module.exports = router;