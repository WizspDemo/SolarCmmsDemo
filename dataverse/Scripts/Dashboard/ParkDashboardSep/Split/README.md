# Tab scripts για PlantDashboardWeather_v2

Ο κώδικας κάθε tab του dashboard έχει χωριστεί σε ξεχωριστά αρχεία και φορτώνεται από το κύριο `Full/PlantDashboardWeather_v2.html`.

## Αρχεία

| Αρχείο | Tab | Global |
|--------|-----|--------|
| `TabWorkOrders.js` | Work Orders (κουμπί + λίστα) | `PlantDashboardTabs.workordersHeader`, `PlantDashboardTabs.workorders` |
| `TabLiveFeed.js` | Live Feed | `PlantDashboardTabs.livefeed` |
| `TabMap.js` | Map (Sector Heatmap) | `PlantDashboardTabs.map` |
| `TabTeam.js` | Team | `PlantDashboardTabs.team` |
| `TabSiteDetails.js` | Site Details | `PlantDashboardTabs.sitedetails` |
| `TabParkSpecs.js` | Park Specs | `PlantDashboardTabs.parkspecs` |
| `TabWindy.js` | Live Cloud Map (Windy) | `PlantDashboardTabs.windy` |

## Σειρά φόρτωσης

Τα scripts πρέπει να φορτώνονται **μετά** τα React και FluentUI και **πριν** το κύριο script του dashboard. Το κύριο HTML τα καλεί με:

```html
<script src="../Split/TabWorkOrders.js"></script>
<!-- ... υπόλοιπα Tab*.js -->
```

## Dataverse Web Resources

Όταν ανεβάζετε σε Dataverse, κάθε `Tab*.js` μπορεί να γίνει ξεχωριστό web resource (π.χ. `solar_PlantDashboardTab_workorders`). Στο κύριο HTML αντικαταστήστε τα `src="../Split/..."` με τις πλήρεις URLs των web resources, π.χ.:

```html
<script src="https://yourorg.crm4.dynamics.com/WebResources/solar_PlantDashboardTab_workorders"></script>
```
