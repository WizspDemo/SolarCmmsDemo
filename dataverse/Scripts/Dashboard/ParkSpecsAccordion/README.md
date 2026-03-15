# Park Specs – Horizontal Accordion (Dashboard)

React web resource που εμφανίζει τα 6 τμήματα δεδομένων Solar Park (Site Info, Inverter, PV Modules, Comms, HV, Security) μέσα στο Plant Dashboard (`PlantDashboardWeather_v2.html`) για τη φόρμα Solar Parks (`solar_location`).

## Τι κάνει

- 6 panels σε σειρά: Site Information, Inverter Specs, PV Modules Specs, Comms Specs, HV Specs, Security Specs.
- Κλικ σε panel → ανοίγει, εμφανίζει τα πεδία σε οριζόντιο accordion (read‑only).
- **Site Information** έρχεται απευθείας από `solar_location`.
- **Inverter / Modules / Comms / HV / Security** έρχονται από ξεχωριστά specs tables, φιλτραρισμένα με `solar_park = current solar_locationid`.
- Όλη η διαμόρφωση των πεδίων είναι στο `PARK_SPECS_FIELDS.json` και το mapping Dataverse στο `PARK_SPECS_DATAVERSE_MAPPING.md`.

## Προαπαιτήσεις

- Web resources: `solar_react`, `solar_reactdom`, `solar_fluentui`, `solar_babel`, `solar_weatherService` κ.λπ. (όπως στο `PlantDashboardWeather_v2.html`).
- Entity: `solar_location` (Solar Parks).
- Web resource control στη φόρμα:
  - Ενεργό: **Pass row object-type code and unique identifier as parameters** (για `id`, `typename`).
  - **Μη** ενεργό: "Restrict cross-frame scripting" (απαραίτητο για `window.parent.Xrm.WebApi`).

## Πηγή δεδομένων (Dataverse)

Για κάθε section, τα δεδομένα έρχονται από:

| Section id | Panel            | Entity                | Lookup προς park          |
|------------|------------------|-----------------------|---------------------------|
| site       | Site Information | `solar_location`      | —                         |
| inverter   | Inverter Specs   | `solar_inverterspecs` | `solar_park → solar_location` |
| modules    | PV Modules Specs | `solar_pvmodulespecs` | `solar_park → solar_location` |
| comms      | Comms Specs      | `solar_commsspecs`    | `solar_park → solar_location` |
| hv         | HV Specs         | `solar_hvspecs`       | `solar_park → solar_location` |
| security   | Security Specs   | `solar_securityspecs` | `solar_park → solar_location` |

Λεπτομέρειες per field (logical name Dataverse) στο `PARK_SPECS_DATAVERSE_MAPPING.md`.

## Πεδία ανά panel (UI keys)

Τα παρακάτω είναι τα **keys** που χρησιμοποιεί το UI (accordion). Η αντιστοίχιση σε Dataverse columns γίνεται από το `PARK_SPECS_FIELDS.json` + mapping.

| Panel           | Keys |
|-----------------|------|
| Site Information | `solar_name`, `solar_address`, `solar_postalcode`, `solar_account`, `solar_landsizekm`, `solar_opendate` |
| Inverter Specs   | `solar_inverter_manufacturer`, `solar_inverter_type`, `solar_inverter_model`, `solar_inverter_quantity`, `solar_inverter_lv_voltage`, `solar_inverter_power`, `solar_assumed_warranty_period`, `solar_warranty_expiry` |
| PV Modules       | `solar_modulemanufacturer`, `solar_modulemodel`, `solar_modulequantity`, `solar_modulepower`, `solar_modulevoc`, `solar_moduleisc`, `solar_modulelength`, `solar_modulewidth`, `solar_moduledepth` |
| Comms            | `solar_satellite3g4g`, `solar_lannetwork`, `solar_scadaprovider`, `solar_dataloggers` |
| HV               | `solar_dnosizekv`, `solar_dnocontact`, `solar_sitereferencenumber`, `solar_transformerquantity`, `solar_transformermake`, `solar_transformermodel` |
| Security         | `solar_security`, `solar_securitycodes`, `solar_accessgatecodes`, `solar_exportmeterlocation`, `solar_exportmeteraccessdetails`, `solar_otherinformation`, `solar_landownerfarmerdetails` |

## Πώς φορτώνει τα δεδομένα

Στο `PlantDashboardWeather_v2.html`:

- Η `loadDataverseData()` βρίσκει το `solar_locationid` από τη φόρμα / URL (`id`, `typename`) και καλεί:
  - `fetchDataverseLocation` για Site,
  - `fetchParkSpecsFromDataverse(locationId)` για τα specs tables.
- Η `fetchParkSpecsFromDataverse` κάνει:
  - `retrieveRecord('solar_location', id, $select=...)` για τα site fields.
  - FetchXML `top="1"` σε κάθε specs entity με φίλτρο:  
    `solar_park eq {locationId}`.
  - Γεμίζει ένα flat αντικείμενο `{ [key]: value }` σύμφωνα με τα mappings.
- Το `ParkSpecsAccordion` παίρνει prop `parkSpecsData` και, όταν υπάρχει, εμφανίζει **τιμές από Dataverse**. Αν λείπει, κάνει fallback σε `Xrm.Page.getAttribute(...)` (φόρμα `solar_location`).

## Upload / χρήση

Σήμερα το accordion είναι ενσωματωμένο μέσα στο `PlantDashboardWeather_v2.html` (Plant Dashboard). Για νέο περιβάλλον:

1. Ανέβασε/ενημέρωσε το web resource HTML του dashboard (π.χ. `solar_PlantDashboardWeather_v2.html`) μέσα στο solution (π.χ. `Solardev`).  
2. Βεβαιώσου ότι τα dependent web resources (`solar_react`, `solar_reactdom`, `solar_fluentui`, `solar_babel`, `solar_weatherService`) είναι διαθέσιμα.
3. Βάλε το web resource στη φόρμα `solar_location` σε tab που θα χρησιμοποιεί το pivot tab `Park Specs`.
4. Συμπλήρωσε τουλάχιστον ένα row σε κάθε specs table (`solar_inverterspecs`, `solar_pvmodulespecs`, κ.λπ.) με lookup `solar_park` προς το ίδιο park για να δεις τιμές στο accordion.
