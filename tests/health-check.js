// This file checks that we get a HTTP 200 status code and the appropriate
// content type for all the routes defined in the app.

'use strict';

/*global describe, it */

var path    = require('path');
var request = require('supertest');
var utils   = require('../lib/utils');
var app     = require('../app');
var routes  = utils.requireDir(path.join(__dirname, '../routes/'));

var host;

switch (process.env.JOB_TYPE) {
    case 'health-check-dev':
        host = 'http://js-intl-docs.trunk.development.manhattan.gq1.yahoo.com';
        break;
    case 'staging':
        host = 'http://js-intl-docs.smoke.test.manhattan.gq1.yahoo.com';
        break;
    case 'health-check-bf1':
        host = 'http://js-intl-docs.v1.production.manhattan.bf1.yahoo.com';
        break;
    case 'health-check-gq1':
        host = 'http://js-intl-docs.v1.production.manhattan.gq1.yahoo.com';
        break;
    default:
        host = 'http://localhost:5000';
}

console.log('Testing host: ' + host);

request = request(host);

describe('Functional tests', function () {
    Object.keys(routes)
        .map(app.getPathTo)
        .forEach(function (routePath) {
            it('correctly responds on the ' + routePath + ' route', function (done) {
                request.get(routePath)
                    .expect(200)
                    .expect('Content-Type', 'text/html; charset=utf-8')
                    .end(done);
            });
        });
});
