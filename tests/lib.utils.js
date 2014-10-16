/*global describe, it*/
var fs             = require('fs');
var path           = require('path');
var utils          = require('../lib/utils');
var chai           = require('chai');
var chaiAsPromised = require("chai-as-promised");
var expect         = chai.use(chaiAsPromised).expect;

describe('Utils', function () {
    describe('error()', function () {
        it('constructs an error object', function () {
            expect(utils.error(400))
                .to.be.instanceof(Error)
                .and.to.have.property('status')
                    .that.equals(400);
        });
    });
    describe('requireDir', function () {
        it('returns an object with a key for each module', function () {
            var files = fs.readdirSync('./lib')
                .filter(function (file) {
                    return file !== 'index.js' && path.extname(file) === '.js';
                })
                .map(function (file) {
                    return path.basename(file, '.js');
                });

            expect(utils.requireDir('./lib'))
                .to.be.an('object')
                .with.keys(files);
        });
    });
    describe('promisify', function () {
        it('returns a function that fulfills promises', function () {
            function delay(ms, value, callback) {
                setTimeout(function () {
                    callback(undefined, value);
                }, ms);
            }

            expect(utils.promisify(delay)).to.be.a('function');

            var fn = utils.promisify(delay);

            return expect(fn(1, true))
                .to.eventually.equal(true);
        });
    });
});
