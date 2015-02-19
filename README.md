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

To run the functional tests:

```
$ grunt functional.tests
```

By default, it will run the tests using the local instance (running on port 5000)
But you can also specify a remote host:

```
$ grunt functional.tests --host=foo
```

License
-------

This software is free to use under the Yahoo Inc. BSD license. See the [LICENSE file](LICENSE.md) for license text and copyright information.
