/**
 * Work Orders tab – header button + content. Load after React & FluentUI.
 * Registers: window.PlantDashboardTabs.workordersHeader, window.PlantDashboardTabs.workorders
 */
(function () {
    var React = window.React;
    var FluentUI = window.FluentUIReact || window.FluentUI;
    if (!React || !FluentUI) return;
    var DetailsList = FluentUI.DetailsList;
    var DetailsListLayoutMode = FluentUI.DetailsListLayoutMode;
    var SelectionMode = FluentUI.SelectionMode;
    var DefaultButton = FluentUI.DefaultButton;
    var Icon = FluentUI.Icon;

    window.PlantDashboardTabs = window.PlantDashboardTabs || {};

    window.PlantDashboardTabs.workordersHeader = function (props) {
        var setFilterText = props.setFilterText;
        return React.createElement(
            'div',
            { className: 'pb-2 md:pb-0' },
            React.createElement(DefaultButton, {
                text: 'View all work orders',
                iconProps: { iconName: 'FabricFolder' },
                onClick: function () { return setFilterText(''); }
            })
        );
    };

    window.PlantDashboardTabs.workorders = function (props) {
        var filteredTasks = props.filteredTasks || [];
        var columns = props.columns || [];
        var MobileTaskCard = props.MobileTaskCard;
        return React.createElement(
            'div',
            { className: 'h-full' },
            React.createElement(
                'div',
                { 'data-testid': 'work-orders-list', className: 'hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden' },
                React.createElement(DetailsList, {
                    items: filteredTasks,
                    columns: columns,
                    setKey: 'set',
                    layoutMode: DetailsListLayoutMode.justified,
                    selectionMode: SelectionMode.none
                })
            ),
            React.createElement(
                'div',
                { className: 'md:hidden' },
                filteredTasks.map(function (task) {
                    return React.createElement(MobileTaskCard, { key: task.id, task: task });
                })
            )
        );
    };
})();
