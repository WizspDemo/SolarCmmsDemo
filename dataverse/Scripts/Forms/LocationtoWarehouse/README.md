# Warehouse To Solar Parks Pane

Φόρμα **Warehouse** (solar_warehouse) σε Model-driven app (Dataverse).
Το κουμπί στο Command Bar ανοίγει side pane όπου μπορείς να επιλέξεις **πολλά Solar Parks**
(solar_location) και με **Save selected** δημιουργούνται εγγραφές στον πίνακα
**Warehouse To Location** (solar_warehousetolocation).

## Scripts

| Αρχείο | Περιγραφή |
|--------|-----------|
| warehouse-to-solarparks-pane.js | Ribbon handler. Ανοίγει side pane (Xrm.App.sidePanes) και περνά warehouseId/warehouseName στο HTML web resource. |
| warehouse-to-solarparks-pane.html | HTML web resource. Φορτώνει Solar Parks (solar_location), δείχνει λίστα με checkboxes και με Save δημιουργεί εγγραφές στο solar_warehousetolocation. |

## Ανέβασμα ως Web Resources

### 1. JavaScript
- **Name**: solar_warehouse_solarparks_pane
- **Display name**: Warehouse – Solar Parks Pane
- **Type**: Script (JScript)
- **File**: dataverse/Scripts/Forms/LocationtoWarehouse/warehouse-to-solarparks-pane.js

### 2. HTML
- **Name**: solar_warehouse_solarparks_pane.html
- **Display name**: Warehouse – Solar Parks Pane (HTML)
- **Type**: Webpage (HTML)
- **File**: dataverse/Scripts/Forms/LocationtoWarehouse/warehouse-to-solarparks-pane.html

## Ρύθμιση Command Bar (Warehouse main form)

Στη φόρμα του πίνακα **Warehouse** (solar_warehouse):

1. Άνοιξε το **Command Bar** (Primary entity: Warehouse).
2. Πρόσθεσε νέο κουμπί, π.χ. **Link Solar Parks**.
3. Action: **Run JavaScript**.
4. Library: solar_warehouse_solarparks_pane.
5. Function name: **SolarWarehouseOpenSolarParksPane**.
6. Parameter: **PrimaryControl**.

Μετά τη ρύθμιση:
- Άνοιξε ένα Warehouse record.
- Πάτησε **Link Solar Parks**.
- Στο pane:
  - Επέλεξε ένα ή περισσότερα Solar Parks (checkboxes).
  - Πάτησε **Save selected**.

Για κάθε επιλεγμένο Solar Park δημιουργείται εγγραφή στον πίνακα solar_warehousetolocation με:
- solar_warehouse → το τρέχον Warehouse
- solar_location → το επιλεγμένο Solar Park
- solar_warehousetolocationname → το όνομα του Warehouse
