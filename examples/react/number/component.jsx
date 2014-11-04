var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        return (
            <ul>
                <li>{this.formatNumber(42000)}</li>
                <li>{this.formatNumber(0.9, {style: 'percent'})}</li>
                <li>
                    {this.formatNumber(100.95, {
                        style   : 'currency',
                        currency: 'USD'
                    })}
                </li>
            </ul>
        );
    }
});
