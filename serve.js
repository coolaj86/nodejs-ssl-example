#!/usr/bin/env node
'use strict';

var https = require('https');
var http = require('http');
var path = require('path');
var port = process.argv[2] || 8043;
var insecurePort = process.argv[3] || 4080;
var fs = require('fs');
var checkip = require('check-ip-address');
var server;
var insecureServer;
var options;
var certsPath = path.join(__dirname, 'certs', 'server');
var caCertsPath = path.join(__dirname, 'certs', 'ca');

//
// SSL Certificates
//
options = {
  key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem'))
  // This certificate should be a bundle containing your server certificate and any intermediates
  // cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
, cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem'))
  // ca only needs to be specified for peer-certificates
//, ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
, requestCert: false
, rejectUnauthorized: true
};


//
// Serve an Express App securely with HTTPS
//
server = https.createServer(options);
checkip.getExternalIp().then(function (ip) {
  var host = ip || 'local.helloworld3000.com';

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
