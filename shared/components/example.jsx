/* global React */

import LocaleSelect from './locale-select';

export default React.createClass({
    displayName: 'Example',

    propTypes: {
        id: React.PropTypes.string.isRequired,

        currentLocale   : React.PropTypes.string.isRequired,
        availableLocales: React.PropTypes.array.isRequired,
        onLocaleChange  : React.PropTypes.func.isRequired,

        source: React.PropTypes.element.isRequired,
        output: React.PropTypes.element.isRequired,
    },

    render: function () {
        var props = this.props;

        return (
            <div id={props.id} className="example">
                <div className="example-source">
                    {props.source}
                </div>

                <div className="example-output">
                    <h4 className="example-output-heading">Rendered</h4>

                    {props.output}

                    <div className="example-output-controls">
                        <label>
                            <span className="example-label">Locale:</span>
                            <LocaleSelect
                                availableLocales={props.availableLocales}
                                value={props.currentLocale}
                                onChange={props.onLocaleChange} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
});
