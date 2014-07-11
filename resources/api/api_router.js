//System Cross-Platform API Router

var http = require("http");
var url = require('url');
var api_auth = require('./api_auth');
var api_uploads = require('./api_uploads');


function incomingRouteRequest(req, res, req_route) {
    //Rounting
    if (req_route === 'loguser') {
        api_auth.authenticateUser(req,res);
        console.log('routed to authentication API');
    }
    else if (req_route === 'registernewuser') {
        api_auth.registerNewUser(req,res);
        console.log('routed to authentication API');
    }
    else if (req_route === 'uploadreq') {
        api_uploads.incomingUpload(req,res);
        console.log('routed to uploads API');
    }
    
  
}

exports.incomingRouteRequest = incomingRouteRequest;