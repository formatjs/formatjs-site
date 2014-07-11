/*
 * Copyright (c) 2011-2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/* jshint node:true */
/* global describe, it, locale, currency */

'use strict';

// set locale
global.locale = "en";
global.currency = "USD";

var async,
    chai,
    expect,
    Dust,
    intl,
    IntlMessageFormat,
    // Use a fixed known date
    dateStr = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)',
    timeStamp = 1390518044403;


if (typeof require === 'function') {
    async = require('async');
    chai = require('chai');
    Dust = require('dustjs-linkedin');

    intl = require('intl');

    if (typeof Intl === 'undefined') {
        global.Intl = intl;
    }

    // load in message format
    IntlMessageFormat = require('intl-messageformat');
    require('intl-messageformat/locale-data/en');

    require('../lib/helpers.js').registerWith(Dust);
}

expect = chai.expect;


describe('Helper `intlNumber`', function () {
    it('should be added to Dust', function () {
        expect(Dust.helpers).to.include.keys('intlNumber');
    });

    it('should be a function', function () {
        expect(Dust.helpers.intlNumber).to.be.a('function');
    });

    it('should throw if called with out a value', function () {
        try {
            var name = 'number0',
                tmpl = '{@intlNumber /}',
                ctx = {},
                expected = new ReferenceError('@intlNumber needs a `val` parameter');
            Dust.loadSource(Dust.compile(tmpl, name));
            Dust.render(name);
        } catch (e) {
            var err = new ReferenceError('@intlNumber needs a `val` parameter');
            expect(e.toString()).to.equal(err.toString());
        }
    });

    describe('used to format numbers', function () {
        it('should return a string', function () {
            var tmpl = "{@intlNumber val=4 /}",
                expected = "4";
            Dust.renderSource(tmpl, {}, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should return a decimal as a string', function () {
            var tmpl = '{@intlNumber val=NUM /}',
                ctx = { NUM: 4.004 },
                expected = "4.004";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should return a formatted string with a thousand separator', function () {
            var tmpl = '{@intlNumber val=NUM /}',
                ctx = { NUM: 40000 },
                expected = "40,000";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should return a formatted string with a thousand separator and decimal', function () {
            var tmpl = '{@intlNumber val=NUM /}',
                ctx = { NUM: 40000.004 },
                expected = "40,000.004";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should work wwith a value from context', function () {
            var tmpl = '{@intlNumber val="{THOUSANDS}{HUNDREDS}" /}',
                ctx = {
                    THOUSANDS: '40',
                    HUNDREDS: '000'
                },
                expected = "40,000";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        describe('in another locale', function () {
            it('should return a string', function () {
                var tmpl = '{@intlNumber val=4 locales="de-DE" /}',
                    ctx = {},
                    expected = "4";
                Dust.renderSource(tmpl, ctx, function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should return a decimal as a string', function () {
                var tmpl = '{@intlNumber val=NUM locales="de-DE" /}',
                    ctx = { NUM: 4.004 },
                    expected = "4,004";
                Dust.renderSource(tmpl, ctx, function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should return a formatted string with a thousand separator', function () {
                var tmpl = '{@intlNumber val=NUM locales="de-DE" /}',
                    ctx = { NUM: 40000 },
                    expected = "40.000";
                Dust.renderSource(tmpl, ctx, function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should return a formatted string with a thousand separator and decimal', function () {
                var tmpl = '{@intlNumber val=NUM locales="de-DE" /}',
                    ctx = { NUM: 40000.004 },
                    expected = "40.000,004";
                Dust.renderSource(tmpl, ctx, function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should work wwith a locale from context', function () {
                var tmpl = '{@intlNumber val=NUM locales="{LANG}-{REGION}" /}',
                    ctx = {
                        NUM: 40000.004,
                        LANG: 'de',
                        REGION: 'DE'
                    },
                    expected = "40.000,004";
                Dust.renderSource(tmpl, ctx, function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should work wwith a locale from explicit context', function () {
                var tmpl = '{@intlNumber val=NUM /}',
                    ctx = {
                        intl: {
                            locales: 'de-DE'
                        },
                        NUM: 40000.004
                    },
                    expected = "40.000,004";
                Dust.renderSource(tmpl, ctx, function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should work with a locale from global context', function() {
                var tmpl = '{@intlNumber val=NUM /}',
                    baseCtx = Dust.makeBase({
                        intl: {
                            locales: 'de-DE'
                        }
                    }),
                    ctx = {
                        NUM: 40000.004
                    },
                    expected = "40.000,004";
                Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should use locale from param (if exists), rather than global context', function() {
                var tmpl = '{@intlNumber val=NUM locales="en-US" /}',
                    baseCtx = Dust.makeBase({
                        intl: {
                            locales: 'de-DE'
                        }
                    }),
                    ctx = {
                        NUM: 40000.004
                    },
                    expected = "40,000.004"; // en-US locale
                Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
                    expect(out).to.equal(expected);
                });
            });

            it('should use locale from explicit context (if exists), rather than global context', function() {
                var tmpl = '{@intlNumber val=NUM /}',
                    baseCtx = Dust.makeBase({
                        intl: {
                            locales: 'de-DE'
                        }
                    }),
                    ctx = {
                        intl: {
                            locales: 'en-US'
                        },
                        NUM: 40000.004
                    },
                    expected = "40,000.004"; // en-US locale
                Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
                    expect(out).to.equal(expected);
                });
            });
        });
    });

    describe('used to format currency', function () {
        it('should return a string formatted to currency', function () {
            var name = 'number6',
                tmpl = '{@intlNumber val=40000 style="currency" currency=CURRENCY /}';
            Dust.loadSource(Dust.compile(tmpl, name));
            async.series([
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'USD' }, function(err, out) {
                        expect(out, 'USD').to.equal('$40,000.00');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'EUR' }, function(err, out) {
                        expect(out, 'EUR').to.equal('€40,000.00');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'JPY' }, function(err, out) {
                        expect(out, 'JPY').to.equal('¥40,000');
                        taskDone(err);
                    });
                }
            ], function(err) {
                throw err;
            });
        });

        it('should return a string formatted to currency with code', function () {
            var name = 'number7',
                tmpl = '{@intlNumber val=40000 style="currency" currency=CURRENCY currencyDisplay="code" /}';
            Dust.loadSource(Dust.compile(tmpl, name));
            async.series([
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'USD' }, function(err, out) {
                        expect(out, 'USD').to.equal('USD40,000.00');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'EUR' }, function(err, out) {
                        expect(out, 'EUR').to.equal('EUR40,000.00');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'JPY' }, function(err, out) {
                        expect(out, 'JPY').to.equal('JPY40,000');
                        taskDone(err);
                    });
                }
            ], function(err) {
                throw err;
            });
        });

        it('should function within an `each` block helper', function () {
            var tmpl = '{#currencies} {@intlNumber val=AMOUNT style="currency" currency=CURRENCY /}{/currencies}',
                ctx = {
                    currencies: [
                        { AMOUNT: 3, CURRENCY: 'USD' },
                        { AMOUNT: 8, CURRENCY: 'EUR' },
                        { AMOUNT: 10, CURRENCY: 'JPY' }
                    ]
                },
                expected = " $3.00 €8.00 ¥10";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should return a currency even when using a different locale', function (){
            var name = 'number9',
                tmpl = '{@intlNumber val=40000 locales="de-DE" style="currency" currency=CURRENCY/}';
            Dust.loadSource(Dust.compile(tmpl, name));
            async.series([
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'USD' }, function(err, out) {
                        expect(out, 'USD->de-DE').to.equal('40.000,00 $');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'EUR' }, function(err, out) {
                        expect(out, 'EUR->de-DE').to.equal('40.000,00 €');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, { CURRENCY: 'JPY' }, function(err, out) {
                        expect(out, 'JPY->de-DE').to.equal('40.000 ¥');
                        taskDone(err);
                    });
                }
            ], function(err) {
                throw err;
            });
        });

        it('should return a currency even when using a different locale from global context', function (){
            var name = 'number9',
                baseCtx = Dust.makeBase({
                    intl: {
                        locales: 'de-DE'
                    }
                }),
                tmpl = '{@intlNumber val=40000 style="currency" currency=CURRENCY/}';
            Dust.loadSource(Dust.compile(tmpl, name));
            async.series([
                function(taskDone) {
                    Dust.render(name, baseCtx.push({ CURRENCY: 'USD' }), function(err, out) {
                        expect(out, 'USD->de-DE').to.equal('40.000,00 $');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, baseCtx.push({ CURRENCY: 'EUR' }), function(err, out) {
                        expect(out, 'EUR->de-DE').to.equal('40.000,00 €');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    Dust.render(name, baseCtx.push({ CURRENCY: 'JPY' }), function(err, out) {
                        expect(out, 'JPY->de-DE').to.equal('40.000 ¥');
                        taskDone(err);
                    });
                }
            ], function(err) {
                throw err;
            });
        });

        it('should return a currency even when using a different locale from param (if exists), rather than locale in global context', function (){
            var name = 'number9',
                baseCtx = Dust.makeBase({
                    intl: {
                        locales: 'de-DE'
                    }
                }),
                tmpl = '{@intlNumber val=40000 style="currency" currency=CURRENCY/}';
            Dust.loadSource(Dust.compile(tmpl, name));
            async.series([
                function(taskDone) {
                    var ctx = {
                        CURRENCY: 'USD',
                        intl: {
                            locales: 'en-US'
                        }
                    };
                    Dust.render(name, baseCtx.push(ctx), function(err, out) {
                        expect(out, 'USD->en-US').to.equal('$40,000.00');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    var ctx = {
                        CURRENCY: 'EUR',
                        intl: {
                            locales: 'en-US'
                        }
                    };
                    Dust.render(name, baseCtx.push(ctx), function(err, out) {
                        expect(out, 'EUR->en-US').to.equal('€40,000.00');
                        taskDone(err);
                    });
                },
                function(taskDone) {
                    var ctx = {
                        CURRENCY: 'JPY',
                        intl: {
                            locales: 'en-US'
                        }
                    };
                    Dust.render(name, baseCtx.push(ctx), function(err, out) {
                        expect(out, 'JPY->en-US').to.equal('¥40,000');
                        taskDone(err);
                    });
                }
            ], function(err) {
                throw err;
            });
        });

        it('should work with a currency from context', function() {
            var tmpl = '{@intlNumber val=AMOUNT style="currency" currency="{CURRENCY}" /}',
                ctx = {
                    AMOUNT: 40000.004,
                    CURRENCY: 'EUR'
                },
                expected = "€40,000.00";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });
    });

    describe('used to format percentages', function () {
        it('should return a string formatted to a percent', function () {
            var tmpl = '{@intlNumber val=400 style="percent"/}',
                ctx = {},
                expected = "40,000%";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should return a perctage when using a different locale', function () {
            var tmpl = '{@intlNumber val=400 locales="de-DE" style="percent"/}',
                ctx = {},
                expected = "40.000 %";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should return a perctage when using a different locale from global context', function () {
            var tmpl = '{@intlNumber val=400 style="percent"/}',
                baseCtx = Dust.makeBase({
                    intl: {
                        locales: 'de-DE'
                    }
                }),
                ctx = {},
                expected = "40.000 %";  // de-DE locales
            Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('should return a perctage when using a locale from param (if exists), rather than from global context', function () {
            var tmpl = '{@intlNumber val=400 style="percent" locales="fr-FR" /}',
                baseCtx = Dust.makeBase({
                    intl: {
                        locales: 'de-DE'
                    }
                }),
                ctx = {},
                expected = "40 000 %";  // fr-FR locales
            Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
                expect(out).to.equal(expected);
            });
        });
    });
});


describe('Helper `intlDate`', function () {
    it('should be added to Dust', function () {
        expect(Dust.helpers).to.include.keys('intlDate');
    });

    it('should be a function', function () {
        expect(Dust.helpers.intlDate).to.be.a('function');
    });

    it('should throw if called with out a value', function () {
        try {
            var name = 'date0',
                tmpl = '{@intlDate /}';
            Dust.loadSource(Dust.compile(tmpl, name));
            Dust.render(name);
        } catch (e) {
            var err = new ReferenceError('@intlDate needs a `val` parameter');
            expect(e.toString()).to.equal(err.toString());
        }
    });

    it('should return a formatted string (date)', function () {
        var tmpl = '{@intlDate val="' + dateStr + '" /}',
            ctx = {},
            expected = "1/23/2014";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string (date) using different locale', function () {
        var tmpl = '{@intlDate val="' + dateStr + '" locales="de-DE" /}',
            ctx = {},
            expected = "23.1.2014"; // de-DE locales
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string (date) using different locale from global context', function () {
        var tmpl = '{@intlDate val="' + dateStr + '" /}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'de-DE'
                }
            }),
            ctx = {},
            expected = "23.1.2014"; // de-DE locales
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string (date) using different locale from param (if exists) rather than from global context', function () {
        var tmpl = '{@intlDate val="' + dateStr + '" locales="fr-FR" /}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'de-DE'
                }
            }),
            ctx = {},
            expected = "23/1/2014"; // fr-FR locales
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string (time)', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' /}',
            ctx = {},
            expected = "1/23/2014";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string (time) using different locale', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' locales="de-DE" /}',
            ctx = {},
            expected = "23.1.2014";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string (time) using different locale from global context', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' /}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'de-DE'
                }
            }),
            ctx = {},
            expected = "23.1.2014";
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string (time) using different locale from param (if exists) rather than from global context', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' locales="fr-FR" /}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'de-DE'
                }
            }),
            ctx = {},
            expected = "23/1/2014";
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    /** SINGLE VALUES ARE MUTED FOR NOW :: https://github.com/andyearnshaw/Intl.js/issues/56
    it('should return a formatted string of option requested', function () {
        var tmpl = '{@intlDate val=DATE year="numeric" /}',
            ctx = { DATE: dateStr },
            expected = "2014";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });
    */

    it('should return a formatted string of just the time', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' hour="numeric" minute="numeric" timeZone="UTC"/}',
            ctx = {},
            expected = '11:00 PM',
            d = new Date(timeStamp);
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string of just the time using different locales', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' hour="numeric" minute="numeric" timeZone="UTC" locales="de-DE"/}',
            ctx = {},
            expected = '23:00',
            d = new Date(timeStamp);
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string of just the time using different locales from global context', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' hour="numeric" minute="numeric" timeZone="UTC"/}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'de-DE'
                }
            }),
            ctx = {},
            expected = '23:00',
            d = new Date(timeStamp);
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should work with format options from context', function () {
        var tmpl = '{@intlDate val=' + timeStamp + ' hour=HOUR minute="{MINUTE}" timeZone="UTC"/}',
            ctx = {
                HOUR: 'numeric',
                MINUTE: 'numeric'
            },
            expected = '11:00 PM',
            d = new Date(timeStamp);
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });
});


