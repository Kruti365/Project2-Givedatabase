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
    return console.log("Error1; - " + err.message);
  }
  console.log("Connected!");
  var sql = "CREATE TABLE CityMaster (    CityId int NOT NULL AUTO_INCREMENT,    CityName varchar(100) NOT NULL,    ProvinceId int,    PRIMARY KEY (CityId),    FOREIGN KEY (ProvinceId) REFERENCES ProvinceMaster(ProvinceId))";
  con.query(sql, function (err, result) {
    if (err) {
      return console.log("Error2 - " + err.message);
    }
    console.log("Table created");
  });
});