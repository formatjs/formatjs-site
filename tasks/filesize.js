'use strict';

var path  = require('path'),
    utils = require('../lib/utils'),
    zlib  = require('zlib');

var gzip = utils.promisify(zlib.gzip);

function getLength(compressed) {
    return compressed.length;
}

module.exports = function (grunt) {
    grunt.registerMultiTask('filesize', 'Calculates the size of gzipped files', function () {
        var done = this.async();

        Promise.all(this.files.map(function(file) {
            var src = file.src.filter(function(filepath) {
                return grunt.file.exists(path.join(file.cwd, filepath));
            });

            var sizes = Promise.all(src.map(function(filepath) {
                filepath = path.join(file.cwd, filepath);
                return gzip(grunt.file.read(filepath)).then(getLength);
            }));

            return sizes.then(function (values) {
                var result = {};

                values.forEach(function (value, i) {
                    result[src[i]] = {
                        bytes: value,
                        kbs: Math.round(value * 10 / 1024) / 10
                    };
                });

                // Write joined contents to destination filepath.
                grunt.file.write(file.dest, JSON.stringify(result, null, 4));
                // Print a success message.
                grunt.log.writeln('File "' + file.dest + '" created.');

                return result;
            });
        })).then(function () {
            done();
        }, done);
    });
};