describe('Helper `intlMessage`', function () {
    it('should be added to Dust', function () {
        expect(Dust.helpers).to.include.keys('intlMessage');
    });

    it('should be a function', function () {
        expect(Dust.helpers.intlMessage).to.be.a('function');
    });

    it('should throw if called with out a value', function () {
        try {
            var name = 'message0',
                tmpl = '{@intlMessage /}';
            Dust.loadSource(Dust.compile(tmpl, name));
            Dust.render(name);
        } catch (e) {
            var err = new ReferenceError('@intlMessage needs either a `_msg` or `_key` parameter');
            expect(e.toString()).to.equal(err.toString());
        }
    });

    it('should return a formatted string', function () {
        var tmpl = '{@intlMessage _msg=MSG firstName=firstName lastName=lastName /}',
            ctx = {
                MSG: 'Hi, my name is {firstName} {lastName}.',
                firstName: 'Anthony',
                lastName: 'Pipkin'
            },
            expected = "Hi, my name is Anthony Pipkin.";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string with formatted numbers and dates', function () {
        var tmpl = '{@intlMessage _msg=POP_MSG city=city population=population census_date=census_date timeZone=timeZone/}',
            ctx = {
                POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
                city: 'Atlanta',
                population: 5475213,
                census_date: (new Date('1/1/2010')).getTime(),
                timeZone: 'UTC'
            },
            expected = "Atlanta has a population of 5,475,213 as of January 1, 2010.";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string with formatted numbers and dates in a different locale', function () {
        var tmpl = '{@intlMessage _msg=POP_MSG locales="de-DE" city=city population=population census_date=census_date timeZone=timeZone/}',
            ctx = {
                POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
                city: 'Atlanta',
                population: 5475213,
                census_date: (new Date('1/1/2010')),
                timeZone: 'UTC'
            },
            expected = "Atlanta has a population of 5.475.213 as of 1. Januar 2010.";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string with formatted numbers and dates in a different locale from global context', function () {
        var tmpl = '{@intlMessage _msg=POP_MSG city=city population=population census_date=census_date timeZone=timeZone/}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'de-DE'
                }
            }),
            ctx = {
                POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
                city: 'Atlanta',
                population: 5475213,
                census_date: (new Date('1/1/2010')),
                timeZone: 'UTC'
            },
            expected = "Atlanta has a population of 5.475.213 as of 1. Januar 2010.";
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string with formatted numbers and dates in a different locale from param (if exists) rather than global context', function () {
        var tmpl = '{@intlMessage _msg=POP_MSG locales="fr-FR" city=city population=population census_date=census_date timeZone=timeZone/}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'de-DE'
                }
            }),
            ctx = {
                POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
                city: 'Atlanta',
                population: 5475213,
                census_date: (new Date('1/1/2010')),
                timeZone: 'UTC'
            },
            expected = "Atlanta has a population of 5 475 213 as of 1 janvier 2010.";   // fr-FR locales
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should return a formatted string with an `each` block', function () {
        var tmpl = '{#harvest} {@intlMessage _msg=HARVEST_MSG person=person count=count /}{/harvest}',
            ctx = {
                HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
                harvest: [
                    { person: 'Allison', count: 10 },
                    { person: 'Jeremy', count: 60 }
                ]
            },
            expected = " Allison harvested 10 apples. Jeremy harvested 60 apples.";
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should use a precompiled message', function () {
        var tmpl = '{@intlMessage _msg=MSG firstName=firstName lastName=lastName /}',
            ctx = {
                firstName: 'Anthony',
                lastName: 'Pipkin'
            },
            expected = "Hi, my name is Anthony Pipkin.";
        ctx.MSG = new IntlMessageFormat('Hi, my name is {firstName} {lastName}.');
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });
});


