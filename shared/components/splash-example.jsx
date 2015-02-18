/* global React, ReactIntl */

import LocaleSelect from './locale-select';

var {
    FormattedMessage,
    FormattedRelative
} = ReactIntl;

export default React.createClass({
    displayName: 'SplashExample',

    getInitialState: function () {
        var locales = this.props.locales;

        return {
            currentLocale   : Array.isArray(locales) ? locales[0] : locales,
            currentNumPhotos: this.props.numPhotos
        };
    },

    componentDidMount: function () {
        this.renderIntervalId = setInterval(this.forceUpdate.bind(this), 1000);
    },

    componentWillUnmount: function () {
        if (this.this.renderIntervalId) {
            clearInterval(this.renderIntervalId);
        }
    },

    updateLocale: function (newLocale) {
        this.setState({currentLocale: newLocale});
    },

    handleNumPhotosChange: function (e) {
        this.setState({currentNumPhotos: parseInt(e.target.value, 10)});
    },

    render: function () {
        var currentLocale = this.state.currentLocale;
        var photosMessage = this.props.messages[currentLocale].photosNested;

        var numPhotosOptions = this.props.availableNumPhotos.map(function (num) {
            return <option key={num} value={num}>{num}</option>;
        });

        return (
            <div className="splash-example">
                <h2 className="splash-example-heading">Example</h2>

                <div className="splash-example-output">
                    <FormattedMessage
                        message={photosMessage}
                        key={Date.now()}
                        locales={currentLocale}
                        name={this.props.name}
                        numPhotos={this.state.currentNumPhotos}
                        takenAgo={
                            <FormattedRelative value={this.props.takenDate} />
                        } />
                </div>

                <form className="splash-example-controls">
                    <label className="splash-example-control">
                        <span className="splash-example-label">
                            # Photos:
                        </span>

                        <select
                            value={this.state.currentNumPhotos}
                            onChange={this.handleNumPhotosChange}>

                            {numPhotosOptions}
                        </select>
                    </label>

                    <label className="splash-example-control">
                        <span className="splash-example-label">
                            Locale:
                        </span>

                        <LocaleSelect
                            availableLocales={this.props.availableLocales}
                            value={currentLocale}
                            onChange={this.updateLocale} />
                    </label>
                </form>
            </div>
        );
    }
});
