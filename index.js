const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Port
const PORT = process.env.PORT || 4000;

// Config
require('dotenv').config({
    path: './config/keys.env'
})

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIES_SECRET));

// Import Error middleware
const {error} = require('./middleware/error')

// Import DB
const { connectDB } = require('./db/dbConnection')

// Connecting DB
connectDB();

// Import Routes
const indexRoute = require('./routes')
const notesRoute = require('./routes/notes')
const usersRoute = require('./routes/users')


// Handling Routes
app.use('/notes', notesRoute)
app.use('/users', usersRoute)
app.use('/', indexRoute)
app.use(error)


// create server
app.listen(PORT, () => {
    console.log(`Listening on the ${PORT}`)
})