/** @jsx React.DOM */
/* global React */

export default React.createClass({
    displayName: 'LocaleSelect',

    propTypes: {
        availableLocales: React.PropTypes.array.isRequired,

        value   : React.PropTypes.string,
        onChange: React.PropTypes.func,

        valueLink: React.PropTypes.shape({
            value        : React.PropTypes.string.isRequired,
            requestChange: React.PropTypes.func.isRequired
        })
    },

    getValueLink: function (props) {
        return props.valueLink || {
            value        : props.value,
            requestChange: props.onChange
        };
    },

    handleChange: function (e) {
        this.getValueLink(this.props).requestChange(e.target.value);
    },

    render: function () {
        var value = this.getValueLink(this.props).value;

        return (
            <select className="locale-select"
                value={value}
                onChange={this.handleChange}>

                {this.props.availableLocales.map(function (locale) {
                    return <option key={locale} value={locale}>{locale}</option>;
                })}
            </select>
        );
    }
});
