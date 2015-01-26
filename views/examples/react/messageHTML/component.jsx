var IntlMixin            = ReactIntl.IntlMixin;
var FormattedHTMLMessage = ReactIntl.FormattedHTMLMessage;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        return (
            <p>
                <FormattedHTMLMessage
                    message={this.getIntlMessage('commentsHTML')}
                    numComments={42} />
            </p>
        );
    }
});
