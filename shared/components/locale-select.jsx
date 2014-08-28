/** @jsx React.DOM */
/* global React */

export default React.createClass({
    displayName: 'LocaleSelect',

    handleChange: function (e) {
        this.props.onLocaleChange(e.target.value);
    },

    render: function () {
        return (
            <select className="locale-select"
                value={this.props.currentLocale}
                onChange={this.handleChange}>

                {this.props.availableLocales.map(function (locale) {
                    return <option key={locale} value={locale}>{locale}</option>;
                })}
            </select>
        );
    }
});
