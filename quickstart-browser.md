## Quickstart for Internationalization in the browser

There are 3 progressively more helpful ways to use Internationalization in the browser.

---

The first way is directly including Intl.js if your browser does not already support Intl natively.
You should check to see if the `window.Intl` object exists, and if not, include the polyfill as below.

```
// check to see if window.Intl exists. If not, include the polyfill
if (!window.Intl) {
    var elem =  document.createElement("script");
    elem.setAttribute("src", "http://yui.yahooapis.com/ecmascript/intl/0.1.2/Intl.js");
    document.getElementsByTagName("head")[0].appendChild(elem);
}
```

You might then use it in your javascript, following the standard. For example:

```
function init(){
    // use Intl NumberFormat
    var nf = new Intl.NumberFormat(undefined, {style:'currency', currency:'GBP'});
    document.getElementById('price').textContent = nf.format(100);

}
```

For a full working example `index.html` file, visit this [gist](https://gist.github.com/triptych/11195256).

---

The second way to use Internationalization is via the `intl-messageformat` component.

You might install this component via bower:

```
bower install intl-messageformat
```
You would then need to include this in your `index.html`:

```
<script src="./app/bower_components/intl-messageformat/build/intl-messageformat.en.min.js"></script>

```

Then in your javascript you might create a message like this;

```
// initialize the message template
var msg = new IntlMessageFormat("My name is {NAME}.", "en-US");

// fill in the template with data
var myNameIs = msg.format({ name: "Ferris Wheeler"});

// insert the message into the DOM
document.getElementById("thename").innerText=myNameIs;
// "My name is Ferris Wheeler."

```


---

Thirdly, for application developers, it's recommended to use the helpers for the template engine of your choice, rather than using `intl-messageformat` directly.

For this quickstart example, we'll be using the [helpers](https://www.npmjs.org/package/handlebars-helper-intl) for the [Handlebars](http://handlebarsjs.com) template engine, though we also have [helpers](https://www.npmjs.org/package/dust-helper-intl) available if you're using [Dust](http://akdubya.github.io/dustjs/) templates too.

### Set Up
Make sure you have [Bower](http://bower.io/) (and git) installed.

```
npm install -g bower
```

Create a directory containing your project.

The following steps assume you create a static page `index.html` with a subdirectory called `app`.

### Installation

Install from Bower using:

```
cd app/

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

```html
{{#intl locales="fr-FR"}}
  <p>
    {{intlMessage "The number is: {num, number, integer}" num=2000}}

    <b>{{intlNumber 4}}</b>

    {{intlNumber 40000 style="currency" currency="EUR"}}

    {{intlDate "Thu Jan 23 2014 18:00:44 GMT-0500 (EST)"}}

    {{intlMessage MSG firstName=firstName lastName=lastName}}

  </p>
{{/intl}}
```
Note that you must wrap the helpers you use with a context like this `{{#intl}}{{/intl}}`.

This [gist](https://gist.github.com/triptych/11015232) contains a sample `index.html` based on the assumptions above.
