// This file checks that we get a HTTP 200 status code and the appropriate
// content type for all the routes defined in the app.

'use strict';

/*global describe, it */

var path    = require('path');
var request = require('supertest');
var utils   = require('../lib/utils');
var app     = require('../app');
var routes  = utils.requireDir(path.join(__dirname, '../routes/'));

var opt = process.argv[process.argv.length - 1];
var m = opt.match(/^--host=(.*)/);
if (!m) {
    throw new Error('Missing required --host parameter');
}

var host = m[1];

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
