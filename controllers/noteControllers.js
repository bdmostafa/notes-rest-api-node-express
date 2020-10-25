const { validationResult } = require('express-validator');

//Models
const Note = require('../models/notes');

module.exports.addNoteController = async (req, res) => {
    // Firstly check on validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());

    // If valid, then execute to add a new note
    try {
        const newNote = new Note(req.body);
        await newNote.save();
        res.send(newNote)
    } catch (err) {
        res.status(400).send(err)
    }
};

module.exports.getNotesController = async (req, res) => {
    console.log(req.user)

    // Getting notes from server
    try {
        const notes = await Note.find();
        res.send(notes);
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.getNoteController = async (req, res) => {

    // Check on validationResult
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(404).send('Note Not Found')

    // Getting note from server
    try {
        const id = req.params.noteId;
        const note = await Note.findById(id);
        if (!note) return res.status(404).send('Note Not Found')
        res.send(note)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.deleteNoteController = async (req, res) => {

    // Delete from database
    const id = req.params.noteId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());

    // Delete note from server
    try {
        const note = await Note.findByIdAndDelete(id);
        if (!note) return res.status(404).send('Note Not Found');
        res.send(note)

    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.updateNoteController = async (req, res) => {
    const id = req.params.noteId;
    const noteInputValue = req.body;

    // validation update operation and inputData
    const keysInput = Object.keys(noteInputValue)
    const allowedForUpdates = ['title', 'description'];

    // Check if any extra invalid field out of allowedForUpdates is requested or not
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

}