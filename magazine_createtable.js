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
  var sql = "CREATE TABLE magazinemaster (Id int NOT NULL AUTO_INCREMENT, MagazineName varchar(100) NOT NULL,ImagePath varchar(500) not null,PdfPath varchar(500) not null,Year varchar(10) not null,Month Varchar(20),CreateDate datetime not null,PRIMARY KEY (Id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});