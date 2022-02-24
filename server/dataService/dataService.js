const express = require('express')
var router = express.Router();

const oracledb=require('../node_modules/oracledb');

const connectionProperties = {
    user: 'SHIVAM',
    password: '123',
    connectString: 'localhost:1521/xe'
}

router.use(function (request, response, next) {
  console.log("REQUEST:" + request.method + "   " + request.url);
  console.log("BODY:" + JSON.stringify(request.body));
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//Takes in user-info in form, pass it to oracleDB, POST method
router.route('/signup/').post(function (request, response) {
    console.log("POST USER:");
    oracledb.getConnection(connectionProperties, function (err, connection) {
      if (err) {
        console.error(err.message);
        response.status(500).send("Error connecting to DB");
        return;
      }
      var body = request.body;
      connection.execute("INSERT INTO DATA (fname,lname,dob,gender,email,password,phno,adhar)" +
        "VALUES(:fname, :lname,:dob,:gender,:email,:password,:phno,:adhar)",
        [body.fname,body.lname,body.dob,body.gender,body.email,body.password, body.phno,body.adhar],
        function (err, result) {
          if (err) {
            console.error(err.message);
            response.status(500).send("Error saving employee to DB");
            doRelease(connection);
            return;
          }
          connection.execute("commit")
          response.status(200).send("User added.");
          doRelease(connection);
        });
    });
  });

//For Login part

router.route('/login').post(function (request, response) {
  console.log("POST login:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }
    var body = request.body;
    console.log(body.email);
    console.log(body.password);
    console.log("After connection");    
    connection.execute("SELECT * FROM data WHERE email=:email ", 
      [body.email],
      { outFormat: oracledb.OBJECT },
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error getting data from DB");
          doRelease(connection);
          return;
        }
        // console.log("RESULTSET:" + JSON.stringify(result));
        //console.log("User Password:"+body.password )
        var rowsProcessed = result.rows.length;

        console.log("Fetched rows:" + rowsProcessed)
        console.log("Fetched row data:" + JSON.stringify(result.rows[0]))

        if (rowsProcessed > 0) {
          var element = result.rows[0]
          var user = {
            fname: element.FNAME, lname: element.LNAME,
            email: element.EMAIL, password: element.PASSWORD,
            dob:element.DOB
          };

        }
        // logic for auth
        console.log(user.password);
        if (rowsProcessed == 0) {
          response.status(400).send("User not found !")
        }
        else if (user.password == body.password) {
          user.password = "";
          response.status(200).send(user)
        }
        else {
          response.status(400).send("Wrong user credentials ! ")
        }
        doRelease(connection);
      });
  });
});

function doRelease(connection){
  connection.release(function (err){
    if(err){
      console.error(err.message);
    }
  })
}


module.exports = router