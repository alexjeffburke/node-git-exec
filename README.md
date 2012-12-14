# git-exec
This library provides a very simple wrapper around the git binary.

## Getting Started
Install the module with: `npm install git-exec`

## Documentation
The majority of the interaction involves an exec() method which is
involved on a instances of the library. This method is relatively stupid in
that we do not try to parse the output or validate commands invoked.

However, we do take care to provide a means to both init / clone git
repositories and we set the working directory correctly such that
further git commands execute in the correct context.

## Examples

### Cloning a remote repository and switching to the 'dev' branch
```javascript
var Git = require('git-exec');
Git.clone(a-repo.git, 'dir', function(repo) {
  // NOTE the callback is given a reference to the git repository

  repo.exec('checkout', ['-t origin/dev'], function() {
    // ... callback to execute after branch checkout
  });
});
```

### Using a local git repository
```javascript
var Git = require('git-exec');
var repo = new Git('./path/to/repo');

repo.exec('pull', null, function(err, stdout) {
  // ... callback to execute after git pull
});
```

Or alternatively, to instantly create a repo and perform some operation:

```javascript
require('git-exec').repo('./path/to/repo').exec('branch', ['dev'], function() {
  // ... callback to execute
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## Release History
* 0.2.0 - add a new repo() method to the API
* 0.1.2 - make sure cwd argument we pass to exec is made absolute
* 0.1.1 - cleanup the code; no functional changes
* 0.1.0 - initial release

## License
Copyright (c) 2012 Alex J Burke
Licensed under the MIT license.
