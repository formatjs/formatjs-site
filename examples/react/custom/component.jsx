/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],
    getDefaultProps: function () {
        return {
            formats: {
                date: {
                    timeStyle: {
                        hour: 'numeric',
                        minute: 'numeric'
                    }
                },
                number: {
                    percentStyle: {
                        style: 'percent'
                    }
                }
            }
        };
    },

    render: function () {
        return (
            <div>
                <p>A: {this.formatDate(1390518044403, 'timeStyle')}</p>
                <p>B: {this.formatNumber(400, 'percentStyle')}</p>
            </div>
        );
    }
});
