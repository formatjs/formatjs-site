/*globals casper */

'use strict';

var BASE_URL = 'http://' + casper.cli.options.host + '/react/';

casper.test.begin('Test React integration example', function (test) {

    test.comment('Load React integration page');
    casper.start(BASE_URL, function () {
        test.pass('Page was loaded');
    });

    casper.then(function() {
        test.comment('Test React integration - Relative time formatting example using cs-CZ');

        test.assertExists('#ex-react-relative .locale-select', 'Found locale select');
        test.assertExists('#ex-react-relative .react-output', 'Found React output');

        var output = casper.evaluate(function (locale) {
            var localeSelect = document.querySelector('#ex-react-relative .locale-select');
            localeSelect.value = locale;

            var evt = new Event('change', { bubbles: true });
            localeSelect.dispatchEvent(evt);

            var elements = document.querySelectorAll('#ex-react-relative .react-output li');
            if (elements.length > 0) {
                return elements[1].textContent.trim();
            }
        }, 'cs-CZ');

        test.assertEquals(output,
            'před 2 hodinami',
            'Check that React output is in Czech');
    });

    casper.run();
});
