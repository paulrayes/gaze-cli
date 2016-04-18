#!/usr/bin/env node

'use strict';

var path = require('path');
var yargs = require('yargs'); // Parses arguments and displays help message
var gaze = require('gaze'); // Watches for file changes
var execshell = require('exec-sh'); // Runs commands just like npm scripts
var prettyHrtime = require('pretty-hrtime'); // Format elapsed times nicely

// Define our command line arguments and help stuff
yargs
    .usage('Usage: gaze <command> <pattern> ...\n\nIf present, the string $path in <command> will be replaced by the full path to the file that changed.')
    .example('gaze "jshint \$path" "lib/**/*.js"', 'Runs jshint when a js file in the lib folder changes')
    .example('gaze "jshint \$path" "**/*.js" "!node_modules/**/*"', 'Runs jshint when a js file anywhere except in node_modules changes')
    .option('version', {
        describe: 'Show version number',
        type: 'boolean'
    })
    .option('help', {
        describe: 'Print this help message',
        type: 'boolean'
    })
    .option('silent', {
        describe: 'Do not print messages',
        type: 'boolean'
    })
    .option('ignore-rename', {
        describe: 'Ignore when a file is renamed',
        type: 'boolean'
    });

var argv = yargs.argv;

// If requested, display help or version message then quit
if (argv.help) {
    console.log(yargs.help());
    return;
}
if (argv.version) {
    console.log('v' + require('./package').version);
    return;
}

// Ensure we have the proper arguments
if (argv._.length < 2) {
    console.log('You must provide a single command and at least one pattern');
    return;
}

var command = argv._[0];
var pattern = argv._.slice(1, argv._.length);

// Start the file watcher on the pattern
gaze(pattern, function(err, watcher) {
    if (err) {
        throw err;
    }
    if (!argv.silent) {
        var fileCount = 0;
        Object.keys(watcher._watched).forEach(function(watched) {
            fileCount = fileCount + watcher._watched[watched].length;
        });
        console.log('Watching ' + fileCount + ' files/directories, pattern: ', pattern);
        if (fileCount > 10000) {
            console.log('This is a lot of files, for better performance you should reduce it.');
        }
    }
    watcher.on('changed', function(filepath) {
        run(filepath);
    });
    watcher.on('added', function(filepath) {
        run(filepath);
    });
    watcher.on('renamed', function(newPath) {
        if (!argv['ignore-rename']) {
            run(newPath);
        }
    });
});

// Function to run when something changes
function run(filepath) {
    var startTime = process.hrtime();
    var uniqueCommand = command.replace(/\$path/g, filepath)
                            .replace(/\$dirname/g, path.dirname(filepath))
                            .replace(/\$basename/g, path.basename(filepath))
    if (!argv.silent) {
        console.log('>', uniqueCommand);
    }
    execshell(uniqueCommand);
    if (!argv.silent) {
        console.log('Finished in', prettyHrtime(process.hrtime(startTime)));
    }
}
