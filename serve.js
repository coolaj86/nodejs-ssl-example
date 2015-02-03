#!/usr/bin/env node
'use strict';

var https = require('https')
  , http = require('http')
  , path = require('path')
  , port = process.argv[2] || 8043
  , insecurePort = process.argv[3] || 4080
  , fs = require('fs')
  , path = require('path')
  , checkip = require('check-ip-address')
  , server
  , insecureServer
  , options
  , certsPath = path.join(__dirname, 'certs', 'server')
  , caCertsPath = path.join(__dirname, 'certs', 'ca')
  ;


//
// SSL Certificates
//
options = {
  key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem'))
, ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
, cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem'))
, requestCert: false
, rejectUnauthorized: false
};


//
// Serve an Express App securely with HTTPS
//
server = https.createServer(options);
checkip.getExternalIp().then(function (ip) {
  var host = ip || 'local.helloworld3000.com'
    ;

  function listen(app) {
    server.on('request', app);
    server.listen(port, function () {
      port = server.address().port;
      console.log('Listening on https://127.0.0.1:' + port);
      console.log('Listening on https://local.helloworld3000.com:' + port);
      if (ip) {
        console.log('Listening on https://' + ip + ':' + port);
      }
    });
  }

  var publicDir = path.join(__dirname, 'public');
  var app = require('./app').create(server, host, port, publicDir);
  listen(app);
});


//
// Redirect HTTP ot HTTPS
//
// This simply redirects from the current insecure location to the encrypted location
//
insecureServer = http.createServer();
insecureServer.on('request', function (req, res) {
  // TODO also redirect websocket upgrades
  res.setHeader(
    'Location'
  , 'https://' + req.headers.host.replace(/:\d+/, ':' + port) + req.url
  );
  res.statusCode = 302;
  res.end();
});
insecureServer.listen(insecurePort, function(){
  console.log("\nRedirecting all http traffic to https\n");
});
