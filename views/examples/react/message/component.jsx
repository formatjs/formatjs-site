var IntlMixin        = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        return (
            <p>
                <FormattedMessage
                    message={this.getIntlMessage('photos')}
                    name="Annie"
                    numPhotos={1000}
                    takenDate={Date.now()} />
            </p>
        );
    }
});
