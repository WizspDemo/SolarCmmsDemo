# Κανόνες ανά Workflow — Power Dashboard

Όλοι οι οπτικοί/λογικοί κανόνες του dashboard ορίζονται στο `PowerDashboard.rules.js`. Αναφορά ανά workflow και κοινών κανόνων.

---

## 1. Corrective Workflow

### 1.1 Εικονίδιο κεφαλίδας κάρτας (Header icon)

**Μέτρηση:** `ratio = Open / (InProgress + Further)`

| Ratio | Εικονίδιο | Χρώμα |
|-------|-----------|--------|
| &lt; 30% | CheckCircle2 ✓ | πράσινο |
| 30% – 60% | Activity | πορτοκαλί |
| 60% – 80% | Activity | κόκκινο |
| ≥ 80% | AlertTriangle | κόκκινο |
| sum = 0 (fallback) | CheckCircle2 | μπλε (brand) |

**Tooltip:** `Open / (InProgress + Further) — <30% green ✓ | 30-60% orange | 60-80% red | ≥80% alert`

---

### 1.2 Βέλη & Sparkline (Open, In Progress, Furthermore) — ανά ημέρες σε κατάσταση

Όταν υπάρχει **max days in state** (ημέρες που το task μένει στην ίδια κατάσταση):

