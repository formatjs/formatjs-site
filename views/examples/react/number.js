React.createClass({
    mixins: [ReactIntlMixin],
    render: function () {
        return React.DOM.p(null, this.intlNumber(4000));
    }
});
