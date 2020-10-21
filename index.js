const express = require('express');
const app = express();

const port = 4000;


app.get('/', (req, res) => {
    console.log(req.url);
    const author = {
        name: 'Mostafa',
        profession: 'Web Developer'
    }
    // res.json(author)
    res.send(author)
})

app.get('*', (req, res)=> {
    res.send('Not Found')
})


// create server
app.listen(port, ()=> {
    console.log(`Listening on the ${port}`)
})