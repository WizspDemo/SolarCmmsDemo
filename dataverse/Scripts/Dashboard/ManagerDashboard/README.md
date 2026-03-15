# Manager Dashboard vs Plant Dashboard – Κατανομή χρήσης

## Δύο διαφορετικά dashboards

| Web resource | Αρχείο | Χρήση | Tabs |
|-------------|--------|-------|------|
| **solar_ManagerDashboard** | `ManagerDashboard.html` | Portfolio view – λίστα όλων των parks για τον Manager | **Όχι** |
| **solar_PlantDashboardWeatherV2** | `PlantDashboardWeather_v2.html` | Plant view – λεπτομέρειες ενός park (μέσα στη φόρμα solar_location) | **Ναι** (Work Orders, Park Specs, Site Details, κ.λπ.) |

## Γιατί δεν εμφανίζεται το tab Park Specs;

Τα tabs (Work Orders, Park Specs, Site Details κ.λπ.) υπάρχουν **μόνο** στο **PlantDashboardWeather_v2**.

Αν η φόρμα **solar_location** φορτώνει λάθος web resource (π.χ. `solar_ManagerDashboard` αντί για `solar_PlantDashboardWeatherV2`), θα βλέπεις το portfolio grid χωρίς tabs.

## Τι να ελέγξεις

1. **Power Apps** → **Solutions** → **solar_location** form  
2. Βρες το tab/section όπου εμφανίζεται το dashboard  
3. Επίλεξε το web resource: πρέπει να είναι **solar_PlantDashboardWeatherV2** (όχι solar_ManagerDashboard)  
4. **Publish** τη φόρμα

## Που χρησιμοποιείται κάθε αρχείο

- **ManagerDashboard** → Σελίδα/app που εμφανίζει το portfolio (π.χ. home, dashboard, ή custom page)
- **PlantDashboardWeatherV2** → Web resource **μέσα** σε tab της φόρμας solar_location (όταν ανοίγεις ένα συγκεκριμένο park)
