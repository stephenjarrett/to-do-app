const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'to-do-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);

function getTodo(id) {
    db.any('select * from todos where id = $1', [id])
        .then(function (data) {
            // success;
            console.log(data);
        })
        .catch(function (error) {
            // error;
            console.log(error);
        });
}

// getTodo(1);

module.exports = {
    getTodo
}