| Ημέρες σε κατάσταση | Χρώμα Sparkline | Κατεύθυνση βέλους | Χρώμα βέλους |
|---------------------|-----------------|-------------------|--------------|
| 1 – 3 | πράσινο (#16a34a) | ↓ down | πράσινο |
| 4 – 5 | πορτοκαλί (#ea580c) | ↑ up | πορτοκαλί |
| 6+ | κόκκινο (#dc2626) | ↑ up | κόκκινο |

**Tooltip:** `1-3 days in state → green ↓ | 4-5 days → orange ↑ | 6+ days → red ↑`

---

### 1.3 Σύγκριση περιόδων (trend: τρέχουσα vs προηγούμενη περίοδος)

Για **Completed** (και γενικά όπου συγκρίνονται δύο περιόδοι):

| Σύγκριση | Βέλος | Χρώμα Sparkline |
|----------|--------|-----------------|
| current &gt; previous | ↑ | κόκκινο (χειροτέρευση) |
| current &lt; previous | ↓ | πράσινο (βελτίωση) |
| current = previous | − | πράσινο (neutral) |
| previous = null | − | γκρι |

**Tooltip:** `Period comparison: ↑ worsening | ↓ improving | − unchanged`

---

### 1.4 Χρώματα κειμένου κάρτας (Corrective)

- **Open:** `text-orange-700`
- **Secondary:** `text-orange-600`
- **Default Sparkline χρώμα (fallback):** `#ea580c` (orange-600)

---

## 2. Preventive Workflow

### 2.1 Εικονίδιο κεφαλίδας κάρτας (Header icon)

**Μέτρηση:** `ratio = (Open + In Progress) / Total`  
όπου `Total = Open + In Progress + Completed`.

| Ratio | Εικονίδιο | Χρώμα |
|-------|-----------|--------|
| ≤ 30% | CheckCircle2 ✓ | πράσινο |
| 30% – 60% | Activity | πορτοκαλί |
| 60% – 80% | Activity | κόκκινο |
| &gt; 80% | AlertTriangle | κόκκινο |
| total = 0 (fallback) | CheckCircle2 | μπλε (brand) |

**Tooltip:** `(Open + In Progress) / Total — ≤30% green ✓ | 30-60% orange | 60-80% red | >80% alert`

---

### 2.2 Sparkline — Open Tasks & In Progress Tasks

**Μέτρηση:** `ratio = count / totalCompleted` (completed αυτόν τον μήνα).

| Ratio | Χρώμα |
|-------|--------|
| ≤ 40% | πράσινο (#16a34a) |
| 40% – 60% | πορτοκαλί (#ea580c) |
| 60% – 100% | κόκκινο (#dc2626) |
| totalCompleted = 0 | γκρι (#9ca3af) |

**Tooltip:** `Open/In Progress vs Completed this month: ≤40% green | 40-60% orange | 60-100% red`

---

### 2.3 Sparkline — Completed (Previous month)

**Μέτρηση:** `ratio = completed / (open + inProgress + completed)`  
(αντεστραμμένη λογική: υψηλό completed = καλό).

| Ratio | Χρώμα |
|-------|--------|
| ≥ 60% | πράσινο (#16a34a) |
| 40% – 60% | πορτοκαλί (#ea580c) |
| &lt; 40% | κόκκινο (#dc2626) |
| total = 0 | γκρι (#9ca3af) |

**Tooltip:** `Completed vs total (open+inProgress+completed): ≥60% green | 40-60% orange | <40% red`

---

### 2.4 Χρώματα κειμένου κάρτας (Preventive)

- **Open:** `text-blue-700`
- **Secondary:** `text-blue-600`
- **Default Sparkline χρώμα (fallback):** `#2563eb` (blue-600)

---

## 3. Remedial Workflow

Χρησιμοποιεί **τους ίδιους κανόνες με το Corrective** για:

- **Header icon:** `getCardHeaderIconConfig(open, inProgress, further)` — ίδια λογική με Corrective.
- **Sparkline / βέλη (Open, In Progress, Furthermore):** κανόνας ημερών σε κατάσταση (1–3 πράσινο, 4–5 πορτοκαλί, 6+ κόκκινο).
- **Trend (Completed):** σύγκριση περιόδων (↑ κόκκινο, ↓ πράσινο, − πράσινο).

**Διαφορά μόνο στα χρώματα κειμένου:**

- **Open:** `text-red-600`
- **Secondary:** `text-red-600`
- **Default Sparkline χρώμα (fallback):** `#dc2626` (red-600)

**Tooltip header icon:** ίδιος με Corrective — `Open / (InProgress + Further) — <30% green ✓ | 30-60% orange | 60-80% red | ≥80% alert`

---

## 4. Κοινοί κανόνες (όλα τα workflows)

### 4.1 Status Badge (ανά Solar Park)

Βασίζεται σε **criticalDefects**:

| criticalDefects | Label    | Φόντο      | Κείμενο      | Dot   |
|-----------------|----------|------------|--------------|-------|
| ≥ 3             | Critical | bg-red-100 | text-red-800 | red   |
| ≥ 1             | Warning  | bg-yellow-100 | text-yellow-800 | yellow |
| 0               | Healthy  | bg-green-100 | text-green-800 | green  |

---

### 4.2 Default χρώματα Sparkline ανά τύπο κάρτας

| Τύπος     | Χρώμα     | Hex      |
|-----------|-----------|----------|
| corrective | orange-600 | #ea580c |
| preventive | blue-600   | #2563eb |
| remedial   | red-600    | #dc2626 |
| discovery  | violet-600 | #7c3aed |

---

### 4.3 Card text classes (ανά τύπο)

| Τύπος     | open           | secondary      |
|-----------|----------------|----------------|
| corrective | text-orange-700 | text-orange-600 |
| preventive | text-blue-700   | text-blue-600   |
| remedial   | text-red-600    | text-red-600    |
| discovery  | text-violet-700 | text-violet-600 |

---

## 5. Αναφορά αρχείων

- **Κανόνες (JS):** `PowerDashboard.rules.js` → `window.PowerDashboardRules`
- **Χρήση στο UI:** `PowerDashboard.html` (Tailwind classes, tooltips, κλήσεις Rules)

Μπορείς να αλλάξεις ποσοστά, χρώματα ή εικονίδια στο `PowerDashboard.rules.js` χωρίς αλλαγή στο HTML, αρκεί να ενημερώσεις και αυτό το `.md` αν αλλάξουν οι κανόνες.
