/*
 * git-exec
 * https://github.com/alexjeffburke/node-git-exec
 *
 * Copyright (c) 2012 Alex J Burke
 * Licensed under the MIT license.
 */

// imports
var exec = require('child_process').exec;
var path = require('path');

var Git = module.exports = function(directory) {
  this.directory = directory || null;
};

function call_git(cwd, command, args, callback) {
  args = args || [];
  var cmd = 'git ' + command + ' ' + args.join(' ');

  // lean on node to determine an absolute path for the cwd were were given
  if (cwd) {
    cwd = path.resolve(cwd);
  }

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
      ret = new Git();
      if (where) {
        ret.directory = where;
      }
    }

    callback(ret);
  });
}

Git.clone = function(repo, dir, callback) {
  git_class_exec('clone', repo, dir, callback);
};

Git.init = function(repo, dir, callback) {
  var git_arg;

  /*
   * In order to have a consistent API we also allow the second argument
   * passed to be a full path to the repo and the first arg be empty.
   */
  git_arg = dir || repo;

  /*
   * Where passed both a dir and a repo the intention is to create a repo
   * at a specified path. We attempt to present a consistent API for this
   * but in git terms we pass ONE argument - the full path to the repo.
   *
   * Treat dir as the /path/to component of /path/to/repo and thus as such
   * prepend the repo name with dir before we pass it for execution.
   *
   * NOTE this only occurs when _both_ repo and dir are passed.
   */
  if (dir && repo) {
    git_arg = path.join(dir, repo);
  }

  git_class_exec('init', git_arg, null, callback);
};

Git.repo = function(dir) {
  return new Git(dir);
};

Git.prototype.exec = function(command, args, callback) {
  call_git(this.directory, command, args, callback);
};
