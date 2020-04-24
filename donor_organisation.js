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
  var sql = "CREATE TABLE DonorOrganisationMaster (Id bigint NOT NULL AUTO_INCREMENT,DonorId bigint NULL,OrganisationId Int null,Amount int null,DonationDate datetime null, PRIMARY KEY (Id), FOREIGN KEY (OrganisationId) REFERENCES organisationmaster(Id),FOREIGN KEY (DonorId) REFERENCES users(Id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});