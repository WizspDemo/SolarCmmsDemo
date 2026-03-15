/**
 * PowerDashboard.mock.js — Mock data companion for PowerDashboard.html
 *
 * Data key: 'portfolio'
 * Shape: Array of solar park objects matching the portfolio state in PowerDashboard.
 *
 * To force mock mode even inside Dataverse (e.g. for testing):
 *   DevMock.forceEnabled = true;
 */

DevMock.forceEnabled = true;  // Για testing: ξε-σχολιάστε για να δείτε τα βελάκια. Σχολιάστε πριν το deploy.

DevMock.register('portfolio', [
  {
    id: 'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd',
    name: 'Solar Park Alpha',
    portfolioName: 'Portfolio A',
    capacityMW: 12.5,
    preventiveCount: 8,
    preventiveInProgressCount: 3,
    preventiveCompletedCount: 14,
    correctiveCount: 5,
    correctiveOpenCount: 2,
    correctiveInProgressCount: 3,
    correctiveCompletedCount: 9,
    remedialCount: 2,
    remedialOpenCount: 1,
    remedialInProgressCount: 1,
    remedialCompletedCount: 4,
    criticalDefects: 1,
    correctiveByPriority: { low: 1, medium: 0, high: 0, critical: 1 },
    correctiveFurtherCount: 0,
    remedialFurtherCount: 0,
    preventiveFurtherCount: 0,
    discoveryCount: 4,
    discoveryOpenCount: 1,
    discoveryInProgressCount: 2,
    discoveryFurtherCount: 0,
    discoveryCompletedCount: 6
  },
  {
    id: 'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd',
    name: 'Solar Park Beta',
    portfolioName: 'Portfolio A',
    capacityMW: 8.0,
    preventiveCount: 5,
    preventiveInProgressCount: 1,
    preventiveCompletedCount: 20,
    correctiveCount: 0,
    correctiveOpenCount: 0,
    correctiveInProgressCount: 0,
    correctiveCompletedCount: 3,
    remedialCount: 0,
    remedialOpenCount: 0,
    remedialInProgressCount: 0,
    remedialCompletedCount: 1,
    criticalDefects: 0,
    correctiveByPriority: { low: 0, medium: 0, high: 0, critical: 0 },
    correctiveFurtherCount: 0,
    remedialFurtherCount: 0,
    preventiveFurtherCount: 0,
    discoveryCount: 2,
    discoveryOpenCount: 0,
    discoveryInProgressCount: 1,
    discoveryFurtherCount: 0,
    discoveryCompletedCount: 3
  },
  {
    id: 'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd',
    name: 'Solar Park Gamma',
    portfolioName: 'Portfolio B',
    capacityMW: 25.0,
    preventiveCount: 12,
    preventiveInProgressCount: 6,
    preventiveCompletedCount: 30,
    correctiveCount: 9,
    correctiveOpenCount: 4,
    correctiveInProgressCount: 5,
    correctiveCompletedCount: 15,
    remedialCount: 5,
    remedialOpenCount: 2,
    remedialInProgressCount: 3,
    remedialCompletedCount: 8,
    criticalDefects: 4,
    correctiveByPriority: { low: 0, medium: 2, high: 1, critical: 4 },
    correctiveFurtherCount: 2,
    remedialFurtherCount: 1,
    preventiveFurtherCount: 1,
    discoveryCount: 7,
    discoveryOpenCount: 3,
    discoveryInProgressCount: 2,
    discoveryFurtherCount: 1,
    discoveryCompletedCount: 10
  },
  {
    id: 'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd',
    name: 'Solar Park Delta',
    portfolioName: 'Portfolio B',
    capacityMW: 5.5,
    preventiveCount: 3,
    preventiveInProgressCount: 0,
    preventiveCompletedCount: 8,
    correctiveCount: 2,
    correctiveOpenCount: 2,
    correctiveInProgressCount: 0,
    correctiveCompletedCount: 4,
    remedialCount: 1,
    remedialOpenCount: 1,
    remedialInProgressCount: 0,
    remedialCompletedCount: 2,
    criticalDefects: 2,
    correctiveByPriority: { low: 0, medium: 0, high: 1, critical: 2 },
    correctiveFurtherCount: 0,
    remedialFurtherCount: 0,
    preventiveFurtherCount: 0
  },
  {
    id: 'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd',
    name: 'Solar Park Epsilon',
    portfolioName: 'Portfolio C',
    capacityMW: 18.75,
    preventiveCount: 10,
    preventiveInProgressCount: 4,
    preventiveCompletedCount: 22,
    correctiveCount: 3,
    correctiveOpenCount: 1,
    correctiveInProgressCount: 2,
    correctiveCompletedCount: 7,
    remedialCount: 2,
    remedialOpenCount: 0,
    remedialInProgressCount: 2,
    remedialCompletedCount: 5,
    criticalDefects: 0,
    correctiveByPriority: { low: 2, medium: 0, high: 1, critical: 0 },
    correctiveFurtherCount: 1,
    remedialFurtherCount: 0,
    preventiveFurtherCount: 1,
    discoveryCount: 5,
    discoveryOpenCount: 2,
    discoveryInProgressCount: 1,
    discoveryFurtherCount: 1,
    discoveryCompletedCount: 8
  }
]);

