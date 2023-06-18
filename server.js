const config = require('./config');
const express = require('express');
const app = express();

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello" })
})

// Run API server
app.listen(config.PORT, () => {
    console.log(`API running on port ${config.PORT}`);
})