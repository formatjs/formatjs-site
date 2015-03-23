/* global React */

export {Tabs, Tab};

var Tabs = React.createClass({
    displayName: 'Tabs',

    getInitialState: function () {
        var selectedIndex;

        React.Children.forEach(this.props.children, (tab, index) => {
            if (tab.props.selected) {
                selectedIndex = index;
            }
        });

        return {
            selectedIndex: selectedIndex || 0
        };
    },

    getTabPanels: function (tabs) {
        return React.Children.map(tabs, (tab, index) => {
            return React.cloneElement(tab, {
                selected: index === this.state.selectedIndex
            });
        });
    },

    getTabListItems: function (tabs) {
        return React.Children.map(tabs, (tab, index) => {
            var isSelected = index === this.state.selectedIndex;
            var className  = 'tabs-tab' + (isSelected ? ' is-selected' : '');

            return (
                <li role="tab"
                    className={className}
                    id={tab.props.id + "-tab"}
                    aria-controls={tab.props.id}
                    aria-selected={isSelected}>

                    {tab.props.label}
                </li>
            );
        });
    },

    handleTabClick: function (e) {
        var controlsId;
        var index;

        if (e.target.getAttribute('role') === 'tab') {
            controlsId = e.target.getAttribute('aria-controls');

            index = this.props.children.findIndex((tab) => {
                return tab.props.id === controlsId;
            });

            if (index !== this.state.selectedIndex) {
                this.setState({
                    selectedIndex: index
                });
            }
        }
    },

    render: function () {
        return (
            <div className="tabs">
                <menu role="tablist"
                    className="tabs-tablist"
                    onClick={this.handleTabClick}>

                    {this.getTabListItems(this.props.children)}
                </menu>

                {this.getTabPanels(this.props.children)}
            </div>
        );
    }
});

var Tab = React.createClass({
    displayName: 'Tab',

    propTypes: {
        id      : React.PropTypes.string.isRequired,
        label   : React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function () {
        return {
            selected: false
        };
    },

    render: function () {
        return (
            <div role="tabpanel"
                className="tabs-tabpanel"
                id={this.props.id}
                aria-labeledby={this.props.id + "-tab"}
                hidden={!this.props.selected}>

                {this.props.children}
            </div>
        );
    }
});
