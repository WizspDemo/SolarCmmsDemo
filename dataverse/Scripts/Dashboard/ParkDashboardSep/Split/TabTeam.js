/**
 * Team tab. Registers: window.PlantDashboardTabs.team
 */
(function () {
    var React = window.React;
    var FluentUI = window.FluentUIReact || window.FluentUI;
    if (!React || !FluentUI) return;
    var Text = FluentUI.Text;
    var Icon = FluentUI.Icon;
    var Persona = FluentUI.Persona;
    var PersonaSize = FluentUI.PersonaSize;
    var PersonaPresence = FluentUI.PersonaPresence;

    window.PlantDashboardTabs = window.PlantDashboardTabs || {};

    window.PlantDashboardTabs.team = function (props) {
        var team = props.team || [];
        var departments = [];
        var seen = {};
        team.forEach(function (m) {
            var dept = m.department || 'Operations';
            if (!seen[dept]) { seen[dept] = true; departments.push(dept); }
        });

        return React.createElement(
            'div',
            { className: 'h-full flex flex-col' },
            departments.map(function (dept) {
                return React.createElement(
                    'div',
                    { key: dept, className: 'mb-8' },
                    React.createElement(Text, {
                        variant: 'medium',
                        className: 'font-bold text-teal-800 uppercase border-b border-gray-200 pb-2 mb-4 block tracking-wider'
                    }, dept),
                    React.createElement(
                        'div',
                        { className: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' },
                        team.filter(function (m) { return (m.department || 'Operations') === dept; }).map(function (member) {
                            return React.createElement(
                                'div',
                                {
                                    key: member.id,
                                    className: 'bg-white rounded-lg shadow-sm border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all group overflow-hidden'
                                },
                                React.createElement('div', { className: 'p-4' },
                                    React.createElement(Persona, {
                                        text: member.name,
                                        secondaryText: member.role,
                                        tertiaryText: member.status,
                                        size: PersonaSize.size48,
                                        presence: (member.status === 'On Site' || member.status === 'Deployed') ? PersonaPresence.online : member.status === 'Remote' ? PersonaPresence.away : PersonaPresence.offline,
                                        styles: { primaryText: { fontWeight: 'bold', color: '#333' } }
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'bg-gray-50 px-4 py-2 border-t border-gray-100 flex flex-col gap-1.5' },
                                    React.createElement('div', { className: 'flex items-center gap-3 text-xs text-gray-600 hover:text-teal-700 transition-colors cursor-pointer group/item' },
                                        React.createElement(Icon, { iconName: 'Phone', className: 'text-gray-400 group-hover/item:text-teal-600' }),
                                        React.createElement('span', { className: 'font-mono' }, member.phone)
                                    ),
                                    React.createElement('div', { className: 'flex items-center gap-3 text-xs text-gray-600 hover:text-teal-700 transition-colors cursor-pointer group/item' },
                                        React.createElement(Icon, { iconName: 'Mail', className: 'text-gray-400 group-hover/item:text-teal-600' }),
                                        React.createElement('span', { className: 'truncate' }, member.email)
                                    )
                                )
                            );
                        })
                    )
                );
            })
        );
    };
})();
