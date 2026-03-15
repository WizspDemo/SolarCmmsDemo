/**
 * PowerDashboard.rules.js — Οπτικοί κανόνες: χρώματα εικονιδίων, Sparklines, visibility.
 * Φορτώνεται μετά το PowerDashboard.config.js.
 * Χρήση: window.PowerDashboardRules
 */
(function () {
  'use strict';

  /** Χρώματα Sparkline ανά τύπο κάρτας (corrective, preventive, remedial, discovery) */
  const SPARKLINE_COLORS = {
    corrective: '#ea580c',  // orange-600
    preventive: '#2563eb',  // blue-600
    remedial: '#dc2626',    // red-600
    discovery: '#7c3aed'   // violet-600
  };

  /** Tailwind κλάσεις κειμένου ανά τύπο κάρτας */
  const CARD_TEXT_CLASSES = {
    corrective: { open: 'text-orange-700', secondary: 'text-orange-600' },
    preventive: { open: 'text-blue-700', secondary: 'text-blue-600' },
    remedial: { open: 'text-red-600', secondary: 'text-red-600' },
    discovery: { open: 'text-violet-700', secondary: 'text-violet-600' }
  };

  /**
   * Βέλη + Sparkline trend στο Corrective card (Open, In Progress, Furthermore):
   * Τα tasks των τελευταίων 7 ημερών vs των προηγούμενων 8.
   * - κόκκινο: current > previous (χειροτέρευση)
   * - πράσινο: αλλιώς (βελτίωση ή ίδιο)
   */
  function getCorrectiveTrendConfig(current, previous) {
    if (previous == null) return { colorClass: 'text-green-600', type: 'neutral', sparklineColor: '#16a34a' };
    const c = current ?? 0;
    const p = previous ?? 0;
    if (c > p) return { colorClass: 'text-red-600', type: 'up', sparklineColor: '#dc2626' };
    if (c < p) return { colorClass: 'text-green-600', type: 'down', sparklineColor: '#16a34a' };
    return { colorClass: 'text-green-600', type: 'neutral', sparklineColor: '#16a34a' };
  }

  /**
   * Sparkline χρώμα Preventive: ratio = count / συνολικά completed τρέχοντος μήνα.
   * - πράσινο: ratio ≤ 40%
   * - πορτοκαλί: 40% < ratio ≤ 60%
   * - κόκκινο: 60% < ratio ≤ 100%
   * Χρησιμοποιείται για Open Tasks και In Progress Tasks.
   */
  function getPreventiveSparklineColorByRatio(count, totalCompleted) {
    const c = count ?? 0;
    const tot = totalCompleted ?? 0;
    if (tot === 0) return '#9ca3af';
    const ratio = c / tot;
    if (ratio <= 0.4) return '#16a34a';
    if (ratio <= 0.6) return '#ea580c';
    return '#dc2626';
  }

  /**
   * Sparkline χρώμα Preventive Completed: ratio = completed / (open + inProgress + completed).
   * Αντεστραμμένη λογική: υψηλό completed = καλό.
   * - πράσινο: ratio ≥ 60%
   * - πορτοκαλί: 40% ≤ ratio < 60%
   * - κόκκινο: ratio < 40%
   */
  function getPreventiveSparklineColorByCompletedRatio(completed, open, inProgress) {
    const c = completed ?? 0;
    const o = open ?? 0;
    const ip = inProgress ?? 0;
    const total = o + ip + c;
    if (total === 0) return '#9ca3af';
    const ratio = c / total;
    if (ratio >= 0.6) return '#16a34a';
    if (ratio >= 0.4) return '#ea580c';
    return '#dc2626';
  }

  /**
   * Εικονίδιο header Preventive: ratio = (Open + In Progress) / Σύνολο (Open + In Progress + Completed).
   * - πράσινο CheckCircle2: ratio ≤ 30%
   * - πορτοκαλί Activity: 30% < ratio ≤ 60%
   * - κόκκινο Activity: 60% < ratio ≤ 80%
   * - κόκκινο AlertTriangle: ratio > 80%
   */
  function getPreventiveHeaderIconConfig(open, inProgress, completed) {
    const o = open ?? 0;
    const ip = inProgress ?? 0;
    const c = completed ?? 0;
    const total = o + ip + c;
    if (total === 0) return { colorClass: 'text-brand-primary opacity-80', iconKey: 'check' };

    const ratio = (o + ip) / total;
    if (ratio <= 0.3) return { colorClass: 'text-green-600 opacity-80', iconKey: 'check' };
    if (ratio <= 0.6) return { colorClass: 'text-orange-500 opacity-80', iconKey: 'activity' };
    if (ratio <= 0.8) return { colorClass: 'text-red-600 opacity-80', iconKey: 'activity' };
    return { colorClass: 'text-red-600 opacity-80', iconKey: 'alert' };
  }

  /**
   * Εικονίδιο header στο Corrective/Remedial summary card:
   * - πράσινο + CheckCircle2: open < 30% του (inProgress + further)
   * - πορτοκαλί + Activity: open μεταξύ 30% και 60%
   * - κόκκινο + Activity: open μεταξύ 60% και 80%
   * - κόκκινο + AlertTriangle: open ≥ 80%
   * - μπλε + CheckCircle2: fallback (sum = 0)
   */
  function getCardHeaderIconConfig(open, inProgress, further) {
    const o = open ?? 0;
    const ip = inProgress ?? 0;
    const f = further ?? 0;
    const sum = ip + f;
    if (sum === 0) return { colorClass: 'text-brand-primary opacity-80', iconKey: 'check' };

    const ratio = o / sum;
    if (ratio < 0.3) return { colorClass: 'text-green-600 opacity-80', iconKey: 'check' };
    if (ratio <= 0.6) return { colorClass: 'text-orange-500 opacity-80', iconKey: 'activity' };
    if (ratio <= 0.8) return { colorClass: 'text-red-600 opacity-80', iconKey: 'activity' };
    return { colorClass: 'text-red-600 opacity-80', iconKey: 'alert' };
  }

  /** Tooltip for trend (Completed): period comparison */
  const TREND_RULE_TOOLTIP = 'Period comparison: ↑ worsening | ↓ improving | − unchanged';

  /** Κανόνες ανά workflow για ελευθερία αλλαγών (ίδιοι τώρα, διαφορετικοί μελλοντικά) */
  const DAYS_RULE = {
    sparklineColorByDays: (d) => {
      const x = d ?? 0;
      if (x <= 3) return '#16a34a';
      if (x <= 5) return '#ea580c';
      return '#dc2626';
    },
    sparklineDirectionByDays: (d) => ((d ?? 0) <= 3 ? 'down' : 'up'),
    arrowColorClassByDays: (d) => {
      const x = d ?? 0;
      if (x <= 3) return 'text-green-600';
      if (x <= 5) return 'text-orange-500';
      return 'text-red-600';
    },
    sparklineRuleTooltip: 'Rule: 1-3 days in state → green ↓ | 4-5 days → orange ↑ | 6+ days → red ↑'
  };

  const WORKFLOW_RULES = {
    corrective: {
      ...DAYS_RULE,
      headerIconConfig: getCardHeaderIconConfig,
      trendConfig: getCorrectiveTrendConfig
    },
    preventive: {
      ...DAYS_RULE,
      headerIconConfig: getPreventiveHeaderIconConfig,
      trendConfig: getCorrectiveTrendConfig
    },
    remedial: {
      ...DAYS_RULE,
      headerIconConfig: getCardHeaderIconConfig,
      trendConfig: getCorrectiveTrendConfig
    }
  };

  function getWorkflowRules(workflowType) {
    return WORKFLOW_RULES[workflowType] || WORKFLOW_RULES.corrective;
  }

  /** @deprecated Use getWorkflowRules('corrective').sparklineColorByDays */
  function getCorrectiveSparklineColorByDays(maxDaysInState) {
    return DAYS_RULE.sparklineColorByDays(maxDaysInState);
  }

  /** @deprecated Use getWorkflowRules('corrective').sparklineDirectionByDays */
  function getCorrectiveSparklineDirectionByDays(maxDaysInState) {
    return DAYS_RULE.sparklineDirectionByDays(maxDaysInState);
  }

  /** @deprecated Use getWorkflowRules('corrective').arrowColorClassByDays */
  function getCorrectiveArrowColorClassByDays(maxDaysInState) {
    return DAYS_RULE.arrowColorClassByDays(maxDaysInState);
  }

  /** Backward compat: tooltips για Corrective/Remedial (HTML) */
  const CORRECTIVE_SPARKLINE_RULE_TOOLTIP = DAYS_RULE.sparklineRuleTooltip;
  const CORRECTIVE_TREND_RULE_TOOLTIP = TREND_RULE_TOOLTIP;

  /** Preventive Open/In Progress: ratio vs completed this month */
  const PREVENTIVE_SPARKLINE_RATIO_TOOLTIP = 'Open/In Progress vs Completed this month: ≤40% green | 40-60% orange | 60-100% red';

  /** Preventive Completed: ratio completed/total (≥60% green | 40-60% orange | <40% red) */
  const PREVENTIVE_SPARKLINE_COMPLETED_RATIO_TOOLTIP = 'Completed vs total (open+inProgress+completed): ≥60% green | 40-60% orange | <40% red';

  /** Header icon tooltip: Corrective/Remedial (Open vs InProgress+Further) */
  const HEADER_ICON_CORRECTIVE_REMEDIAL_TOOLTIP = 'Rule: Open / (InProgress + Further) — <30% green ✓ | 30-60% orange | 60-80% red | ≥80% alert';

  /** Header icon tooltip: Preventive (Open+InProgress vs Total) */
  const HEADER_ICON_PREVENTIVE_TOOLTIP = 'Rule: (Open + InProgress) / Total — ≤30% green ✓ | 30-60% orange | 60-80% red | >80% alert';

  /** StatusBadge: bgColor, textColor, label, dotColor ανά criticalDefects */
  const STATUS_BADGE_RULES = [
    { minDefects: 3, bgColor: 'bg-red-100', textColor: 'text-red-800', label: 'Critical', dotColor: 'bg-red-500' },
    { minDefects: 1, bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', label: 'Warning', dotColor: 'bg-yellow-500' },
    { minDefects: 0, bgColor: 'bg-green-100', textColor: 'text-green-800', label: 'Healthy', dotColor: 'bg-green-500' }
  ];

  function getSparklineColor(cardType) {
    return SPARKLINE_COLORS[cardType] || 'currentColor';
  }

  function getCardTextClass(cardType, variant) {
    const c = CARD_TEXT_CLASSES[cardType];
    return c ? (c[variant] || c.open) : '';
  }

  function getStatusBadgeConfig(criticalDefects) {
    const n = criticalDefects ?? 0;
    for (let i = 0; i < STATUS_BADGE_RULES.length; i++) {
      if (n >= STATUS_BADGE_RULES[i].minDefects) return STATUS_BADGE_RULES[i];
    }
    return STATUS_BADGE_RULES[STATUS_BADGE_RULES.length - 1];
  }

  window.PowerDashboardRules = {
    SPARKLINE_COLORS,
    CARD_TEXT_CLASSES,
    STATUS_BADGE_RULES,
    WORKFLOW_RULES,
    getWorkflowRules,
    CORRECTIVE_SPARKLINE_RULE_TOOLTIP,
    CORRECTIVE_TREND_RULE_TOOLTIP,
    PREVENTIVE_SPARKLINE_RATIO_TOOLTIP,
    PREVENTIVE_SPARKLINE_COMPLETED_RATIO_TOOLTIP,
    HEADER_ICON_CORRECTIVE_REMEDIAL_TOOLTIP,
    HEADER_ICON_PREVENTIVE_TOOLTIP,
    getSparklineColor,
    getCardTextClass,
    getStatusBadgeConfig,
    getCardHeaderIconConfig,
    getPreventiveHeaderIconConfig,
    getCorrectiveTrendConfig,
    getCorrectiveSparklineColorByDays,
    getCorrectiveSparklineDirectionByDays,
    getCorrectiveArrowColorClassByDays,
    getPreventiveSparklineColorByRatio,
    getPreventiveSparklineColorByCompletedRatio,
    PREVENTIVE_SPARKLINE_COMPLETED_RATIO_TOOLTIP
  };
})();
