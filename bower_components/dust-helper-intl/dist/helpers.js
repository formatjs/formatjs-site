/*
 * Copyright (c) 2014, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
(/* istanbul ignore next */
 function (root, factory) {
    'use strict';

    // Intl and IntlMessageFormat are dependencies of this package. The built-in
    // `Intl` is preferred, but when not available it looks for the polyfill.
    var Intl = root.Intl || root.IntlPolyfill;

    // AMD anonymous module
    if (typeof define === 'function' && define.amd) {
        define(['intl-messageformat'], function (IntlMessageFormat) {
            return factory(Intl, IntlMessageFormat);
        });
    }

    // node.js/CommonJs
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(Intl, require('intl-messageformat'));
    }

    root.DustHelperIntl = factory(Intl, root.IntlMessageFormat);
})(typeof global !== 'undefined' ? global : this, function (Intl, IntlMessageFormat) {


    /* istanbul ignore if */
    if (!Intl) {
        throw new ReferenceError('Intl must be provided.');
    }

    /* istanbul ignore if */
    if (!IntlMessageFormat) {
        throw new ReferenceError('IntlMessageFormat must be provided.');
    }


    var CONTEXT_KEY = 'intl';


    /**
     shallow merge of keys from one object to another
     @protected
     @method _extend
     @param {Object} receiver The object which will receive the keys and values.
     @param {Object} sender The object which is providing the keys and values.
     @return {Object} The `receiver` object.
     */
    function _extend(receiver, sender) {
        var p;
        for (p in sender) {
            if (sender.hasOwnProperty(p)) {
                receiver[p] = sender[p];
            }
        }
        return receiver;
    }


    // a copy of dust.helpers.tap from dustjs-helpers@1.1.2
    function _tap(input, chunk, context) {
        // return given input if there is no dust reference to resolve
        var output = input;
        // dust compiles a string/reference such as {foo} to function, 
        if (typeof input === "function") {
            // just a plain function (a.k.a anonymous functions) in the context, not a dust `body` function created by the dust compiler
            if (input.isFunction === true) {
                output = input();
            } else {
                output = '';
                chunk.tap(function(data) {
                    output += data;
                    return '';
                }).render(input, context).untap();
                if (output === '') {
                    output = false;
                }
            }
        }
        return output;
    }


    /**
     Returns something from deep within the a value in the context, taking into
     consideration the context stack.  (The built-in version of context.get()
     isn't quite sophisticated enough for us.)
     @protected
     @method _contextGet
     @param {Object} ctx The dust context.
     @param {Array} keys An ordered list of keys to drill down into the data structure.
     @return {mixed} Value found for the key path, or undefined if not found.
     */
    function _contextGet(ctx, keys) {
        var frame,  // the current stack frame
            data,   // the spot within the stack frame we're inspecting
            last = keys.length - 1,
            k,
            key;
        for (frame = ctx.stack; frame; frame = frame.tail) {
            data = frame.head;
            for (k = 0; k < last; k += 1) {
                key = keys[k];
                if (! data.hasOwnProperty(key)) {
                    break;
                }
                data = data[key];
            }
            if (k === last && data.hasOwnProperty(keys[last])) {
                return data[keys[last]];
            }
        }
        return undefined;   // value not found anywhere
    }


    /**
     Determins the current locales, possibly looking in parent contexts
     if they've been defined there.  Defaults to the global `this`.
     @protected
     @method _getLocales
     @param {Object} [params] the parameters passed to the dust helper
     @param {Object} [context] the dust helper context
     @return {string} the locale to use
     */
    function _getLocales(chunk, params, context) {
        if (params.locales) {
            return _tap(params.locales, chunk, context);
        }
        return _contextGet(context, [CONTEXT_KEY, 'locales']) || this.locale;
    }


    /**
     Determines the format options, possibly looking in parent contexts
     if they've been defined there.
     @protected
     @method _getFormatOptions
     @param {Object} params The parameters passed to the dust helper.
     @param {Object} context The dust context stack.
     @return {Object} The format options.
     */
    function _getFormatOptions(type, chunk, params, context) {
        var raw,
            k,
            fixed = {},
            fmt;
        if (params.formatName) {
            fmt = _tap(params.formatName, chunk, context);
            delete params.formatName;
            raw = _contextGet(context, [CONTEXT_KEY, 'formats', type, fmt]);
            // TODO:  only need to copy-and-merge if there are still parameters
            raw = _extend({}, raw);  // shallow copy
            _extend(raw, params);
        }
        else {
            raw = params;
        }
        for (k in raw) {
            if (raw.hasOwnProperty(k)) {
                fixed[k] = _tap(raw[k], chunk, context);
            }
        }
        return fixed;
    }


    /**
    Interprets `params.val` as a YRB message to format.
    @method intlMessage
    @param {Object} chunk The dust Chunk object.
    @param {Object} context The dust Context object.
    @param {Object} bodies An object containing the dust bodies.
    @param {Object} params An object containing the parameters in the markup for this helper.
    @return {Object} The `chunk` parameter.
    */
    function intlMessage(chunk, context, bodies, params) {
        var formatOptions = {},
            locales,
            msg,
            formatter;
        params = params || {};

        if (params.hasOwnProperty('_msg')) {
            msg = params._msg;
        }
        else if (params._key) {
            msg = _contextGet(context, [CONTEXT_KEY, 'messages', _tap(params._key, chunk, context)]);
        }
        else {
            throw new ReferenceError('@intlMessage needs either a `_msg` or `_key` parameter');
        }

        // optimization for messages that have already been compiled
        if ('object' === typeof msg && 'function' === typeof msg.format) {
            chunk.write(msg.format(params));
            return chunk;
        }

        formatOptions = _contextGet(context, [CONTEXT_KEY, 'formats']);
        locales = _getLocales(chunk, params, context);
        formatter = new IntlMessageFormat(msg, locales, formatOptions);
        chunk.write(formatter.format(params));
        return chunk;
    }


    /**
    Interprets `params.val` as a number to format.
    @method intlNumber
    @param {Object} chunk The dust Chunk object.
    @param {Object} context The dust Context object.
    @param {Object} bodies An object containing the dust bodies.
    @param {Object} params An object containing the parameters in the markup for this helper.
    @return {Object} The `chunk` parameter.
    */
    function intlNumber(chunk, context, bodies, params) {
        var formatOptions,
            locales,
            val,
            formatter;
        params = params || {};

        if (!params.hasOwnProperty('val')) {
            throw new ReferenceError('@intlNumber needs a `val` parameter');
        }
        val = _tap(params.val, chunk, context);
        delete params.val;  // since params might be interpretted as format options

        formatOptions = _getFormatOptions('number', chunk, params, context);
        locales = _getLocales(chunk, params, context);
        // TODO:  caching based on key [locales, formatOptions]
        formatter = new Intl.NumberFormat(locales, formatOptions);
        chunk.write(formatter.format(val));
        return chunk;
    }


    /**
    Interprets `params.val` as a date or time to format.
    @method intlDate
    @param {Object} chunk The dust Chunk object.
    @param {Object} context The dust Context object.
    @param {Object} bodies An object containing the dust bodies.
    @param {Object} params An object containing the parameters in the markup for this helper.
    @return {Object} The `chunk` parameter.
    */
    function intlDate(chunk, context, bodies, params) {
        var formatOptions,
            locales,
            val,
            formatter;
        params = params || {};

        if (!params.hasOwnProperty('val')) {
            throw new ReferenceError('@intlDate needs a `val` parameter');
        }
        val = _tap(params.val, chunk, context);
        delete params.val;  // since params might be interpretted as format options
        val = new Date(val).getTime();

        formatOptions = _getFormatOptions('date', chunk, params, context);
        locales = _getLocales(chunk, params, context);
        // TODO:  caching based on key [locales, formatOptions]
        formatter = new Intl.DateTimeFormat(locales, formatOptions);
        chunk.write(formatter.format(val));
        return chunk;
    }


    /**
    A block wrapper which stashes the `params` in the context so that
    they are available for other intl helpers within the block.
    @method intlMessage
    @param {Object} chunk The dust Chunk object.
    @param {Object} context The dust Context object.
    @param {Object} bodies An object containing the dust bodies.
    @param {Object} params An object containing the parameters in the markup for this helper.
    @return {Object} The `chunk` parameter.
    */
    function intl(chunk, context, bodies, params) {
        var ctx = {};
        if (bodies.block) {
            ctx[CONTEXT_KEY] = params || {};
            return chunk.render(bodies.block, context.push(ctx));
        }
        return chunk;
    }


    return {
        // expose the helpers individually in case someone wants to use
        // only some of them
        helpers: {
            intlMessage:    intlMessage,
            intlNumber:     intlNumber,
            intlDate:       intlDate,
            intl:           intl
        },

        // utility method to register all the helpers
        registerWith: function(dust) {
            dust.helpers.intlMessage    = intlMessage;
            dust.helpers.intlNumber     = intlNumber;
            dust.helpers.intlDate       = intlDate;
            dust.helpers.intl           = intl;
        }
    };
});

