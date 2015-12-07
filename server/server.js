var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

console.log(__dirname);
var app = express();
var env = process.env.NODE_ENV || 'development';

var config = require('./config/config')[env];

require('./config/express')(app, config);

require('./config/mongoose')(config);

require('./config/routes')(app, config);

app.listen(config.port);
console.log('express listening on port ' + config.port);
