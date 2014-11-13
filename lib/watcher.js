'use strict';

var broccoli = require('broccoli');
var Watcher  = require('broccoli-sane-watcher');
var fs       = require('fs');
var rimraf   = require('rimraf');

var config = require('../config');

// -----------------------------------------------------------------------------

var tree    = broccoli.loadBrocfile();
var builder = new broccoli.Builder(tree);
var watcher = new Watcher(builder);

function cleanup() {
    rmBuildDir();
    builder.cleanup().then(function () {
        process.exit(1);
    });
}

function rmBuildDir() {
    rimraf.sync(config.dirs.build);
}

function mkBuildDir(dir) {
    fs.symlinkSync(dir, config.dirs.build, 'dir');
}

function onBuildSuccess(results) {
    rmBuildDir();
    mkBuildDir(results.directory);
    console.log('BUILT - %d ms', Math.floor(results.totalTime / 1e6));
}

function onbuildError(err) {
    console.log('\x07BUILD ERROR:');
    console.log(err.stack);
    console.log('');
}

watcher.on('change', onBuildSuccess);
watcher.on('error', onbuildError);

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

module.exports = watcher;
