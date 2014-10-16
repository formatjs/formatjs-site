/*global describe, it*/
if (!global.Promise) {
    global.Promise = require('ypromise');
}

var examples       = require('../lib/examples');
var chai           = require('chai');
var chaiAsPromised = require("chai-as-promised");
var expect         = chai.use(chaiAsPromised).expect;

describe('Examples', function () {
    describe('get()', function () {
        it('throws when no type is provided', function () {
            expect(function () {
                return examples.get();
            }).to.throw();
        });
        it('gets all the React examples', function () {
            return expect(examples.get('react'))
                .to.eventually.be.an('array');
        });
    });
    describe('render', function () {
        it('throws when no examples are provided', function () {
            expect(function () {
                return examples.render();
            }).to.throw();
        });
        it('throws when no intl object is provided', function () {
            expect(function () {
                examples.render([]);
            }).to.throw();
        });
        it('renders stuff', function () {
            return expect(Promise.resolve(true)).to.eventually.equal(false);
        });
    });
});
