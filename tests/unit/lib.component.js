/*global describe, it*/
var components = require('../../lib/component');
var expect     = require('chai').expect;

if (!global.React) {
    global.React = require('react');
}

describe('Component', function () {
    describe('require()', function () {
        it('returns an object', function () {
            expect(components.require('code-block'))
                .to.be.a('function');
        });
    });
});
