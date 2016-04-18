gaze-cli
========

[![NPM](https://nodei.co/npm/gaze-cli.png?compact=true)](https://nodei.co/npm/gaze-cli/)

[![Dependency Status](https://david-dm.org/paulrayes/gaze-cli.svg)](https://david-dm.org/paulrayes/gaze-cli/)

CLI wrapper for the gaze file watcher. Watches files for changes, including renamed or new files, and runs a command. Can pass the filename into the command to prevent unnecessary work.

Install
-------

	npm install --save gaze-cli

Can also be installed globally.

Usage
-----

Run `gaze` from your command line with a command and pattern.

See package.json for this module for an example of using gaze with npm scripts.

Run `gaze --help` for a full list of options.

    $ gaze --help
    Usage: gaze <command> <pattern> ...

    If present, the string $path, $dirname or $basename in <command> will be replaced by the full path, the directory path or the file basename to
    the file that changed.

    Options:
      --version        Show version number
      --help           Print this help message
      --silent         Do not print messages
      --ignore-rename  Ignore when a file is renamed

    Examples:
      gaze "jshint \$path" "lib/**/*.js"    Runs jshint when a js file in the lib folder changes
      gaze "jshint \$path" "**/*.js" "!node_modules/**/*"    Runs jshint when any js file that is not in node_modules changes

Tips
----

Internally Gaze tries to use native OS events. This will only work if the number of files you are watching is less than the number of open file descriptors for your OS, otherwise it will attempt to use stat polling which often fails. You can check what this limit is with `ulimit -n`, if it's low you should increase it. If you get a `RangeError` or `EMFILE` error, this is probably the cause.

Versions
--------

- 0.2.0: Add support for multiple patterns and message showing watched file count
- 0.1.0: Initial release

License
-------

Copyright (c) 2015 Paul Rayes

Licensed under the MIT license

Contributing
------------

Bug reports and pull requests are welcome. Code should follow the existing style and pass lint.

To run lint: `npm run lint` or `npm run watch`.
