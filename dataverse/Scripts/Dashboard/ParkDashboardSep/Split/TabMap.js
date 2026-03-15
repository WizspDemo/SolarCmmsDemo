/**
 * Map (Sector Heatmap) tab. Registers: window.PlantDashboardTabs.map
 */
(function () {
    var React = window.React;
    var FluentUI = window.FluentUIReact || window.FluentUI;
    if (!React || !FluentUI) return;
    var Icon = FluentUI.Icon;
    var Text = FluentUI.Text;

    window.PlantDashboardTabs = window.PlantDashboardTabs || {};

    window.PlantDashboardTabs.map = function (props) {
        var plotData = props.plotData || [];
        var gridContainerClass = props.gridContainerClass || 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2';
        var plotCellBaseClass = props.plotCellBaseClass || 'rounded-lg p-3 flex flex-col items-center justify-center min-h-[64px] transition-all cursor-pointer';

        return React.createElement(
            'div',
            { className: 'h-full flex flex-col' },
            React.createElement('div', { className: 'mb-4' },
                React.createElement(Text, { variant: 'large', className: 'font-bold text-slate-700' }, 'Sector Heatmap'),
                React.createElement(Text, { variant: 'small', className: 'text-gray-500 block' }, 'Visual distribution of open defects.')
            ),
            React.createElement(
                'div',
                { className: gridContainerClass },
                plotData.map(function (plot) {
                    var bgColor = 'bg-emerald-500 hover:bg-emerald-600 text-white';
                    if (plot.hasWarning) bgColor = 'bg-amber-400 hover:bg-amber-500 text-slate-800';
                    if (plot.hasCritical) bgColor = 'bg-red-600 hover:bg-red-700 text-white';
                    return React.createElement(
                        'div',
                        {
                            key: plot.id,
                            'data-testid': 'plot-cell-' + plot.id,
                            className: plotCellBaseClass + ' ' + bgColor
                        },
                        React.createElement('span', { className: 'font-mono font-bold text-lg' }, plot.id),
                        React.createElement(
                            'div',
                            { className: 'flex flex-col items-center' },
                            plot.taskCount > 0
                                ? React.createElement('span', { className: 'text-xs bg-white/30 px-2 rounded-full mt-1 font-semibold' }, plot.taskCount + ' Issues')
                                : React.createElement(Icon, { iconName: 'CheckMark', className: 'mt-1' })
                        )
                    );
                })
            )
        );
    };
})();
