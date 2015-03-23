/*global describe, it*/
if (!global.Promise) {
    global.Promise = require('promise');
}

var messages       = require('../../lib/messages');
var chai           = require('chai');
var chaiAsPromised = require("chai-as-promised");
var fs             = require('fs');
var path           = require('path');
var expect         = chai.use(chaiAsPromised).expect;

describe('Messages', function () {
    describe('getMessages', function () {
        it('returns an object with one key for each language in /i18n', function () {
            var languages = fs.readdirSync('./i18n')
                .filter(function (filename) {
                    return path.extname(filename) === '.yaml';
                })
                .map(function (filename) {
                    return path.basename(filename, '.yaml');
                });
            return expect(messages())
                .to.eventually.have.keys(languages);
        });
    });
});
