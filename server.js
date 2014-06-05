// TODO: Remove this when it is no longer required for Express to work in the
// Manhattan Node.js hosting environment.
process.chdir(__dirname);

var http = require('http'),
    app  = require('./app'),
    port = app.get('port');

http.createServer(app).listen(port, function () {
    console.log(app.get('name') + ' Server listening on ' + port);
});
