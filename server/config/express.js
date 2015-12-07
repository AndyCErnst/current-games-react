var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session');
  passport = require('passport'),
  errorHandler = require('errorhandler'),
  path = require('path');

module.exports = function(app, config){

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({secret: 'Rainbow Dash is best pony',resave:false,saveUninitialized:false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));

  // app.set('views', path.join(config.rootPath+'dist/'));
  // app.set('view engine', 'ejs');
}
