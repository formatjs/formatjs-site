'use strict';

var fs   = require('fs'),
    glob = require('glob'),
    path = require('path'),
    yaml = require('js-yaml');

var config = require('../config'),
    utils  = require('./utils');

module.exports = getMessages;

// -----------------------------------------------------------------------------

glob = utils.promisify(glob);

var readFile = utils.promisify(fs.readFile);

var cache = null;

function getMessages(options) {
    options || (options = {});

    var messages = options.cache && cache;
    if (messages) { return messages; }

    messages = cache = glob('*.yaml', {cwd: config.dirs.i18n})
        .then(processMessageFiles)
        .then(hashMessagesByLocale);

    return messages.catch(function (err) {
        cache = null;
        throw err;
    });
}

function processMessageFiles(entries) {
    return Promise.all(entries.map(function (entry) {
        var messagesFile = path.join(config.dirs.i18n, entry);

        return readFile(messagesFile, 'utf8').then(function (contents) {
            return {
                locale  : path.basename(entry, '.yaml'),
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
