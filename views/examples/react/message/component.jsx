var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlMessage = ReactIntl.Message;

        return (
            <p>
                <IntlMessage
                        name="Annie"
                        numPhotos={1000}
                        takenDate={Date.now()}>
                        
                    {this.getIntlMessage('photos')}
                </IntlMessage>
            </p>
        );
    }
});
