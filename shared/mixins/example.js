/* global React */

export default {
    propTypes: {
        example: React.PropTypes.object,
        intl   : React.PropTypes.object
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
            "var intlData = {",
            "    locales : '" + this.state.currentLocale + "'",
            "    messages: {…}",
            "};"
        ].join('\n');
    }
};
