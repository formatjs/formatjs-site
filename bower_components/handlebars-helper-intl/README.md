handlebars-helper-intl
======================

Handlebars helpers for internationalization.

[![Build Status](https://travis-ci.org/yahoo/handlebars-helper-intl.png)](https://travis-ci.org/yahoo/handlebars-helper-intl)


## Installation


### Browser

1. Install with [bower](http://bower.io/): `bower install handlebars-helper-intl`
2. Load the scripts into your page. (It does not matter which order the scripts are loaded in.)

    ```html
    <script src="handlebars.js"></script>
    <script src="handlebars-helper-intl.js"></script>
    ```

3. Register the helpers:

    ```javascript
    HandlebarsHelperIntl.register(Handlebars);
    ```


### Node/CommonJS

1. You can install the helpers with npm: `npm install handlebars-helper-intl`
2. Load in the module and register it:

    ```javascript
    var Handlebars = require('handlebars');
    global.Intl = require('intl');
    require('handlebars-helper-intl').register(Handlebars);
    ```

    **NOTE:**  Since node (as of 0.10) doesn't provide the global `Intl` object
    (ECMA-402) you'll need to provide a polyfill.  The `intl` NPM package can
    provide this or you can use another.


### AMD

1. Install with [bower](http://bower.io/): `bower install handlebars-form-helpers`
3. Load in the module and register it:

    ```javascript
    define(['handlebars', 'handlebars-helper-intl'], function(Handlebars, HandlebarsHelperIntl) {
        HandlebarsHelperIntl.register(Handlebars);
    });
    ```

(Thanks to the `handlebars-form-helpers` package for figuring out how to register helpers in multiple environments.)


## Usage

TODO


