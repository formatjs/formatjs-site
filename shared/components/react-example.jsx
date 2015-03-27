/* global React */

import Example from './example';
import CodeBlock from './code-block';
import {Tabs, Tab} from './tabs';

export default React.createClass({
    displayName: 'ReactExample',

    propTypes: {
        id       : React.PropTypes.string.isRequired,
        component: React.PropTypes.func.isRequired,

        source: React.PropTypes.shape({
            component: React.PropTypes.string.isRequired,
            intlData : React.PropTypes.string.isRequired
        }).isRequired,

        message : React.PropTypes.string,
        formats : React.PropTypes.object,
        messages: React.PropTypes.object,

        currentLocale   : React.PropTypes.string.isRequired,
        availableLocales: React.PropTypes.array.isRequired,
        onLocaleChange  : React.PropTypes.func.isRequired,
    },

    render: function () {
        var props            = this.props;
        var ExampleComponent = props.component;

        var tabs = [
            <Tab label="Component" key="component" id={`${props.id}-component`}>
                <CodeBlock lang="javascript">
                    {props.source.component}
                </CodeBlock>
            </Tab>,

            <Tab label="Render" key="render" id={`${props.id}-render`}>
                <CodeBlock lang="javascript">
{`var intlData = ${props.source.intlData};

React.render(
    <Component {...intlData} />,
    document.getElementById('example')
);`}
                </CodeBlock>
            </Tab>
        ];

        // Insert a "Message" tab if the example uses an i18n message.
        if (props.message) {
            tabs.splice(1, 0,
                <Tab label="Message" key="message" id={`${props.id}-message`}>
                    <CodeBlock highlight={false}>
                        {props.message}
                    </CodeBlock>
                </Tab>
            );
        }

        return (
            <Example
                id={props.id}
                currentLocale={props.currentLocale}
                availableLocales={props.availableLocales}
                onLocaleChange={props.onLocaleChange}
                source={<Tabs>{tabs}</Tabs>}
                output={
                    <div className="react-output">
                        <ExampleComponent
                            locales={props.currentLocale}
                            formats={props.formats}
                            messages={props.messages} />
                    </div>
                } />
        );
    }
});
