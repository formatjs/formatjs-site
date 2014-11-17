var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlDate = ReactIntl.Date;

        return (
            <p>
                <IntlDate format="short">{new Date()}</IntlDate>
            </p>
        );
    }
});
