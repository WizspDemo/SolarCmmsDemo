# Template: Performance KPI Import Pane (Side Pane)

Αυτό το template ανοίγει ένα side pane για import δεδομένων KPI (PR, AV, LD, En, Irrad) μέσω copy-paste από Excel/Sheets. Τα KPIs δημιουργούνται **συνδεδεμένα με το τρέχον Solar Location** (solar_location). Ο χρήστης επιλέγει Μήνα (στα Αγγλικά) και Έτος (προεπιλογή το τρέχον).

## Προαπαιτούμενα

### 1. Δημιουργία πίνακα solar_performance

Ο πίνακας **solar_performance** δημιουργήθηκε με το **dataverse-mcp-local** (Solutions) και προστέθηκε στο **Solardev**:

- Πίνακας **solar_performance** (prefix solar_) μέσα στο solution **Solardev**
- Στήλες: solar_month (Picklist Jan–Dec), solar_year, solar_pr, solar_av, solar_ld, solar_en, solar_irrad
- Lookup **solar_solar_park** → Solar Location (solar_location)

Για να προστεθεί σε νέο environment: `pac solution add-solution-component --solutionUniqueName Solardev --component solar_performance --componentType 1 --AddRequiredComponents`

### 2. Publish

Μετά το script, κάνε Publish στο Power Apps (Solutions → Solardev → Publish).

## Τι κάνει

1. Κουμπί στο Command Bar της φόρμας **Solar Location (solar_location)** ανοίγει side pane.
2. Το pane εμφανίζει το Solar Location στο οποίο θα προστεθούν τα KPIs.
3. Ο χρήστης επιλέγει Month (Jan–Dec) και Year (τρέχον προεπιλεγμένο).
4. Επικολλά δεδομένα σε μορφή KPI | Apr-23 | May-23 | …
5. Πατάει Import για δημιουργία εγγραφής στον πίνακα solar_performance, με lookup στο Solar Location.

## Χρήση

1. **Upload στο Dataverse**
   - Upload το `performance-kpi-pane.html` ως Web Resource. **Name:** `wiz_performance_kpi_pane`
   - Upload το `performance-kpi-pane.js` ως Web Resource (type: Script JScript). **Name:** `wiz_performance_kpi_pane_js`

2. **Κουμπί στη φόρμα Solar Location**
   - Άνοιξε την εφαρμογή και πήγαινε στον πίνακα **Solar Location** (solar_location).
   - Επεξεργασία φόρμας → Command Bar → New → **Run JavaScript**
   - **Library:** `wiz_performance_kpi_pane_js`
   - **Function name:** `WizPerformanceOpenKpiPane`
   - **Parameter:** `PrimaryControl`

Το κουμπί πρέπει να είναι στην φόρμα **Solar Location** (solar_location), όχι στο Performance.

---

## Placeholders / Σταθερές

| Σταθερά | Περιγραφή | Τιμή |
|---------|-----------|------|
| **ENTITY_PERFORMANCE** | Logical name πίνακα | `solar_performance` |
| **FIELD_PARK_ODATA_BIND** | OData bind property για lookup | `solar_Solar_Park` |
| **ENTITY_SET_PARK** | OData entity set για Solar Location | `solar_locations` |

---

## Μορφή paste

Πρώτη γραμμή: headers (KPI, Apr-23, Μαΐ-23, Ιουν-23, …). Υποστηρίζονται και Ελληνικά (Απρ-23, Μαΐ-23, κ.λπ.).
Γραμμές 2–6: PR(%), AV(%), LD(£), En(kWh), Irrad(kWh/m2).

Παράδειγμα:
```
KPI	Απρ-23	Μαΐ-23
PR(%)	87,00	88,28
AV(%)	100,00	100,00
LD(£)	-	-
En(kWh)	13113,49	13213,49
Irrad(kWh/m2)	24771,15	24871,15
```

### Λειτουργίες

1. **Single column**: Επιλέγεις Month/Year και paste full table. Το σύστημα βρίσκει τη στήλη που ταιριάζει (π.χ. Apr + 2023 → Apr-23). Αν υπάρχει ήδη εγγραφή → μήνυμα «υπάρχει ήδη — παραλείπεται».
2. **Import από όλα τα columns**: Ενεργοποιείς το checkbox «Import από όλα τα columns». Κάθε στήλη με έγκυρο header (π.χ. Απρ-23) δημιουργεί μια εγγραφή. Εγγραφές που υπάρχουν ήδη παραλείπονται με μήνυμα.
