'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'cram'
});

connection.connect();

connection.query('select * from cram.usuarios', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
});

connection.end();