'use strict';

var fs      = require('pfs'),
    path    = require('path'),
    Promise = require('ypromise'),
    utils   = require('./utils'),
    nodeify = require('nodeify'),
    zlib    = require('zlib');

var readFile = utils.promisify(fs.readFile),
    gzip     = utils.promisify(zlib.gzip);

module.exports = function fileSizes(filePaths, callback) {
    var sizes = toArray(filePaths).map(function (filePath) {
        return readFile(filePath, 'utf8').then(gzip).then(getLength);
    });
    nodeify(Promise.all(sizes), callback);
};

function toArray(arr) {
    return Array.isArray(arr) ? arr : [arr];
}

function getLength(compressed) {
    return compressed.length;
}
