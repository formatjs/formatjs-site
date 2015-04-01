/* global React */

import HandlebarsExample from './handlebars-example';
import ReactExample from './react-example';
import DustExample from './dust-example';
import EmberExample from './ember-example';

var INTEGRATION_COMPONENTS = {
    handlebars: HandlebarsExample,
    react     : ReactExample,
    dust      : DustExample,
    ember     : EmberExample
};

export default React.createClass({
    displayName: 'ExampleContainer',

    propTypes: {
        example: React.PropTypes.shape({
            id  : React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            meta: React.PropTypes.object.isRequired,

            type: React.PropTypes.oneOf(
                Object.keys(INTEGRATION_COMPONENTS)
            ).isRequired,

            source: React.PropTypes.shape({
                template : React.PropTypes.string,
                context  : React.PropTypes.string,
                component: React.PropTypes.string
            }).isRequired,

            // Optional.
            getComponent: React.PropTypes.func
        }).isRequired,

        intl: React.PropTypes.shape({
            availableLocales: React.PropTypes.array.isRequired,

            locales : React.PropTypes.array.isRequired,
            messages: React.PropTypes.object.isRequired
        }).isRequired
    },

    getInitialState: function () {
        var intl             = this.props.intl;
        var preferredLocale  = intl.locales[0];
        var availableLocales = this.props.intl.availableLocales;
        var messageId        = this.props.example.meta.messageId;

        // For examples that use messages, limit `availableLocales` to those for
        // which there are translations.
        if (messageId) {
            availableLocales = availableLocales.filter(function (locale) {
                return intl.messages[locale].hasOwnProperty(messageId);
            });
        }

        // Make sure the user's preferredLocale in available, otherwise default
        // to "en-US".
        var currentLocale = availableLocales.find(function (locale) {
            return locale === preferredLocale;
        });

        return {
            currentLocale   : currentLocale || 'en-US',
            availableLocales: availableLocales
        };
    },

    evalContext: function (contextSource) {
        if (contextSource) {
            // Why? Oh! Why!?
            // Ah yes, because we're normalizing template engines
            /*jslint evil: true*/
            return (new Function(contextSource + '\nreturn context;'))();
            /*jslint evil: false*/
        }

        return {};
    },

    generateIntlData: function () {
        var currentLocale = this.state.currentLocale;
        var formats       = this.props.example.meta.formats;
        var messages      = this.props.intl.messages[currentLocale];
        var messageId     = this.props.example.meta.messageId;
        var message       = messages[messageId];

        if (message) {
            messages = {};
            messages[messageId] = message;
        } else {
            messages = null;
        }

        var intlData = {
            locales: currentLocale
        };

        if (messages) { intlData.messages = messages; }
        if (formats)  { intlData.formats  = formats; }

        return intlData;
    },

    updateLocale: function (newLocale) {
        this.setState({currentLocale: newLocale});
    },

    render: function () {
        var props = this.props;
        var state = this.state;

        var example          = props.example;
        var ExampleComponent = INTEGRATION_COMPONENTS[example.type];

        var source = Object.assign({}, example.source, {
            intlData: JSON.stringify(this.generateIntlData(), null, 4)
        });

        var messages = props.intl.messages[state.currentLocale];

        return (
            <ExampleComponent
                id={example.id}
                component={example.source.component && example.getComponent()}
                source={source}
                context={this.evalContext(source.context)}
                message={messages[example.meta.messageId]}
                formats={example.meta.formats}
                messages={messages}
                currentLocale={state.currentLocale}
                availableLocales={state.availableLocales}
                onLocaleChange={this.updateLocale} />
        );
    }
});
