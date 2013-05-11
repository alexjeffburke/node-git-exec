/*
 * git-exec - test script
 *
 * Copyright (c) 2013 Alex J Burke
 * Licensed under the MIT license.
 */

// imports
var fs = require('fs');

// local imports
var Git = require('../lib/git-exec');
var rimraf = require('rimraf');

// constants
var TEST_REPO = 'test_repo';

// node <0.8 compat
var exists = fs.exists || require('path').exists;

module.exports = exports = {
  tearDown: function (callback) {
    rimraf(TEST_REPO, function() {
      callback();
    });
  }
};

function checkRepoObject(test, repo) {
  exists(TEST_REPO, function(doesExist) {
    test.ok(doesExist, 'test repository was created');
    test.ok(repo, 'repository object created');
    test.ok(repo instanceof Git, 'repository object has correct type');
  });
}

exports.testClone = function(test) {
  var self = this;

  Git.clone('.', TEST_REPO, function(repo) {
    checkRepoObject(test, repo);
    test.done();
  });
};

exports.testInit = function(test) {
  var self = this;

  Git.init(TEST_REPO, null, function(repo) {
    checkRepoObject(test, repo);
    test.done();
  });
};