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

            context     : React.PropTypes.object,
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
