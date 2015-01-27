'use strict';

/*global describe, it*/
var request = require('supertest');
var config  = require('../../config');

var host = process.env.manhattan_context__instance_hostname || 'http://localhost';

request = request(host + ':' + config.port);

describe('application', function () {
    [
        '/',
        '/about/',
        '/guide/',
        '/integrations/',
        '/github/',
        '/handlebars/',
        '/react/',
        '/dust/'
    ].forEach(function (route) {
        it('correctly responds on the ' + route + ' route', function (done) {
            request.get(route)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8')
                .end(done);
        });
    });
});
