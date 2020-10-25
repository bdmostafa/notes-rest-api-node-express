const express = require('express');
const router = express.Router();

// Home Route
router.get('/', (req, res) => {
    res.send("Welcome to Notes APP")
})

// Not Found Route
router.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

module.exports = router;