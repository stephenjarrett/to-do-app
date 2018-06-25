const express = require('express');
const app = express();
const port = 3000;

const Todo = require('./db');

const expressHbs = require('express-handlebars');

const staticMiddleware = express.static('public');
app.use(staticMiddleware);

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req,res) => {
    Todo.getAll()
        .then((data) => {
            console.log(data);
            res.render('homepage', {
                todos: data
            });
        }).catch((error) => {
            res.send(error);
        });
});

app.get('/:id', (req,res) => {
    Todo.getOne(req.params.id)
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