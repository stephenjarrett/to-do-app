const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'to-do-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);

function getOne(id) {
    return db.oneOrNone('select * from todos where id = $1', [id]);
}

function getAll() {
    return db.any('select * from todos order by id');
}

function getPending() {
    return db.any('select * from todos where isDone=false');
}

function getFinished() {
    return db.any('select * from todos where isDone=true');
}

function searchByTitle(searchString) {
    return db.any("select * from todos where title ilike '%$1#%'", [searchString]);
}

function deleteById(id) {
    return db.result('delete from todos where id = $1', [id]);
}

function setFinished(id, isDone) {
    return db.result('update todos set isDone =$1 where id =$2', [isDone,id]);
}

function setTitle(id, newTitle) {
    return db.result("update todos set title ='$1#' where id =$2", [newTitle, id]);
}

function add(title) {
    return db.one("insert into todos (title, isDone) values ('$1#', false) returning id", [title]);
}

// add('njoy gaming')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// setTitle(7, 'feed the awesome pets')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// setFinished(7, true)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// deleteById(1)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// searchByTitle('wash')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// getFinished()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// getPending()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

    // getAll()
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
// getOne(1)
//     .then(function (data) {
//         // success;
//         console.log(data);
//     })
//     .catch(function (error) {
//         // error;
//         console.log('This is error occurred:');
//         console.log(error);
//     });

module.exports = {
    getOne,
    getAll,
    getPending,
    getFinished,
    searchByTitle,
    deleteById,
    setFinished,
    setTitle,
    add
}