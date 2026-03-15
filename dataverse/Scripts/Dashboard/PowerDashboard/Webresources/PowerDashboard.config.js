/**
 * PowerDashboard.config.js — Κανόνες, σταθερές και resolvers για το Power Dashboard.
 * Φορτώνεται πριν από το PowerDashboard.html.
 * Χρήση: window.PowerDashboardConfig
 */
(function () {
  'use strict';

  const ENTITY_LOCATION = 'solar_location';
  const ENTITY_CORRECTIVE = 'solar_corrective_work_order';
  const ENTITY_PREVENTIVE = 'solar_solarpreventivetask';
  const ENTITY_REMEDIAL = 'solar_remedial';

  const PREVENTIVE_STATUS_IN_PROGRESS = 2;
  const CORRECTIVE_STATUS_IN_PROGRESS = 2;
  const REMEDIAL_STATUS_IN_PROGRESS = 2;

  const RISK_ICON_CONFIG = {
    corrective: [
      { minRatio: 0.7, label: 'High risk', badgeColorClass: 'bg-red-50 text-red-700', headerColorClass: 'text-red-600', iconKey: 'alert' },
      { minRatio: 0.5, label: 'Medium risk', badgeColorClass: 'bg-orange-50 text-orange-700', headerColorClass: 'text-orange-500', iconKey: 'alert' },
      { minRatio: 0, label: 'Low risk', badgeColorClass: 'bg-green-50 text-green-700', headerColorClass: 'text-green-600', iconKey: 'check' }
    ]
  };

  function getCorrectiveRiskConfig(open, inProgress, previous) {
    const levels = RISK_ICON_CONFIG.corrective;
    const denominator = (inProgress || 0) + (previous || 0);
    const ratio = denominator > 0 ? (open || 0) / denominator : 0;

    for (let i = 0; i < levels.length; i++) {
      if (ratio >= levels[i].minRatio) {
        return levels[i];
      }
    }
    return levels[levels.length - 1];
  }

  function getTrendInfo(current, previous) {
    if (previous === null || previous === undefined) {
      return { type: 'neutral', colorClass: 'text-gray-400' };
    }
    if (current < previous) {
      return { type: 'down', colorClass: 'text-green-600' };
    }
    if (current > previous) {
      return { type: 'up', colorClass: 'text-red-600' };
    }
    return { type: 'neutral', colorClass: 'text-gray-400' };
  }

  function getSparklineData(type) {
    const base = [2, 4, 3, 5, 4, 6, 5, 7];
    if (type === 'up') return base.map((v, i) => v + i * 0.3);
    if (type === 'down') return base.map((v, i) => 9 - v - i * 0.2);
    return [4, 5, 4.5, 5, 5, 4.5, 5, 5];
  }

  window.PowerDashboardConfig = {
    ENTITY_LOCATION,
    ENTITY_CORRECTIVE,
    ENTITY_PREVENTIVE,
    ENTITY_REMEDIAL,
    PREVENTIVE_STATUS_IN_PROGRESS,
    CORRECTIVE_STATUS_IN_PROGRESS,
    REMEDIAL_STATUS_IN_PROGRESS,
    RISK_ICON_CONFIG,
    getCorrectiveRiskConfig,
    getTrendInfo,
    getSparklineData
  };
})();
