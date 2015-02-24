FormatJS
========

[![Build Status](http://img.shields.io/travis/yahoo/formatjs-site.svg?style=flat-square)](https://travis-ci.org/yahoo/formatjs-site)
[![Dependency Status](http://img.shields.io/gemnasium/yahoo/formatjs-site.svg?style=flat-square)](https://gemnasium.com/yahoo/formatjs-site)

Website for Yahoo's JavaScript internationalization suite.

Running Locally
---------------

This is a Node.js app which uses Express.

```
$ npm install
$ npm start
```

To run the health checks:

```
$ grunt health.check
```

By default, it will run the tests using the local instance (running on port 5000)
But you can also specify a remote host:

```
$ grunt health.check --host=foo
```

To run the functional tests, you must first install `grunt-casper` manually:

```
$ npm install grunt-casper@"^0.4.2"
```

The `grunt-casper` package was removed from the list of dev dependencies because
it adds 150MB to the install, which slows down the pace of development,
especially if you don't need to run the functional tests. Because of this,
grunt will complain every time you invoke it, but you can disregard the warning
message it outputs.

To run, the functional tests, simply execute the `functional.tests` grunt task:

```
$ grunt functional.tests
```

Likewise, it will run the tests using the local instance (running on port 5000)
Again, you can also specify a remote host:

```
$ grunt functional.tests --host=foo
```

License
-------

This software is free to use under the Yahoo Inc. BSD license. See the [LICENSE file](LICENSE.md) for license text and copyright information.
