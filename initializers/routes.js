var path = require('path');
var fs = require('fs');
var file = require('file');
var express = require('express');
var Q = require('q');

module.exports = function(app) {
  var root = process.cwd();

  file.walkSync(path.join(root, "controllers"), function(dirPath, dirs, files) {
    var mount = dirPath.replace(path.join(root, "controllers"), "") + "/";
    var router = express.Router();

    if (files === 0) return false;

    files.forEach(function(file) {
      require(path.join(dirPath, file))(router, app);
    });

    app.use(mount, router);
  });
}

