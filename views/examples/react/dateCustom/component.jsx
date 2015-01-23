var IntlMixin     = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        return (
            <p>
                <FormattedDate value={new Date()} format="short" />
            </p>
        );
    }
});
