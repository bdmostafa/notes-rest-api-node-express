const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const port = 4000;

//Models
const Note = require('./models/notes');

// Middleware
app.use(express.json());

// Connecting database
try {
    mongoose.connect(
        'mongodb://localhost:27017/notes-app',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        () => console.log('database connected successfully'))
} catch (err) {
    console.log(err)
}



let notes = [
    // {
    //     id: 1,
    //     title: 'Note title 1',
    //     description: 'Note description'
    // },
    // {
    //     id: 2,
    //     title: 'Note title 2',
    //     description: 'Note description'
    // },
    // {
    //     id: 3,
    //     title: 'Note title 3',
    //     description: 'Note description'
    // },
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
app.get('/notes', async (req, res) => {

    // Getting notes from fake data array
    // try {
    //     if (notes.length === 0) {
    //         return res.send('No Notes Found')
    //     }
    //     res.send(notes);
    // } catch (err) {
    //     res.status(500).send('Internal Server Error.')
    // }

    // Getting notes from server
    try {
        const notes = await Note.find();
        res.send(notes);
    } catch (err) {
        res.status(500).send(err)
    }


})

// GET single note
app.get(
    '/notes/:noteId',
    check('noteId', 'Note Not Found').isMongoId(),
    async (req, res) => {

        // Getting note from fake data array
        // const noteId = parseInt(req.params.noteId);
        // try {
        //     const note = notes.find(note => note.id === noteId)
        //     if (note) return res.send(note)
        //     res.status(404).send('Note Not Found')
        // } catch (err) {
        //     res.status(500).send(err)
        // }

        // Check on validationResult
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).send('Note Not Found')
        }

        // Getting note from server
        try {
            const id = req.params.noteId;
            const note = await Note.findById(id);
            if (!note) return res.status(404).send('Note Not Found')
            res.send(note)
        } catch (err) {
            res.status(500).send(err)
        }
    })

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})


// Add note
app.post(
    '/note',
    [
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),

        // For multiple validation rules
        // check('description')
        //     .notEmpty()
        //     .withMessage('Description is required')
        //     .isLength({ min: 10, max: 100 })
        //     .withMessage('Description be in 10 to 100 characters')

    ],
    async (req, res) => {
        // Firstly check on validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        // If valid, then execute to add a new note
        try {
            const newNote = new Note(req.body);
            await newNote.save();
            res.send(newNote)
        } catch (err) {
            res.status(400).send(err)
        }

        // This part was for fake data array
        // try {
        //     notes = [...notes, newNote];
        //     res.send(notes)
        // } catch (err) {
        //     console.log(err)
        // } 

    })


// Update note
app.put(
    '/notes/:noteId',
    [
        check('noteId', 'Note Not Found').isMongoId(),
        check('title', 'Title is required')
            .optional()
            .notEmpty(),
        check('description', 'Description is required')
            .optional()
            .notEmpty(),
    ],
    async (req, res) => {
        const id = req.params.noteId;

        // validation update operation and inputData
        const noteInputValue = req.body;
        const keysInput = Object.keys(noteInputValue)
        const allowedForUpdates = ['title', 'description'];
        const isAllowed = keysInput.every(update => allowedForUpdates.includes(update))

        if (!isAllowed) return res.status(400).send('Invalid Update Operation.')

        // Dealing with errors on express-validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(404).send(errors.array());

        // After passing all errors and validations, executes try/catch
        // Update note from server
        try {
            const note = await Note.findByIdAndUpdate(id, noteInputValue, {
                // For adding new note to be updated
                new: true,
                // Active validating rules from Schema model when updating
                // runValidators: ture,
                // context: 'query'
            });
            if (!note) return res.status(404).send('Note Not Found');
            res.send(note);
        } catch (err) {
            res.status(500).send('Internal Server Error.')
        }


        // Update note from fake data array
        // // validation inputData/update operation
        // const noteId = parseInt(req.params.noteId);
        // const noteInput = req.body;
        // const keysInput = Object.keys(noteInput)
        // const allowedForUpdates = ['title', 'description'];
        // const isAllowed = keysInput.every(update => allowedForUpdates.includes(update))

        // if (!isAllowed) {
        //     return res.status(400).send('Invalid Update Operation.')
        // }
        // // Check if note exists
        // const note = notes.find(note => note.id === noteId)
        // try {
        //     if (note) {
        //         // Update here
        //         notes = notes.map(note => {
        //             if (note.id === noteId) {
        //                 return {
        //                     ...note,
        //                     ...noteInput
        //                 };
        //             } else {
        //                 return note;
        //             }
        //         });
        //         return res.send(notes)
        //     } else {
        //         // Note not found
        //         return res.status(404).send('Note Not Found.')
        //     }
        // } catch (err) {
        //     // Server error
        //     res.status(500).send('Internal Server Error.')
        // }



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