describe('Helper `intl`', function () {
    it('should be added to Dust', function () {
        expect(Dust.helpers).to.include.keys('intl');
    });

    it('should be a function', function () {
        expect(Dust.helpers.intl).to.be.a('function');
    });

    it('should maintain a locale', function () {
        var name = 'intl3',
            tmpl = '{@intlNumber val=NUM/} {@intl locales="de-DE"}{@intlNumber val=NUM /}{/intl} {@intlNumber val=NUM/}',
            ctx = { NUM: 40000.004 },
            expected = '40,000.004 40.000,004 40,000.004';
        Dust.loadSource(Dust.compile(tmpl, name));
        Dust.render(name, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should maintain a locale and fallback to global context', function () {
        var name = 'intl3',
            tmpl = '{@intlNumber val=NUM/} {@intl locales="de-DE"}{@intlNumber val=NUM /}{/intl} {@intlNumber val=NUM/}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'fr-FR'
                }
            }),
            ctx = { NUM: 40000.004 },
            expected = '40 000,004 40.000,004 40 000,004';
        Dust.loadSource(Dust.compile(tmpl, name));
        Dust.render(name, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should maintain context regardless of depth', function () {
        var tmpl = '{@intl locales="de-DE"}{@intl locales="en-US"}{@intlNumber val=NUM/} {/intl}{@intlNumber val=NUM/}{/intl} {@intlNumber val=NUM/}',
            ctx = { NUM: 40000.004 },
            expected = '40,000.004 40.000,004 40,000.004';
        Dust.renderSource(tmpl, ctx, function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    it('should maintain context regardless of depth and fallback to global context', function () {
        var tmpl = '{@intl locales="de-DE"}{@intl locales="en-US"}{@intlNumber val=NUM/} {/intl}{@intlNumber val=NUM/}{/intl} {@intlNumber val=NUM/}',
            baseCtx = Dust.makeBase({
                intl: {
                    locales: 'fr-FR'
                }
            }),
            ctx = { NUM: 40000.004 },
            expected = '40,000.004 40.000,004 40 000,004';  // [en-US locales] [de-DE locales] [fr-FR locales from global context]
        Dust.renderSource(tmpl, baseCtx.push(ctx), function(err, out) {
            expect(out).to.equal(expected);
        });
    });

    describe('should provide `messages` for intlMessage', function () {
        it('strings', function () {
            var tmpl = '{@intl messages=intl.messages}{#harvest} {@intlMessage _key="HARVEST_MSG" person=person count=count /}{/harvest}{/intl}',
                ctx = {
                    intl: {
                        messages: {
                            HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
                        }
                    },
                    harvest: [
                        { person: 'Allison', count: 1 },
                        { person: 'Jeremy', count: 60 }
                    ]
                },
                expected = " Allison harvested 1 apple. Jeremy harvested 60 apples.";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });
        it('precompiled object', function () {
            var tmpl = '{@intl messages=intl.messages}{@intlMessage _key="salutation" firstName=firstName lastName=lastName /}{/intl}',
                ctx = {
                    intl: { messages: {} },
                    firstName: 'Anthony',
                    lastName: 'Pipkin'
                },
                expected = "Hi, my name is Anthony Pipkin.";
            ctx.intl.messages.salutation = new IntlMessageFormat('Hi, my name is {firstName} {lastName}.');
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });
    });

    describe('should provide formats', function () {
        it('for intlNumber', function () {
            var tmpl = '{@intl formats=intl.formats}{@intlNumber val=NUM formatName="usd"/} {@intlNumber val=NUM formatName="eur"/} {@intlNumber val=NUM style="currency" currency="USD"/}{/intl}',
                ctx = {
                    intl: {
                        formats: {
                            number: {
                                eur: { style: 'currency', currency: 'EUR' },
                                usd: { style: 'currency', currency: 'USD' }
                            }
                        }
                    },
                    NUM: 40000.004
                },
                expected = '$40,000.00 €40,000.00 $40,000.00';
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('for intlDate', function () {
            var tmpl = '{@intl formats=intl.formats}{@intlDate val=' + timeStamp + ' formatName="hm" timeZone="UTC"/}{/intl}',
                ctx = {
                    intl: {
                        formats: {
                            date: {
                                hm: { hour: 'numeric', minute: 'numeric' }
                            }
                        }
                    }
                },
                expected = "11:00 PM",
                d = new Date(timeStamp);
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });

        it('for intlMessage', function () {
            var tmpl = '{@intl formats=intl.formats}{@intlMessage _msg=MSG product=PRODUCT price=PRICE deadline=DEADLINE timeZone=TZ/}{/intl}',
                ctx = {
                    MSG: '{product} cost {price, number, usd} (or {price, number, eur}) if ordered by {deadline, date, long}',
                    intl: {
                        formats: {
                            number: {
                                eur: { style: 'currency', currency: 'EUR' },
                                usd: { style: 'currency', currency: 'USD' }
                            }
                        }
                    },
                    PRODUCT: 'oranges',
                    PRICE: 40000.004,
                    DEADLINE: timeStamp,
                    TZ: 'UTC'
                },
                expected = "oranges cost $40,000.00 (or €40,000.00) if ordered by January 23, 2014";
            Dust.renderSource(tmpl, ctx, function(err, out) {
                expect(out).to.equal(expected);
            });
        });
    });
});


