const express = require('express');
const app = express();
const port = 3000;

const Todo = require('./db');

const expressHbs = require('express-handlebars');

const staticMiddleware = express.static('public');
app.use(staticMiddleware);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/', (req, res) => {
    console.log(req.body);
    Todo.add(req.body.title)
        .then(res.redirect('/'));
});

//route for a new task
app.get('/new', (req, res) => {
    res.render('create-page');
});

//append the new task to DB and redirect to new task page
app.post('/new', (req, res) => {
    console.log(req.body);
    Todo.add(req.body.title)
        .then((data) => {
            res.redirect(`/${data.id}`);
        })
});

//route by id
app.get('/:id', (req,res) => {
    Todo.getOne(req.params.id)
    .then((data) => {
        console.log(data);
        // res.send(data);
        res.render('unique', data);
    }).catch((error) => {
        res.send(error);
    });
});

//edit tasks - get the edit page
app.get('/:id/edit', (req, res) => {
    Todo.getOne(req.params.id)
        .then((data) => {
            res.render('edit-id', data);
        }).catch((error) => {
            res.send(error);
        });
    });

//edit tasks - post the changes and reload page
app.post('/:id/edit', (req, res) => {
    console.log(req.body);
    let id = req.params.id;
    console.log(id);
    Todo.setTitle(id, req.body.title)
        .then(() => {
            res.redirect(`/${id}`);
        })
});

app.listen(port, () => {
    console.log(`Your server is running at http://localhost:${port}`);
})