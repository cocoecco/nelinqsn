//API - Authentication

var http = require("http");
var url = require('url');
var api_conn = require('./api_conn')


function authenticateUser(req,res) {
    var queryData = url.parse(req.url, true).query; //Parse the URL Request Data Components
    
    var loginName = queryData.uname;
    var loginPass = queryData.upass;
            
    api_conn.getConnection(function(err, connection){
        if(!err){
            //Connected Esteblished - Lookup User Details
            connection.query('SELECT * FROM Users WHERE Login = ? AND Pass = ?', [loginName, loginPass] , function(err, rows) {
                if (rows.length > 0) {
                    res.write('user_found');
                    connection.end();
                    res.end();
                }
                else {
                    res.write('No users found!');
                    connection.end();
                    res.end();
                }
                
            });
            
        }
        else {
            res.write('not connected!');
            res.end();
        }
    });
    
}

exports.authenticateUser = authenticateUser;


function registerNewUser(req, res) {
    var queryData = url.parse(req.url, true).query; //Parse the URL Request Data Components
    
    var loginEmail = queryData.uemail;
    var loginPass = queryData.upass;
    var loginName = queryData.uname;
    loginName.replace("_", " ");
    
    console.log('registering ' + loginEmail + ', with Password: ' + loginPass + ' and Name: ' + loginName);
    
    api_conn.getConnection(function(err, connection){
        if(!err){
            connection.query('SELECT * FROM Users WHERE Login = ? AND Pass = ?', [loginEmail, loginPass] , function(err, rows) {
                if (!rows.length > 0) {
                    //Connected Esteblished - Adding User Details
                    var post  = {Login: loginEmail, Pass: loginPass, Name: loginName};

                    connection.query('INSERT INTO Users SET ?', post, function(err, result) {
                        if (!err) {
                            res.write('registered_new_user');
                            res.end(); 
                        }
                        else {
                            console.log(err);
                            res.write('error adding user' + err);
                            res.end(); 
                        }
                    });
                
                }
                else {
                    res.write('user_exists');
                    res.end();
                }
            });
        }
    });
    

}

exports.registerNewUser = registerNewUser;





















