import express from 'express'
const app = express();
var http = require('http').createServer(app);
var parseurl = require('parseurl')
const session = require('express-session');
import bodyParser from 'body-parser';
import 'dotenv/config';
var path = require('path');
app.set('view engine','ejs');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var Users = [];
var SessionData;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kruti.patel31@gmail.com',
    pass: 'Kruthard'  //tera username password barobar daal ok//ruk
  }
});
var mailOptions = {
  from: 'kruti.patel31@gmail.com',
  to: 'kpatel10@confederationc.on.ca',
  subject: 'Sending test Email',
  text: 'Hello'
};
//app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
//var sess;
app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use( express.static( "public" ) );

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'GiveMakeADifference',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 }
}));

app.get("/CheckSession", (req,res) =>{
  console.log(SessionData);
  if(SessionData != undefined){
    res.send("success");
  }
  else{
    res.send("failed");
  }
});

function checkSignIn(req, res,next){
  if(req.session.user){
     next();     //If session exists, proceed to page
  } else {
     var err = new Error("Not logged in!");
     console.log(req.session.user);
     next(err);  //Error, trying to access unauthorized page!
  }
}
app.get('/', async (req, res) => {
  res.render('index');
});
app.get('/index', (req, res,next) => {
    res.render('index');
});

/////////////////////////////////SIGN UP PAGE CODE START
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/UserRegistration',(req,res) => {
    console.log("body = " + req.param('name')); 
    var Name = req.param('name');
    var EmailId = req.param('email');
    var Dob = req.param('dob');
    var Address1 = req.param('address1');
    var Address2 = req.param('address2');
    var CityId = req.param('city');
    var ProvinceId = req.param('province');
    var PostalCode = req.param('postalCode');
    var Password = req.param('password');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kruti@31dec',
        port: '3306',
        database: 'givemakeadifference'
      });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO users (Name,EmailId,Dob,Photo,Password,Address1,Address2,CityId,ProvinceId,PostalCode,IsActive,LastLoginDate,CreatedDate,UpdatedDate) VALUES('"+Name+"','"+EmailId+"','"+Dob+"',NULL,'"+Password+"','"+Address1+"','"+Address2+"',"+CityId+","+ProvinceId+",'"+PostalCode+"',1,NULL,CURDATE(),NULL)";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
res.send("connected");
});

app.get('/GetProvince',(req,res) => {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kruti@31dec',
        port: '3306',
        database: 'givemakeadifference'
      });

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM ProvinceMaster", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/CheckIfEmailIdExists',(req,res) => {
    console.log('Emailexist called ');
    var EmailId = req.param('EmailId');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kruti@31dec',
        port: '3306',
        database: 'givemakeadifference'
      });

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users WHERE EmailId = '" + EmailId + "'" , function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});


app.get('/GetCity',(req,res) => {
    var provinceId = req.param('ProvinceId');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kruti@31dec',
        port: '3306',
        database: 'givemakeadifference'
      });

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM CityMaster WHERE ProvinceId = " + provinceId , function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});
/////////////////////////////////SIGN UP PAGE CODE END

/////////////////////////////////LOGIN PAGE CODE START
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/LoginUsers',(req,res) => {
  SessionData = req.session;
  SessionData.user = {};
    var UserName = req.param('UserName');
    var Password = req.param('Password');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kruti@31dec',
        port: '3306',
        database: 'givemakeadifference'
      });

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users WHERE EmailId = '" + UserName + "' AND Password = '" + Password + "'", function (err, result, fields) {
      if (err) throw err;
      //console.log("Result = " + JSON.parse(result));
      // console.log("Result = " + JSON.stringify(result[0]["EmailId"]));
      var stringyfyResult = JSON.stringify(result[0]);
      var parseResult = JSON.parse(stringyfyResult);
      if(result.length > 0){
        SessionData.user.EmailId = parseResult.EmailId
        SessionData.user.Name = parseResult.Name;
        SessionData.user.MobileNo = parseResult.MobileNo;
        SessionData.user.UserId = parseResult.Id;
      }
      res.send(result);
    });
  });
});

/////////////////////////////////LOGIN PAGE CODE END

/////////////////////////////////LOGIN PAGE CODE START
app.get('/connectus', (req, res) => {
    res.render('connectus');
});
app.get('/ConnectUsNow',(req,res) => {
    var Name = req.param('name');
    var EmailId = req.param('emailId');
    var MobileNo = req.param('mobileNo');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kruti@31dec',
        port: '3306',
        database: 'givemakeadifference'
      });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO contactus (Name,EmailId,MobileNo) VALUES('"+Name+"','"+EmailId+"','"+MobileNo+"')";
        console.log(sql);
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");

          mailOptions.subject = "Connecting to our other donor";
          mailOptions.text = "Hello, Please join the group by clicking on this link https://www.facebook.com/";
          mailOptions.to = EmailId;
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.send('failed');
            } else {
              console.log('Email sent: ' + info.response);
              res.send('success');
            }
          });
      });
});
res.send("success");
});
/////////////////////////////////LOGIN PAGE CODE END

