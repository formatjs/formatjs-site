/* global React, ReactIntlMixin */

import LocaleSelect from './locale-select';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({
    displayName: 'SplashExample',
    mixins     : [ReactIntlMixin],

    updateLocale: function (newLocale) {
        this.setProps({locales: newLocale});
    },

    handleNumPhotosChange: function (e) {
        this.setProps({numPhotos: parseInt(e.target.value, 10)});
    },

    render: function () {
        var locales       = this.props.locales,
            currentLocale = Array.isArray(locales) ? locales[0] : locales,
            photosMessage = this.getIntlMessage(currentLocale + '.photos');

        var numPhotosOptions = [0, 1, 1000].map(function (num) {
            return <option key={num} value={num}>{num}</option>;
        });

        return (
            <div className="splash-example">
                <h2 className="splash-example-heading">Example</h2>

                <div className="splash-example-output">
                    <ReactCSSTransitionGroup
                        transitionName="example-output"
                        transitionLeave={false}>

                        <span key={Date.now()}>
                            {this.formatMessage(photosMessage, this.props)}
                        </span>
                    </ReactCSSTransitionGroup>
                </div>

                <form className="splash-example-controls">
                    <label className="splash-example-control">
                        <span className="splash-example-label">
                            # Photos:
                        </span>

                        <select
                            value={this.props.numPhotos}
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
