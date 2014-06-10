## Quickstart for Internationalization in Node

For application developers, it's recommended to use the
helpers for the template engine of your choice,
rather than using `intl-messageformat` directly.

For this quickstart example, we'll be using the
[helpers](https://www.npmjs.org/package/handlebars-helper-intl) for the
[Handlebars](http://handlebarsjs.com) template engine,
though we also have
[helpers](https://www.npmjs.org/package/dust-helper-intl) available if you're using [Dust](http://akdubya.github.io/dustjs/) templates too.

We'll also be using the Express web framework to render out our
internationalized content, though you can also use any framework of
your choice.

### Installation

Go into a new directory and install Express, the Intl polyfill, Handlebars, Express Handlebars, and the Handlebars helpers from `npm` using:

```
npm install express intl handlebars express3-handlebars handlebars-helper-intl
```

### Building your application

Let's create a simple Express application in our directory by creating a file
called `server.js`. We can start setting up the helpers like this:

```js
// Use native Intl object if possible - otherwise, use the polyfill
global.Intl = global.Intl || require('intl');
global.IntlMessageFormat = require('intl-messageformat')

var Handlebars = require('handlebars'),
    hbsIntl    = require('handlebars-helper-intl');

// Register the Handlebars helpers with the Handlebars object
hbsIntl.registerWith(Handlebars);
```

Now, let's set up our Express application:

```js
var express = require('express'),
    exphbs  = require('express3-handlebars'),

// Core Node modules to be used later
var fs   = require('fs'),
    path = require('path');

// Set up our Express app
var app = express();

// Set up our Handlebars engine with a default layout
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    handlebars   : Handlebars
}));
```

Now that we have the core of our application set up, we can start
creating the content that we want to be translated. Create a new
folder called `i18n` in the current directory:

```
$ mkdir i18n && cd i18n
```

In here, we'll keep all of our translated strings as JSON objects.
To start off, we'll create our first translation strings in US English,
in a file called `en-US.json`:

```json
{
  TITLE: "Your Personal Bookstore"
  USER_HAS_BOOKS: "{firstName} {lastName} has {numBooks, number, integer} {numBooks, plural, one {book} other {books}}.",
  USER_WILL_SELL: "{firstName} will sell them for {price, number, USD} on {dateBooks, date, long}."
}
```

And similarly, the exact same thing in French, in a file called `fr-CA.json`:

```json
{
  TITLE: "Votre Librarie Personnelle"
  USER_HAS_BOOKS: "{firstName} {lastName} a {numBooks, number, integer} {numBooks, plural, one {livre} other {livres}}.",
  USER_WILL_SELL: "{firstName} les vendra à {price, number, USD} le {dateBooks, date, long}."
}
```

Notice how the internationalized message format is handled for the special cases, such as numbers, currency, and dates.

Now, let's start using these strings inside of our templates.
Go back into the parent directory and create a directory for our templates:

```
$ cd ..
$ mkdir views && cd views
$ mkdir layouts && cd layouts
```

For our app, we can just create a simple layout to wrap around our main content.
Create a file called `main.handlebars`:

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

  {{#intl locales=intl.locale messages=intl.messages}}
    <title>{{intlMessage (intlGet "messages.TITLE")}}</title>
  {{/intl}}
</head>

<body>
    {{{body}}}
</body>
<html>
```

Inside the `{{#intl}}` block is where we're setting the context for our locale
and our messages, which we'll later pass through when we render this template
with Express.

Notice how we're using the subexpression `intlGet` in order to fetch the `TITLE`
that we have in our translated strings.

Next, we'll set up our main content. Go back up one folder:

```
$ cd ..
```

And create a file called
