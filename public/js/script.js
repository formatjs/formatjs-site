var IntlDocs = (function () {
    var queue = [],
        statuses = [];

    function checkFlush() {
        var i = 0, length = statuses.length, ready = true;
        while (i < length && ready) {
            if (!statuses[i].ready) {
                ready = false;
            }
            i++;
        }
        if (ready) {
            for (i = 0, length = queue.length; i < length; i++) {
                queue[i]();
            }
            queue = [];
        }
    }

    function load(fn) {
        var status = {
            ready: false
        };
        function callback() {
            status.ready = true;
            checkFlush();
        }
        statuses.push(status);
        fn(callback);
    }

    return {
        polyfill: function (config) {
            load(function (callback) {
                yepnope({
                    test: config.test,
                    nope: config.url,
                    complete: callback
                });
            });
        },
        script: function (source) {
            load(function (callback) {
                yepnope.injectJs(source, callback);
            });
        },
        ready: function (callback) {
            queue.push(callback);
            checkFlush();
        }
    };
}());

IntlDocs.polyfill({
    test: !!window.Intl,
    url: 'http://yui.yahooapis.com/platform/intl/0.1.2/Intl.js'
});
