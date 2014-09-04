/** @jsx React.DOM */
/* global React */

export default React.createClass({
    displayName: 'LocaleSelect',

    handleChange: function (e) {
        this.props.onLocaleChange(e.target.value);
    },

    render: function () {
        var currentLocale = this.props.currentLocale;

        if (Array.isArray(currentLocale)) {
            currentLocale = currentLocale[0];
        }

        return (
            <select className="locale-select"
                value={currentLocale}
                onChange={this.handleChange}>

                {this.props.availableLocales.map(function (locale) {
                    return <option key={locale} value={locale}>{locale}</option>;
                })}
            </select>
        );
    }
});
