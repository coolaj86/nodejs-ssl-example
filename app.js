'use strict';

var express = require('express')
  ;

module.exports.create = function (server, host, port, publicDir) {
  var app = express()
    ;

  app.use(express.static(publicDir));

  return app;
};
