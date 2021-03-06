var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

require(path.join(__dirname, 'initializers', 'middleware.js'))(app);
require(path.join(__dirname, 'initializers', 'routes.js'))(app);
require(path.join(__dirname, 'initializers', 'errorhandling.js'))(app);

module.exports = app;
