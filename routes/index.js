'use strict';

var utils = require('../lib/utils');

exports = module.exports = utils.requireDir(__dirname);

exports.redirect = redirect;

// -----------------------------------------------------------------------------

function redirect(url, status) {
    return function (req, res) {
        res.redirect(status || 302, url);
    };
}
