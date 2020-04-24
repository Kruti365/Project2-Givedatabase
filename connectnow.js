var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kruti@31dec',
  port: '3306',
  database: 'givemakeadifference'
});


con.connect(function(err) {
  if (err) {
    return console.log("Error1 - " + err.message);
  }
  console.log("Connected!");
  var sql = "CREATE TABLE ContactUs (Id bigint NOT NULL AUTO_INCREMENT,Name varchar(100) NOT NULL,EmailId varchar(100) not null,MobileNo varchar(20) not null,  PRIMARY KEY (Id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});