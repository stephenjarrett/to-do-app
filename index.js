const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = 3000;

const setupAuth = require('./auth');
const ensureAuthenticated = require('./auth').ensureAuthenticated;

const Todo = require('./db');

const expressHbs = require('express-handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const staticMiddleware = express.static('public');
app.use(staticMiddleware);

setupAuth(app);

//grabs all tasks and displays them
app.get('/', (req,res) => {
    Todo.getAll()
        .then((data) => {
            // console.log(data);
            res.render('homepage', {
                todos: data
            });
        }).catch((error) => {
            res.send(error);
        });
});

//post used to add a new task via the form on homepage
app.post('/', (req, res) => {
    console.log(req.body);
    Todo.add(req.body.title)
        .then(res.redirect('/'));
});

//route for a new task
app.get('/new', ensureAuthenticated, (req, res) => {

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
    let newTitle = req.body.title;
    let isdone = req.body.isdone;

    if (isdone) {
        console.log('setting as finished');
        Todo.setFinished(id, isdone);
    } else {
        console.log('Setting as incomplete');
        Todo.setFinished(id,'false');
    }

    if (newTitle) {
        Todo.setTitle(id, newTitle)
            .then(() => {
                res.redirect(`/`);
            })
    }
    else {
        res.redirect(`/`);
    }
});

//delete tasks - get the delete page
app.get('/:id/delete', (req, res) => {
    Todo.getOne(req.params.id)
        .then((data) => {
            res.render('delete-id', data);
        }).catch((error) => {
            res.send(error);
        });
    });

//delete tasks - post the changes and reload page
app.post('/:id/delete', (req, res) => {
    let id = req.params.id;
    console.log(id);
    Todo.deleteById(id)
        .then(console.log('Deleted'),res.redirect('/'))
});

//server initialization
app.listen(port, () => {
    console.log(`Your server is running at http://localhost:${port}`);
})