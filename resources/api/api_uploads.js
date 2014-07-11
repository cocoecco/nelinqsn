//System Cross-Platform API Router

var http = require("http");
var url = require('url');
var api_auth = require('./api_auth');


function incomingUpload(req, res) {
    var body = '';
    req.setEncoding('utf8');
    
    req.on('data', function (chunk) {
        body += chunk;
    })
    
    
    req.on('end', function () {
    try {
      var data = JSON.parse(body);
    } catch (er) {
      // uh oh!  bad json!
      res.statusCode = 400;
      res.end('error: ' + er.message);
    }

    for (var key in data) {
        console.log('keys : ' + key);
    }
    res.write('save completed');      //(JSON.stringify(data));
    res.end();
  })
  
}

exports.incomingUpload = incomingUpload;