var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        return (
            <p>
                {this.formatDate(new Date(), {
                    day  : 'numeric',
                    month: 'long',
                    year : 'numeric'
                })}
            </p>
        );
    }
});
