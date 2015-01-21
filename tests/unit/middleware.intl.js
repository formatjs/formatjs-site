/*global describe, it*/
var express  = require('express');
var request  = require('supertest');
var expstate = require('express-state');
var expect   = require('chai').expect;
var intl     = require('../../middleware/intl');

var app = express();
expstate.extend(app);
app.use(intl);

app.get('/', function (req, res) {
    res.end(JSON.stringify({
        intl: res.intl,
        locals: res.locals
    }));
});

describe('Intl middleware', function () {
    it('exposes an intl object', function (done) {
        request(app).get('/')
            .expect(200)
            .expect(function (res) {
                var data = JSON.parse(res.text.trim());

                expect(data).to.have.property('intl')
                    .that.is.an('object')
                        .with.ownProperty('locales')
                        .and.with.ownProperty('messages');
                expect(data.intl.locales).to.be.an('array');
                expect(data.locals).to.have.property('data')
                    .that.is.an('object')
                        .with.property('intl');
            })
            .end(done);
    });
});
