const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const products = require("./routes/products");
const app = express();

app.use("/products", products);
app.use(express.json());
app.use(express.urlencoded())
    // Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, this is my API" });
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
        console.log(`Something bad happened: ${error}`);
    })