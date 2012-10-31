/*
 * git-exec
 * https://github.com/alexjeffburke/node-git-exec
 *
 * Copyright (c) 2012 Alex J Burke
 * Licensed under the MIT license.
 */

// imports
var exec = require('child_process').exec;

module.exports = function(directory) {
  this.directory = directory || null;
};

(function() {
  function call_git(cwd, command, args, callback) {
    args = args || [];
    var cmd = 'git ' + command + ' ' + args.join(' ');
    var opts = { cwd: cwd };

    exec(cmd, opts, function (err, stdout, stderr) {
      callback(err, stdout);
    });
  }

  function git_class_exec(command, repo, where, callback) {
    var args = [repo];
    if (where) {
      args.push(where);
    }

    call_git(null, command, args, function(err, stdout, stderr) {
      var ret = null;

      if (!err) {
        ret = new module.exports();
        if (where) {
          ret.directory = where;
        }
      }

      callback(ret);
    });
  }

  module.exports.clone = function(repo, dir, callback) {
    git_class_exec('clone', repo, dir, callback);
  };

  module.exports.init = function(repo, dir, callback) {
    git_class_exec('init', repo, dir, callback);
  };

  module.exports.prototype.exec = function(command, args, callback) {
    call_git(this.directory, command, args, callback);
  };
})();
