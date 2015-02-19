/*globals casper */

'use strict';

casper.host = 'http://' + casper.cli.options.host;

casper.on('page.initialized', function () {
    casper.page.injectJs('tests/functional/includes/fn.bind.polyfill.js');
    casper.page.injectJs('tests/functional/includes/html.event.polyfill.js');
    casper.page.injectJs('tests/functional/includes/date.mock.js');
});

casper.on('page.error', function (msg, trace) {
    this.echo('Error:    ' + msg, 'ERROR');
    this.echo('file:     ' + trace[0].file, 'WARNING');
    this.echo('line:     ' + trace[0].line, 'WARNING');
    this.echo('function: ' + trace[0]['function'], 'WARNING');
    this.die('Aborted due to JavaScript exception');
});

// Log any browser console.log messages to grunt
casper.on('remote.message', function(message) {
    this.echo('remote message caught: ' + message);
});
