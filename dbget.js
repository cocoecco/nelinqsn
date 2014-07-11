var http = require("http");
var mysql = require('mysql');

var connection =  mysql.createConnection({
  host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
  user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
  password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
  database : process.env.OPENSHIFT_GEAR_NAME,
  port     : '3306',
});


function returnData(request, response) {
    
    connection.connect();
    var myQuery = 'SELECT GROUP_CONCAT(Login, Pass) FROM Users';
    connection.query(myQuery, function(err,rows) {
        if (err) {
              response.write(err + ' ');
              connection.end();
              response.end();
        }
        else {
              response.write(JSON.stringify(rows));
              connection.end();
              response.end();
        }
    });
}

exports.returnData = returnData;