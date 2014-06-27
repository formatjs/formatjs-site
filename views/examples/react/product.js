React.createClass({
    mixins: [ReactIntlMixin],
    getMyMessage: function () {
        return '{product} will cost {price, number} if ordered by {deadline, date}';
    },
    render: function () {
        return React.DOM.div(null,
            React.DOM.p(null, this.intlDate(new Date())),
            React.DOM.p(null, this.intlNumber(600)),
            React.DOM.p(null, this.intlMessage(this.getMyMessage(), {
                product: 'Mac Mini',
                price: 2000.0015,
                deadline: 1390518044403
            }))
        );
    }
});
