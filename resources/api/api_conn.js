//MySQL Connection Pool

var mysql = require('mysql');


var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    database : process.env.OPENSHIFT_GEAR_NAME,
    port     : '3306',
});

exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};



 