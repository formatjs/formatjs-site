var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlNumber   = ReactIntl.Number;
        var IntlDate     = ReactIntl.Date;
        var IntlTime     = ReactIntl.Time;
        var IntlRelative = ReactIntl.Relative;

        var yesterday = Date.now() - (1000 * 60 * 60 * 24);

        return (
            <ul>
                <li><IntlNumber format="USD">{1400.34}</IntlNumber></li>
                <li><IntlDate format="short">{1390518044403}</IntlDate></li>
                <li><IntlTime format="hhmm">{new Date()}</IntlTime></li>
                <li><IntlRelative format="hours">{yesterday}</IntlRelative></li>
            </ul>
        );
    }
});
