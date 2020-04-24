var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'mukesh',
  password: 'Mukesh@123',
  port: '3307'
});

con.connect(function(err) {
    if (err) {
        console.log("Error1");
        return console.error('error: ' + err.message);
      }
  console.log("Connected!");
  con.query("CREATE DATABASE GIVEMAKEADIFFERENCE", function (err, result) {
    if (err) {
        console.log("Error2");
        return console.error('error: ' + err.message);
      }
    console.log("Database created");
  });
});