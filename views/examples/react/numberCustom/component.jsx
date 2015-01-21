var IntlMixin       = ReactIntl.IntlMixin;
var FormattedNumber = ReactIntl.FormattedNumber;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        return (
            <ul>
                <li><FormattedNumber value={42000} /></li>
                <li><FormattedNumber value={0.9} format="percentage" /></li>
                <li><FormattedNumber value={99.95} format="USD" /></li>
            </ul>
        );
    }
});
