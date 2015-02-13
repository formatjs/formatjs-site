/*globals casper */

'use strict';

var BASE_URL = 'http://' + casper.cli.options.host + '/dust/';

casper.test.begin('Test Dust integration example', function (test) {

    test.comment('Load Dust integration page');
    casper.start(BASE_URL, function () {
        test.pass('Page was loaded');
    });

    casper.then(function() {
        test.comment('Test Dust integration - Number formatting example using ja-JP');

        test.assertExists('#ex-dust-custom .locale-select', 'Found locale select');
        test.assertExists('#ex-dust-custom .dust-output', 'Found Handlebars output');

        var output = casper.evaluate(function (locale) {
            var localeSelect = document.querySelector('#ex-dust-custom .locale-select');
            localeSelect.value = locale;

            var evt = new Event('change', { bubbles: true });
            localeSelect.dispatchEvent(evt);

            var elements = document.querySelectorAll('#ex-dust-custom .dust-output li');
            if (elements.length > 0) {
                return elements[1].textContent.trim();
            }
        }, 'ja-JP');

        test.assertEquals(output,
            '2014年1月23日',
            'Check that Dust output is in Japanese');
    });

    casper.run();
});
