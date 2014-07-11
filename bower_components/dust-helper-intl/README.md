dust-helper-intl
================

Dust helpers for internationalization.

[![Build Status](https://travis-ci.org/yahoo/dust-helper-intl.png?branch=master)](https://travis-ci.org/yahoo/dust-helper-intl)


## Installation


### Browser

1. Install with [bower](http://bower.io/): `bower install dust-helper-intl`
2. Load the scripts into your page.

```html
<script src="intl-messageformat.js"></script>
<script src="dustjs-linkedin.js"></script>
<script src="dust-helper-intl.js"></script>
```

3. Register the helpers:

```javascript
DustHelperIntl.register(dust);
```


### Node/CommonJS

1. You can install the helpers with npm: `npm install dust-helper-intl`
2. Load in the module and register it:

```javascript
var Dust = require('dustjs-linkedin');
global.Intl = require('intl');
require('dust-helper-intl').register(Dust);
```

**NOTE:** Since node (as of 0.10) doesn't provide the global `Intl` object
(ECMA-402) you'll need to provide a polyfill. The `intl` NPM package can
provide this or you can use another.


### AMD

1. Install with [bower](http://bower.io/): `bower install dust-form-helpers`
3. Load in the module and register it:

```javascript
define(['dust', 'dust-helper-intl'], function(Dust, DustHelperIntl) {
    DustHelperIntl.register(Dust);
});
```


## Usage

### @intlDate
NOTE: We will use the following variables in the examples:

```js
var dateString = (new Date()).toString(); // 'Wed Mar 26 2014 15:18:48 GMT-0700 (PDT)'
var timeStamp = (new Date()).getTime();   // 1395872439650
```

####Convert from date string
Template:

```js
var tmpl = '<time>{@intlDate val="' + dateStr + '" /}</time>';
```

Output:

```html
<time>3/26/2014</time>
```

####Convert from timestamp
Template:

```js
var tmpl = '<time>{@intlDate val="' + timeStamp + '" /}</time>';
```

Output:

```html
<time>3/26/2014</time>
```

####Formatting the output
Template:

```js
var tmpl = '<time>{@intlDate val=' + dateStr + ' hour="numeric" minute="numeric" timeZone="UTC"/}</time>';
```

Output:

```html
<time>3:26 PM</time>
```

#####Configuration properties

| Property    | Allowed values                                   |
| ----------: | :----------------------------------------------- |
|      weekday| "narrow", "short", "long"                        |
|          era| "narrow", "short", "long"                        |
|         year| "2-digit", "numeric"                             |
|        month| "2-digit", "numeric", "narrow", "short", "long"  |
|          day| "2-digit", "numeric"                             |
|         hour| "2-digit", "numeric"                             |
|       minute| "2-digit", "numeric"                             |
|       second| "2-digit", "numeric"                             |
| timeZoneName| "short", "long"                                  |

[Source](https://github.com/andyearnshaw/Intl.js/blob/17ad3e99a821e5121cafaa117517ebd3ca4c0804/Intl.js#L2121).


### @intlNumber

####Basic (en-US)
Template:

```js
var tmpl = '<b>{@intlNumber val=40000.004 /}</b>';
```

Output:

```html
<b>40,000.004</b>
```

####Basic (de-DE)

Template:

```js
var tmpl = '<b>{@intlNumber val=40000.004 locales="de-DE"/}</b>';
```

Output:

```html
<b>40.000,004</b>
```

####Currency (USD)
Template:

```js
var tmpl = '<b>{@intlNumber val=40000 style="currency" currency=USD /}</b>';
```

Output:

```html
<b>$40,000</b>
```

####Currency (EUR)
Template:

```js
var tmpl = '<b>{@intlNumber val=40000 style="currency" currency=EUR /}</b>';
```

Output:

```html
<b>€40,000</b>
```

####Currency (JPY)

Template:

```js
var tmpl = '<b>{@intlNumber val=40000 style="currency" currency=JPY /}</b>';
```

Output:

```html
<b>¥40,000</b>
```

####Percentages (en-US)
Template:

```js
var tmpl = '<b>{@intlNumber val=400 style="percent" /}</b>';
```

Output:

```html
<b>40,000 %</b>
```

####Percentages (de-DE)
Template:

```js
var tmpl = '<b>{@intlNumber val=400 style="percent" locales="de-DE" /}</b>';
```

Output:

```html
<b>40.000 %</b>
```
### @intlMessage

NOTE: `var ctx` is the context passed into the dust template.

####Basic String using _msg
Template:

```js
var tmpl = '<p>{@intlMessage _msg=MSG firstName=firstName lastName=lastName /}</p>',
    ctx = {
        MSG: 'Hi, my name is {firstName} {lastName}.',
        firstName: 'Anthony',
        lastName: 'Pipkin'
    };
```

Output:

```html
<p>Hi, my name is Anthony Pipkin.</p>
```

####Basic String using _key
Template:

```js
var tmpl = '<p>{@intlMessage _key=KEY firstName=firstName lastName=lastName /}</p>',
    ctx = {
        intl: {
            messages: {
                KEY: 'Hi, my name is {firstName} {lastName}.',
            }
        },
        firstName: 'Anthony',
        lastName: 'Pipkin'
    };
```

Output:

```html
<p>Hi, my name is Anthony Pipkin.</p>
```

####Formatted String (en-US)
Template:

```js
var tmpl = '<p>{@intlMessage _msg=POP_MSG city=city population=population census_date=census_date timeZone=timeZone/}</p>',
    ctx = {
        POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, medium}.',
        city: 'Atlanta',
        population: 5475213,
        census_date: (new Date('1/1/2010')).getTime(),
        timeZone: 'UTC'
    };
```

Output:

```html
<p>Atlanta has a population of 5,475,213 as of Jan 1, 2010.</p>
```

####Formatted String (de-DE)
Template:

```js
var tmpl = '<p>{@intlMessage _msg=POP_MSG locales="de-DE" city=city population=population census_date=census_date timeZone=timeZone/}</p>',
    ctx = {
        POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, medium}.',
        city: 'Atlanta',
        population: 5475213,
        census_date: (new Date('1/1/2010')),
        timeZone: 'UTC'
    };
```

Output:

```html
<p>Atlanta has a population of 5.475.213 as of 1. Jan. 2010.</p>
```

####String plurals
Template:

```js
var tmpl = '<p>{@intlMessage _msg=HARVEST_MSG person=person count=count /}</p>',
    ctx = {
        HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
        person: 'Allison',
        count: 10
    };
```

Output:

```html
<p>Allison harvested 10 apples.</p>
```

Template:

```js
var tmpl = '<p>{@intlMessage _msg=HARVEST_MSG person=person count=count /}</p>',
    ctx = {
        HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
        person: 'Jeremy',
        count: 1
    };
```

Output:

```html
<p>Jeremy harvested 1 apple.</p>
```

## License

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/dust-helper-intl/blob/master/LICENSE
