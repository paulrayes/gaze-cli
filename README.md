gaze-cli
========

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

    If present, the string $path in <command> will be replaced by the full path to
    the file that changed.

    Options:
      --version        Show version number
      --help           Print this help message
      --silent         Do not print messages
      --ignore-rename  Ignore when a file is renamed

    Examples:
      gaze "jshint \$path" "lib/**/*.js"    Runs jshint when a js file in the lib folder changes

License
-------

MIT
