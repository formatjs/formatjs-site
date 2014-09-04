'use strict';

var sizes = require('../config/sizes.json');

module.exports = function (filename) {
    var entry = sizes[filename];

    if (!entry) {
        throw new Error('No size info for: ' + filename);
    }

    if (entry.bytes < 1024) {
        return entry.bytes + ' bytes';
    }

    return entry.kbs + ' KB';
};
