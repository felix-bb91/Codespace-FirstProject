const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    database: 'project1_2',
    password: 'root',
});

module.exports = pool.promise();