/////////////////////////////////PAYMENT PAGE CODE END


function UpdateAmountForOrganisation(Id,Amount){
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kruti@31dec',
    port: '3306',
    database: 'givemakeadifference'
  });
  con.connect(function(err) {
    if (err) throw err;
    var sql = "Update organisationmaster SET TotalDonationRecieved = " + Amount + " Where Id = " + Id;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}

function GetMinimumAmountOrganisationId(){
  var oId = 1;
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kruti@31dec',
    port: '3306',
    database: 'givemakeadifference'
  });
  con.connect(function(err) {
    if (err) throw err;
    var sql = "Select Id from organisationmaster order by TotalDonationRecieved limit 1";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;

      var stringyfyResult = JSON.stringify(result[0]);
      var parseResult = JSON.parse(stringyfyResult);
      console.log(parseResult.Id);
      oId = parseResult.Id;
    });
  });
  return oId;
}

app.get('/payment',(req,res) => {
    res.render('payment');
});

app.get('/DonateNow',(req,res) => {
  
  if(SessionData != undefined){
    console.log(SessionData.user);
    var UserId = SessionData.user.UserId
    var Amount = req.param('Amount');
    var OrganisationId = GetMinimumAmountOrganisationId();
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Kruti@31dec',
        port: '3306',
        database: 'givemakeadifference'
      });
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO donororganisationmaster (Amount,DonationDate,DonorId,OrganisationId) VALUES('"+Amount+"',CURDATE(),"+ UserId +"," + OrganisationId + ")";
        console.log(sql);
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          UpdateAmountForOrganisation(Amount,OrganisationId);
      });
      });
    res.send("success");
  }
  else{
    res.send("failed")
  }
});


///////////////////////////////////////////////TESTIMONIALS PAGE START
app.get('/testimonials', async (req, res) => {
  //console.log(req.session);
  // sess = req.session;
  //console.log(req.session.email);
  res.render('testimonials');
});

app.get('/EnablePickup',(req,res) => {

  var PickupDate = req.param('PickupDate');
  var PickupTime = req.param('PickupTime');
  var IsEnable = req.param('IsEnable');

  mailOptions.subject = "Information about the pickup services";
  mailOptions.text = "Hello, We will be coming to your place at " + PickupDate + " between " + PickupTime;

  console.log(IsEnable);
  if(IsEnable == "1"){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send('failed')
      } else {
        console.log('Email sent: ' + info.response);
        res.send('success');
      }
    });
  }
});


////////////////////////////////DONATE START

app.get('/donate',(req,res) => {
  res.render('donate');
})

app.get('/about',(req,res) => {
  res.render('about');
})

////////////////////////////////PCIKUP START

app.get('/pickup',(req,res) => {
  res.render('pickup');
})


////////////////////////////////TOKEN PAGE START

app.get('/tokenpage',(req,res) => {
  res.render('tokenpage');
})



////////////////////////////////TOKEN PAGE START

app.get('/contactus',(req,res) => {
  res.render('contactus');
})

app.get('/ContactWithUs',(req,res) => {
  var Name = req.param('name');
  var EmailId = req.param('emailId');
  var Message = req.param('message');
  var Subject = req.param('subject');
  var con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Kruti@31dec',
      port: '3306',
      database: 'givemakeadifference'
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO contactwithus (Name,EmailId,Message,Subject) VALUES('"+Name+"','"+EmailId+"','"+Message + "','"+ Subject + "')";
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        
        mailOptions.subject = "Get in touch";
        mailOptions.text = "Hello, We got ur message. We will answer your queries and concern as soon as possible.";
        mailOptions.to = EmailId;
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.send('failed');
          } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
          }
        });
    });
});
res.send("success");
});



app.get('/magazine',(req,res) => {
  res.render('magazine');
})

app.get('/FetchMagazineList',(req,res) => {
  var Year = req.param('year');
  var Month  =  req.param('month');
  var con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Kruti@31dec',
      port: '3306',
      database: 'givemakeadifference'
    });

con.connect(function(err) {
  if (err) throw err;
  con.query("select * from magazinemaster where Year = '"+Year+"' and Month = '"+Month+"'", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
});


http.listen(process.env.PORT, () => console.log(`Api is listening on port ${process.env.PORT}!`));