var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var message = this.getIntlMessage('photos');

        return (
            <p>
                {this.formatMessage(message, {
                    name     : 'Annie',
                    numPhotos: 1000,
                    takenDate: Date.now()
                })}
            </p>
        );
    }
});
