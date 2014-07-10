React.createClass({
    mixins: [ReactIntlMixin],
    render: function () {
        return React.DOM.p(null, "A: ", this.intlDate(1390518044403, {
            hour: 'numeric',
            minute: 'numeric'
        }));
    }
});
