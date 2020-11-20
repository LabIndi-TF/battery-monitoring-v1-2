var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '192.168.0.102',
  user: 'Python',
  password : 'password',
  database: 'mysql'
});

/*
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mysql'
})
*/

connection.connect();
connection.query('SHOW DATABASES;', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
});

/*
connection.query('SELECT host,user from mysql.user;', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)
});
*/
connection.end();
