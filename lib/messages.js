'use strict';

var fs   = require('fs'),
    path = require('path'),
    yaml = require('js-yaml');

var config = require('../config'),
    utils  = require('./utils');

module.exports = getMessages;

// -----------------------------------------------------------------------------

var readFile = utils.promisify(fs.readFile);

var cache = null;

function getMessages(options) {
    options || (options = {});

    var messages = options.cache && cache;
    if (messages) { return messages; }

    messages = cache = processMessageFiles(config.availableLocales)
        .then(hashMessagesByLocale);

    return messages.catch(function (err) {
        cache = null;
        throw err;
    });
}

function processMessageFiles(locales) {
    return Promise.all(locales.map(function (locale) {
        var messagesFile = path.join(config.dirs.i18n, locale) + '.yaml';
        return readFile(messagesFile, 'utf8').then(function (contents) {
            return {
                locale  : locale,
                messages: yaml.safeLoad(contents)
            };
        });
    }));
}

function hashMessagesByLocale(entries) {
    return entries.reduce(function (hash, entry) {
        hash[entry.locale] = entry.messages;
        return hash;
    }, {});
}
