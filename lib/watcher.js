'use strict';

var broccoli = require('broccoli'),
    Watcher  = require('broccoli-sane-watcher'),
    fs       = require('fs'),
    rimraf   = require('rimraf');

var config = require('../config');

// -----------------------------------------------------------------------------

var tree    = broccoli.loadBrocfile(),
    builder = new broccoli.Builder(tree),
    watcher = new Watcher(builder);

function exit() {
    process.exit(1);
}

function cleanup() {
    rmBuildDir();
    builder.cleanup();
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

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
process.on('exit', cleanup);

module.exports = watcher;
