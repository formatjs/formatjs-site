/* global React, Ember */

export default React.createClass({
    displayName: 'EmberOutput',

    propTypes: {
        source: React.PropTypes.string.isRequired,
        context: React.PropTypes.object.isRequired
    },

    injectMessages: function (locale, messages) {
        var container  = this.app.__container__;
        var lookupName = locale.toLowerCase();
        var Locale = container.lookupFactory('ember-intl@model:locale');

        if (container.has('locale:' + lookupName)) {
            container.unregister('locale:' + lookupName);
        }

        container.register('locale:' + lookupName, Locale.extend({
            locale:   locale,
            messages: messages
        }));
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.source !== this.props.source) {
            this.setState({});
        }

        var locale = nextProps.locales;

        if (typeof locale === 'string') {
            this.injectMessages(locale, nextProps.messages);
            this.app.intl.set('locales', Ember.makeArray(locale));
        }

        this.controller.setProperties(nextProps);
    },

    componentWillUnmount: function () {
        var app = this.app;

        if (!app.isDestroying && !app.isDestroyed) {
            app.destroy();
        }
    },

    componentDidMount: function () {
        var domElement = this.refs.placeholder.getDOMNode();
        var locales    = Ember.makeArray(this.props.locales);

        this.app = Ember.Application.extend().create({
            rootElement: domElement,
            ready: function () {
                this.intl.setProperties({
                    locales:        locales,
                    defaultLocale:  'en-US'
                });
            }
        });

        // this initializer is specific to the formatjs.io.  This is not something
        // any consumer of ember-intl will need to do.  It's providing some of the glue
        // between (Ember + ember-intl) and React
        this.app.initializer({
            name : this.props.exampleId,
            after: 'ember-intl-standalone',

            initialize: function (container, app) {
                this.controller = container.lookupFactory('controller:basic').create(this.props.context);

                this.injectMessages(this.props.locales, this.props.messages);

                Ember.View.create({
                    template  : Ember.Handlebars.compile(this.props.source),
                    context   : this.controller,
                    container : container
                }).appendTo(domElement)
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div ref="placeholder" className="handlebars-output" />
        );
    }
});
