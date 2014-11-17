var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlNumber = ReactIntl.Number;

        return (
            <ul>
                <li><IntlNumber>{42000}</IntlNumber></li>
                <li><IntlNumber format="percentage">{0.9}</IntlNumber></li>
                <li><IntlNumber format="USD">{100.95}</IntlNumber></li>
            </ul>
        );
    }
});
