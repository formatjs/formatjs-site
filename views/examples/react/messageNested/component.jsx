var IntlMixin         = ReactIntl.IntlMixin;
var FormattedMessage  = ReactIntl.FormattedMessage;
var FormattedRelative = ReactIntl.FormattedRelative;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var takenDate = 1421881732917;

        return (
            <p>
                <FormattedMessage
                    message={this.getIntlMessage('photosNested')}
                    name={<b>Annie</b>}
                    numPhotos={1000}
                    takenAgo={
                        <time dateTime={new Date(takenDate)}>
                            <FormattedRelative value={takenDate} />
                        </time>
                    } />
            </p>
        );
    }
});
