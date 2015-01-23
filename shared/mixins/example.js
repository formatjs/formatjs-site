/* global React */

export default {
    propTypes: {
        example: React.PropTypes.shape({
            id  : React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
            meta: React.PropTypes.object.isRequired,

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
            availableLocales =
                availableLocales.reduce(function (locales, locale) {
                    if (intl.messages[locale].hasOwnProperty(messageId)) {
                        locales.push(locale);
                    }

                    return locales;
                }, []);
        }

        // Make sure the user's preferredLocale in available, otherwise default
        // to "en-US".
        var currentLocale = availableLocales.find(function (locale) {
            return locale === preferredLocale;
        }) || 'en-US';

        return {
            currentLocale   : currentLocale,
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

    updateLocale: function (newLocale) {
        this.setState({currentLocale: newLocale});
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
    }
};
