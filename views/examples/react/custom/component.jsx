var IntlMixin         = ReactIntl.IntlMixin;
var FormattedNumber   = ReactIntl.FormattedNumber;
var FormattedDate     = ReactIntl.FormattedDate;
var FormattedTime     = ReactIntl.FormattedTime;
var FormattedRelative = ReactIntl.FormattedRelative;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var yesterday = Date.now() - (1000 * 60 * 60 * 24);

        return (
            <ul>
                <li><FormattedNumber value={1400.34} format="USD" /></li>
                <li><FormattedDate value={1390518044403} format="short" /></li>
                <li><FormattedTime value={new Date()} format="hhmm" /></li>
                <li><FormattedRelative value={yesterday} format="hours" /></li>
            </ul>
        );
    }
});
