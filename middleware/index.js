'use strict';

var utils = require('../lib/utils');

exports = module.exports = utils.requireDir(__dirname);

exports.compress     = require('compression');
exports.errorHandler = require('errorhandler');
exports.favicon      = require('serve-favicon');
exports.logger       = require('morgan');
exports.slash        = require('express-slash');
exports.static       = require('serve-static');
