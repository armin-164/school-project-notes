const mysql = require('mysql2');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'notesfed23',
    password: 'notesfed23',
    database: 'notesfed23',
})

module.exports = connection;