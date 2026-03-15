/**
 * PlantDashboard - Tab & Widget Visibility + Tab Order Configuration
 *
 * Ορίζει ποια tabs και widgets εμφανίζονται και τη σειρά των tabs.
 *
 * Χρήση:
 * 1) Ανεβάστε σε Dataverse ως Script web resource (π.χ. solar_PlantDashboardConfig.js).
 * 2) Προσθέστε στο PlantDashboardWeather_v2.html πριν το main script:
 *    <script src="https://YOUR_ORG.crm4.dynamics.com/WebResources/solar_PlantDashboardConfig"></script>
 * 3) Αλλάξτε τα true/false και τη σειρά στο tabOrder.
 *
 * URL params (αντικαθιστούν τα παρακάτω):
 *   ?tabs=workorders,livefeed,map  → μόνο αυτά τα tabs (και η σειρά τους)
 *   ?hide=windy,team               → κρύψιμο windy και team
 *   ?showMessageBar=0              → κρύψιμο MessageBar
 *   ?statsCards=preventiveHealth,criticalDefects → μόνο αυτά τα cards
 *   ?hideStatsCards=preventiveWorkflow          → κρύψιμο συγκεκριμένων cards
 *   ?showWeatherWidget=0           → κρύψιμο Weather widget
 *   ?showInverterStatus=0          → κρύψιμο Inverter Status
 */
(function () {
    'use strict';
    window.PlantDashboardConfig = window.PlantDashboardConfig || {};

    /** Ποια tabs να εμφανίζονται (true = εμφάνιση, false = κρύψιμο) */
    window.PlantDashboardConfig.visibleTabs = {
        workorders: true,
        livefeed: true,
        map: true,
        team: true,
        sitedetails: true,
        parkspecs: true,
        windy: false
    };

    /**
     * Σειρά εμφάνισης των tabs (από αριστερά προς δεξιά).
     * Μόνο τα tabs που υπάρχουν εδώ και έχουν visibleTabs[key] === true θα εμφανίζονται.
     * Αλλάξτε τη σειρά αλλάζοντας τη σειρά των στοιχείων του πίνακα.
     */
    window.PlantDashboardConfig.tabOrder = [
        'workorders',
        'livefeed',
        'map',
        'team',
        'sitedetails',
        'parkspecs',
        'windy'
    ];

    window.PlantDashboardConfig.showMessageBar = true;
    window.PlantDashboardConfig.statsCards = {
        preventiveHealth: true,
        preventiveWorkflow: true,
        criticalDefects: true,
        correctiveWorkflow: true
    };
    window.PlantDashboardConfig.showWeatherWidget = true;
    window.PlantDashboardConfig.showInverterStatus = true;
})();
