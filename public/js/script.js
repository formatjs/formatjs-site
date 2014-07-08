//Client-side JS goes here.
(function () {
    var locale    = APP.intl.locale,
        // TODO: expose these URLs through Express State instead
        baseUrl   = 'http://yui.yahooapis.com/combo?platform/intl/0.1.2/Intl.min.js&platform/intl/0.1.2/locale-data/jsonp/',
        comboUrl  = baseUrl + locale + '.js',
        intlMessageFormatUrl = '/bower_components/intl-messageformat/build/intl-messageformat.complete.min.js',
        exampleUrl = '/js/' + APP.example + '-example.js';

    yepnope([{
        test : !!window.Intl,
        nope : comboUrl
    }, {
        load : (APP.scripts || [intlMessageFormatUrl]).concat([exampleUrl]),
        complete : init
    }]);

    function init () {
        if (window[APP.example + 'Example']) {
            window[APP.example + 'Example'].init();
        }
    }
})();
