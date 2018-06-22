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
    return db.oneOrNone('select * from todos where id = $1', [id])
}

function getAll() {
    return db.any('select * from todos');
}

function getPending() {
    return db.any('select * from todos where isDone=false');
}

function getFinished() {
    return db.any('select * from todos where isDone=true');
}

getFinished()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });

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
    getFinished
}