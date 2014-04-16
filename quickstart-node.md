## Quickstart for Internationalization in Node

For application developers, it's recommended to use the helpers for the template engine of your choice, rather than using `intl-messageformat` directly.

For this quickstart example, we'll be using the helpers for the Handlebars template engine, though we also have helpers available if you're using Dust templates too.

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

