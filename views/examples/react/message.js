React.createClass({
    mixins: [ReactIntlMixin],
    render: function () {
        console.log(this.props);
        return React.DOM.p(null, "A: ", this.intlMessage('{employee} reports to {manager}.', this.props));
    }
});
