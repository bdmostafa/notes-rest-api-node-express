const express = require('express');
const app = express();

const port = 4000;

// Middleware
app.use(express.json());

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


// create server
app.listen(port, () => {
    console.log(`Listening on the ${port}`)
})