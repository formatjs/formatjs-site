/* global React */

export default {
    propTypes: {
        example: React.PropTypes.shape({
            id  : React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,

            source: React.PropTypes.shape({
                template : React.PropTypes.string,
                context  : React.PropTypes.string,
                component: React.PropTypes.string
            }),

            getComponent: React.PropTypes.func
        }),

        intl: React.PropTypes.shape({
            availableLocales: React.PropTypes.array.isRequired,

            locales : React.PropTypes.array.isRequired,
            messages: React.PropTypes.object.isRequired
        })
    },

    getInitialState: function () {
        return {
            currentLocale: this.props.intl.locales[0]
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

    generateIntlDataCode: function () {
        return [
            'var intlData = {',
            '    locales : \'' + this.state.currentLocale + '\',',
            '    formats : {…},',
            '    messages: {…}',
            '};'
        ].join('\n');
    }
};
