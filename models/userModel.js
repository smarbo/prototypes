// Import mongoose module -- mongoose allows to make models for mongodb
const mongoose = require('mongoose');

// create user schema - a set of rules each user document has to follow
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    profile: {
        type: String,
        required: false
    },
    following: [{ username: String }],
    room: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})

// create user model using user schema and export.
const User = mongoose.model("User", userSchema);

module.exports = User;