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
    var sql = "INSERT INTO ProvinceMaster (ProvinceName) VALUES('RAJASTHAN')";
    con.query(sql, function (err, result) {
      if (err) {
        return console.log("Error2 - " + err.message);
      }
      console.log("Rows Inserted");
    });
  });


// con.connect(function(err) {
//   if (err) {
//     return console.log("Error1; - " + err.message);
//   }
//   console.log("Connected!");
//   var sql = "INSERT INTO CityMaster (CityName,ProvinceId) VALUES('Rajasthan',1)";
//   con.query(sql, function (err, result) {
//     if (err) {
//       return console.log("Error2 - " + err.message);
//     }
//     console.log("Rows Inserted");
//   });
// });