const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema(
    {
        title: String,
        description: string
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model('Note', notesSchema)

module.exports = Note;