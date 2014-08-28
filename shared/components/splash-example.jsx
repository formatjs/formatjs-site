/** @jsx React.DOM */
/* global React, ReactIntlMixin */

import LocaleSelect from './locale-select';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({
    displayName: 'SplashExample',
    mixins     : [ReactIntlMixin],

    componentDidMount: function () {
        // setInterval(function () {
        //     var nextNumPhotos;
        //
        //     switch(this.props.numPhotos) {
        //         case 0:
        //             nextNumPhotos = 1;
        //             break;
        //         case 1:
        //             nextNumPhotos = 1000;
        //             break;
        //         default:
        //             nextNumPhotos = 0;
        //             break;
        //     }
        //
        //     this.setProps({numPhotos: nextNumPhotos});
        // }.bind(this), 5000);
    },

    updateLocale: function (newLocale) {
        this.setProps({locales: newLocale});
    },

    render: function () {
        var photosMessage = this.getIntlMessage(this.props.locales + '.photos');

        return (
            <div className="splash-example">
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
                    <a className="splash-example-control" href="#">
                        About example
                    </a>

                    <label className="splash-example-control">
                        <span className="splash-example-label">
                            Locale:
                        </span>

                        <LocaleSelect
                            currentLocale={this.props.locales}
                            availableLocales={this.props.availableLocales}
                            onLocaleChange={this.updateLocale} />
                    </label>
                </form>
            </div>
        );
    }
});
