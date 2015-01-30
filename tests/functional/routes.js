'use strict';

/*global describe, it*/
var path    = require('path');
var request = require('supertest');
var utils   = require('../../lib/utils');
var app     = require('../../app');
var routes  = utils.requireDir(path.join(__dirname, '../../routes/'));

var host = process.env.manhattan_context__instance_hostname ||
    'http://localhost:' + app.get('port');

console.log('Testing host: ' + host);

request = request(host);

function isRouter(stackEntry) {
    return stackEntry.name === 'router';
}

function getRoutes(stackEntry) {
    return stackEntry.handle.stack;
}

describe('Functional tests', function () {
    // Assuming all files in /routes/ expect index.js match the name of the route
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
