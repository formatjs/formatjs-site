/*global describe, it*/
if (!global.Promise) {
    global.Promise = require('promise');
}

var examples       = require('../../lib/examples');
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
        it('gets all the Dust examples', function () {
            return expect(examples.get('dust'))
                .to.eventually.be.an('array');
        });
        it('gets all the Handlebars examples', function () {
            return expect(examples.get('handlebars'))
                .to.eventually.be.an('array');
        });
        it('throws for unknown example types', function () {
            return expect(examples.get('unknown template engine'))
                .to.eventually.be.rejected;
        });
        it('gets all the React examples', function () {
            return expect(examples.get('react', { cache: true }))
                .to.eventually.be.an('array');
        });
        it('gets all the cached React examplex', function () {
            return expect(examples.get('react', { cache: true }))
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
            expect(function () {
                examples.render([], 'hello');
            }).to.throw();
        });
    });
});
