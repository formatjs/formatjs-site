'use strict';

// TODO: Remove this when it is no longer required for Express to work in the
// Manhattan Node.js hosting environment.
process.chdir(__dirname);

var http = require('http'),
    app  = require('./app');

http.createServer(app).listen(app.get('port'), function () {
    console.log('%s server listening on: %d', app.get('name'), app.get('port'));
});
