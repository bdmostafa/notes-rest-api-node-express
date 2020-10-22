const express = require('express');
const app = express();

// Middleware
app.use(express.json());

const port = 4000;

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
    if(notes.length === 0){
        return res.send('No Notes Found')
    }
    res.send(notes);
})

// GET single note
app.get('/notes/:noteId', (req, res) => {
    const noteId = parseInt(req.params.noteId);

    const note = notes.find(note => note.id === noteId)
    if(note) return res.send(note)
    res.status(404).send('Note Not Found')
})

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})


// POST request
app.post('/note', (req, res)=> {
    const newNote = req.body;
    // console.log(newNote)
    notes = [...notes, newNote];
    res.send(notes)
    console.log(notes)
})







// create server
app.listen(port, () => {
    console.log(`Listening on the ${port}`)
})