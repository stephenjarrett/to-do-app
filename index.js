const express = require('express');
const app = express();
const port = 3000;

const Todo = require('./db');

app.get('/', (req,res) => {
    Todo.getAll()
        .then((data) => {
            console.log(data);
            res.send(data);
        }).catch((error) => {
            res.send(error);
        });
});

app.listen(port, () => {
    console.log(`Your server is running at http://localhost:${port}`);
})