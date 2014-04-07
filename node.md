## Internationationalization with Node.js

Node.js lets developers write their server-side code in JavaScript, which makes it easier to share the same code on both the browser and the server. In our case, we don't have to write our internationalization code twice, in two different programming languages, if we're using JavaScript on both ends.

Instead, our goal is to write it once and use for two purposes:

* On the server - when initially rendering our templates, we should be able to localize the templates, so that our users receive the localized HTML as soon as the page loads.

* On the browser - once our users start transitioning from page to page, the same localization code should be usable when using a client-side templating engine like Handlebars or Dust.

By doing this, we save developers from having to handle internationalization twice, and make sure that all updates to one end will also update the other. We get the performance benefits of initial server-rendering as well as the richer UI experience of client-rendering.

### IntlMessageFormat

Our [intl-messageformat](https://github.com/yahoo/intl-messageformat) library builds on top of the [Intl.js](https://github.com/andyearnshaw/Intl.js/) polyfill by [Andy Earnshaw](https://github.com/andyearnshaw). The goal of it is to provide a implementation of a proposed standard by the JavaScript community on an API that provides localized message formatting for features such as gender, plurals, and other user-defined values.

