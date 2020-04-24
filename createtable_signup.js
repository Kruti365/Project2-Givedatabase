var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3307',
  database: 'givemakeadifference'
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "Drop table orders";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE Users ( Id bigint NOT NULL AUTO_INCREMENT, Name varchar(100) NOT NULL,  EmailId varchar(50) not null, Dob varchar(20) not null,    Photo varchar(500),    Password varchar(50) not null,    Address1 varchar(500),    Address2 varchar(500),    CityId Int,    ProvinceId Int,    PostalCode varchar(20),    IsActive bit,    LastLoginDate datetime,    CreatedDate datetime,    UpdatedDate datetime,    PRIMARY KEY (Id),    FOREIGN KEY (CityId) REFERENCES CityMaster(CityId) ,   FOREIGN KEY (ProvinceId) REFERENCES ProvinceMaster(ProvinceId))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});