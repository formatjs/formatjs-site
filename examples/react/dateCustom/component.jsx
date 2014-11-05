var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        return (
            <p>
                {this.formatDate(new Date(), 'short')}
            </p>
        );
    }
});
