const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 4000;

// Middleware
app.use(express.json());

// Connecting database
try {
    mongoose.connect(
        'mongodb://localhost:27017/notes-app',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log('database connected successfully'))
} catch (err) {
    console.log(err)
}



let notes = [
    {
        id: 1,
        title: 'Note title 1',
        description: 'Note description'
    },
    {
        id: 2,
        title: 'Note title 2',
        description: 'Note description'
    },
    {
        id: 3,
        title: 'Note title 3',
        description: 'Note description'
    },
]

app.get('/', (req, res) => {
    // console.log(req.url);
    // const author = {
    //     name: 'Mostafa',
    //     profession: 'Web Developer'
    // }
    // res.json(author)
    res.send("Welcome to Notes APP")
})

// app.get('/user/:name', (req, res) => {
//     const name = req.params.name;

//     res.send(`Hello ${name}`)
// })

// GET all notes
app.get('/notes', (req, res) => {
    if (notes.length === 0) {
        return res.send('No Notes Found')
    }
    res.send(notes);
})

// GET single note
app.get('/notes/:noteId', (req, res) => {
    const noteId = parseInt(req.params.noteId);

    const note = notes.find(note => note.id === noteId)
    if (note) return res.send(note)
    res.status(404).send('Note Not Found')
})

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})


// Add note
app.post('/note', (req, res) => {
    const newNote = req.body;
    // console.log(newNote)
    notes = [...notes, newNote];
    res.send(notes)
    console.log(notes)
})


// Update note
app.put('/notes/:noteId', (req, res) => {
    // validation inputData/update operation
    const noteId = parseInt(req.params.noteId);
    const noteInput = req.body;
    const keysInput = Object.keys(noteInput)
    const allowedForUpdates = ['title', 'description'];
    const isAllowed = keysInput.every(update => allowedForUpdates.includes(update))

    if (!isAllowed) {
        return res.status(400).send('Invalid Update Operation.')
    }
    // Check if note exists
    const note = notes.find(note => note.id === noteId)
    try {
        if (note) {
            // Update here
            notes = notes.map(note => {
                if (note.id === noteId) {
                    return {
                        ...note,
                        ...noteInput
                    };
                } else {
                    return note;
                }
            });
            return res.send(notes)
        } else {
            // Note not found
            return res.status(404).send('Note Not Found.')
        }
    } catch (err) {
        // Server error
        res.status(500).send('Internal Server Error.')
    }
})


// Delete notes
app.delete('/notes/:noteId', (req, res) => {
    const noteId = parseInt(req.params.noteId);
    try {
        // Check if note exists
        const note = notes.find(note => note.id === noteId)
        if (note) {
            // Delete Note
            notes = notes.filter(note => note.id !== noteId);
            res.send(notes)
        } else {
            // Note Not Found
            res.status(404).send('Note Not Found')
        }
    } catch (err) {
        res.status(500).send('Internal Server Error.')
    }
})


// create server
app.listen(port, () => {
    console.log(`Listening on the ${port}`)
})