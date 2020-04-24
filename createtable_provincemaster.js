var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3307',
  database: 'givemakeadifference'
});


con.connect(function(err) {
  if (err) {
    return console.log("Error1 - " + err.message);
  }
  console.log("Connected!");
  var sql = "CREATE TABLE ProvinceMaster (    ProvinceId int NOT NULL AUTO_INCREMENT,    ProvinceName varchar(100) NOT NULL,    PRIMARY KEY (ProvinceId))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});