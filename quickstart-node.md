## Quickstart for Internationalization in Node

For application developers, it's recommended to use the helpers for the template engine of your choice, rather than using `intl-messageformat` directly.

For this quickstart example, we'll be using the [helpers](https://www.npmjs.org/package/handlebars-helper-intl) for the [Handlebars](http://handlebarsjs.com) template engine, though we also have [helpers](https://www.npmjs.org/package/dust-helper-intl) available if you're using [Dust](http://akdubya.github.io/dustjs/) templates too.

### Installation

Install the helpers and the Intl polyfill from `npm` using:

```
npm install handlebars-helper-intl intl
```

Then, inside your application, you can use the helpers like this:

```js
var Handlebars  = require('handlebars'),
    global.Intl = require('intl'),
    intlHelpers = require('handlebars-helper-intl');

intlHelpers.register(Handlebars);
```