// Discovery weekly trend (summary card)
DevMock.register('discoveryWeeklyTrend', {
  open:       { current: 7,  previous: 6 },
  inProgress: { current: 6,  previous: 5 },
  further:    { current: 2,  previous: 3 },
  completed:  { current: 29, previous: 25 }
});

// Per-park preventive open trend
DevMock.register('perParkPreventiveTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 5, previous: 6 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 4, previous: 3 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 6, previous: 8 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 3, previous: 4 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 6, previous: 5 }
});

// Per-park preventive In Progress trend
DevMock.register('perParkPreventiveInProgressTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 3, previous: 2 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 1 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 6, previous: 5 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 1 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 4, previous: 3 }
});

// Per-park preventive Further more trend
DevMock.register('perParkPreventiveFurtherTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 0 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 0 }
});

// Per-park remedial In Progress trend (maxDaysInState: days in In Progress state)
DevMock.register('perParkRemedialInProgressTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 1, maxDaysInState: 2 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 3, previous: 2, maxDaysInState: 5 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 1 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 2, previous: 1, maxDaysInState: 3 }
});

// Per-park remedial Further more trend (maxDaysInState: days in Furthermore)
DevMock.register('perParkRemedialFurtherTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 0, maxDaysInState: 4 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 }
});

// Per-park corrective In Progress trend (maxDaysInState: μέρες που τα tasks είναι In Progress)
DevMock.register('perParkCorrectiveInProgressTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 3, previous: 2, maxDaysInState: 2 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 5, previous: 4, maxDaysInState: 6 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 1 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 2, previous: 3, maxDaysInState: 4 }
});

// Per-park corrective Further more trend (maxDaysInState: μέρες που τα tasks είναι Furthermore)
DevMock.register('perParkCorrectiveFurtherTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 2, previous: 3, maxDaysInState: 5 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 0, maxDaysInState: 3 }
});

// Per-park corrective open trend (current vs previous week) for table row arrow/sparkline (maxDaysInState: μέρες που τα tasks είναι Open)
DevMock.register('perParkCorrectiveTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 2, previous: 3, maxDaysInState: 2 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 4, previous: 6, maxDaysInState: 6 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 2, previous: 3, maxDaysInState: 5 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 2, maxDaysInState: 1 }
});

// Per-park remedial open trend (current vs previous week) for table row arrow/sparkline (maxDaysInState: days in Open)
DevMock.register('perParkRemedialTrend', {
  'mock-loc-001-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 2, maxDaysInState: 2 },
  'mock-loc-002-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 0 },
  'mock-loc-003-aaaa-bbbb-cccc-dddddddddddd': { current: 2, previous: 4, maxDaysInState: 6 },
  'mock-loc-004-aaaa-bbbb-cccc-dddddddddddd': { current: 1, previous: 2, maxDaysInState: 4 },
  'mock-loc-005-aaaa-bbbb-cccc-dddddddddddd': { current: 0, previous: 1 }
});

// Dummy weekly corrective trend data (for KPI arrows etc.)
// Shape:
// {
//   open:       { current: number, previous: number },
//   inProgress: { current: number, previous: number },
//   further:    { current: number, previous: number },
//   completed:  { current: number, previous: number }
// }
DevMock.register('correctiveWeeklyTrend', {
  open:       { current: 9,  previous: 12, maxDaysInState: 4 },
  inProgress: { current: 10, previous: 8,  maxDaysInState: 2 },
  further:    { current: 38, previous: 40, maxDaysInState: 7 },
  completed:  { current: 38, previous: 35 }
});

DevMock.register('preventiveWeeklyTrend', {
  open:       { current: 24, previous: 20 },
  inProgress: { current: 14, previous: 16 },
  further:    { current: 94, previous: 90 },
  completed:  { current: 94, previous: 88 }
});

DevMock.register('remedialWeeklyTrend', {
  open:       { current: 4,  previous: 5,  maxDaysInState: 5 },
  inProgress: { current: 6,  previous: 4,  maxDaysInState: 3 },
  further:    { current: 20, previous: 22 },
  completed:  { current: 20, previous: 18 }
});
