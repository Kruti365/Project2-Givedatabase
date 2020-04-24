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
  var sql = "CREATE TABLE OrganisationMaster (Id int NOT NULL AUTO_INCREMENT,Name varchar(100) NOT NULL,TotalDonationRecieved bigint null,AboutUs varchar(500) null,Logo varchar(500) null,CreatedDate datetime not null,UpdatedDate datetime null,IsActive bit, PRIMARY KEY (Id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});