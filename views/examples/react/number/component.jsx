var IntlMixin       = ReactIntl.IntlMixin;
var FormattedNumber = ReactIntl.FormattedNumber;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        return (
            <ul>
                <li><FormattedNumber value={4200} /></li>
                <li><FormattedNumber value={0.9} style="percent" /></li>
                <li>
                    <FormattedNumber
                        value={99.95}
                        style="currency"
                        currency="USD" />
                </li>
            </ul>
        );
    }
});
