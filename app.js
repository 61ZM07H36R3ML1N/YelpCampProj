const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello from yelpcamp!!!')
})



app.listen(3001, ()=> {
    console.log('Serving on port 3001')
})