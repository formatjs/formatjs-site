// Needed for PhantomJS < 2.0

if (!window.Event || typeof Event !== 'function') {
    Event = function (type, cfg) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(type, cfg.bubbles, cfg.cancelable);
        return evt;
    };
}
