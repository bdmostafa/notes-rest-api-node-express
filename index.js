const express = require('express');
const app = express();

const port = 4000;


app.get('/', (req, res) => {
    res.send('I am from Node js')
})




// create server
app.listen(port, ()=> {
    console.log(`Listening on the ${port}`)
})