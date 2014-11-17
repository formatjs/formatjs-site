var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlDate = ReactIntl.Date;

        return (
            <p>
                <IntlDate day="numeric" month="long" year="numeric">
                    {new Date()}
                </IntlDate>
            </p>
        );
    }
});
