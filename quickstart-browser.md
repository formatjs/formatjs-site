## Quickstart for Internationalization in the browser

For application developers, it's recommended to use the helpers for the template engine of your choice, rather than using `intl-messageformat` directly.

For this quickstart example, we'll be using the [helpers](https://www.npmjs.org/package/handlebars-helper-intl) for the [Handlebars](http://handlebarsjs.com) template engine, though we also have [helpers](https://www.npmjs.org/package/dust-helper-intl) available if you're using [Dust](http://akdubya.github.io/dustjs/) templates too.

### Installation

Install from Bower using:

```
bower install handlebars-helper-intl
```

Bower should download the `handlebars-helper-intl`, the `intl-messageformat`, and the `handlebars` libraries into your application's `./app/bower_components` folder. If you need to support older browsers, you can also install the Intl.js polyfill using:

```
bower install intl
```

Then, load these components into your page:

```html
<!-- Optional libraries, if older browser support required for Intl -->
<script src="./app/bower_components/intl/Intl.min.js"></script>

<!-- Required libraries -->

<!-- IntlMessageFormat library with the English language pack -->
<script src="./app/bower_components/intl-messageformat/build/intl-messageformat.en.min.js"></script>

<!-- IntlMessageFormat language pack for the French locale -->
<script src="./app/bower_components/intl-messageformat/locale-data/fr.js"></script>

<script src="./app/bower_components/handlebars/handlebars.js"></script>
<script src="./app/bower_components/handlebars-helper-intl/build/helpers.min.js"></script>
```

Now, inside of your Handlebars templates, you should be able to use the Internationalization helpers like this:

```
{{#intl locales="fr-FR"}}
  <p>
    {{intlMessage "The number is: {num, number, integer}" num=2000}}
    
    3 + 1 = {{intlNumber 4}}
    
    Budget: {{intlNumber 40000 style="currency" currency="EUR"}}
    
    Good until {{intlDate "Thu Jan 23 2014 18:00:44 GMT-0500 (EST"}}
    
    {{intlMessage MSG firstName=firstName lastName=lastName}}
    
  </p>
{{/intl}}
```
Note that you must wrap the helpers you use with a context like this `{{#intl}}{{/intl}}`.
