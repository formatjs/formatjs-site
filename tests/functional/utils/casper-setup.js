/*globals casper */

'use strict';

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:35.0) Gecko/20100101 Firefox/35.0');

casper.on('page.initialized', function () {
    casper.page.injectJs('tests/functional/includes/fn.bind.polyfill.js');
    casper.page.injectJs('tests/functional/includes/html.event.polyfill.js');
});

casper.on('page.error', function (msg, trace) {
    this.echo('Error:    ' + msg, 'ERROR');
    this.echo('file:     ' + trace[0].file, 'WARNING');
    this.echo('line:     ' + trace[0].line, 'WARNING');
    this.echo('function: ' + trace[0]['function'], 'WARNING');
    this.die('Aborted due to JavaScript exception');
});
