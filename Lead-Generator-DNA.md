# Lead-Generator-DNA — Projekt Brief

---

## Bereich 1: Projekt-Idee & Brief

### Was ist das Projekt?
**Digitaler Auftritt Check** — eine Lead Generation App für Deutsche Pflegefilme.

Eine mobile-first React PWA, die auf Messen auf einem Tablet eingesetzt wird. Pflegeheimbetreiber, ambulante Dienste und Kliniken werden durch eine kostenlose Analyse ihres digitalen Auftritts als Leads gewonnen. Die App führt den Interessenten durch einen kurzen Analyse-Flow und endet mit einer Terminbuchung.

### User Flow
```
Welcome
  → URL + Kontaktdaten eingeben
  → Ladeanimation (Scan)
  → 3 Multiple-Choice-Fragen
  → Score-Ergebnis (0–100)
  → Empfehlungen
  → Beratungstermin sichern
  → Bestätigung
```

### Kernfunktionen
- **URL-Analyse** mit visuellem Score und 5 Kategorien:
  - SSL-Zertifikat
  - Mobile-Optimierung
  - Impressum
  - Sichtbarkeit (SEO)
  - Bewertungen
- **Lokale Lead-Speicherung** via localStorage
- **CSV-Export** aller Leads unter `/admin` (passwortgeschützt)
- **Offline-fähig** via Service Worker (PWA)

### Zielgruppe
- Pflegeheimbetreiber
- Ambulante Dienste
- Kliniken

### Einsatzszenario
Messen — Tablet-Bedienung, direkter Kundenkontakt vor Ort

### Wichtige technische Einschränkung
URL-Scans laufen über einen **Proxy** (Netlify Function oder Vercel Edge Function), da direkte Browser-Requests durch CORS blockiert werden.

### Design-Vorgaben
- Healthcare-trustworthy Ästhetik
- Farbpalette: Deep Blue / Teal
- Große Touch-Targets für Tablet-Bedienung
- Sprache: Deutsch

---

## Bereich 2: Tech Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v4 (Modern Engine)
- **Sprache:** JavaScript (JSX)
- **Package Manager:** npm
- **Animationen:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM v6

### Backend / Infrastruktur
- **CMS:** Keines (statische Inhalte)
- **Auth:** Keine (Lead-fokussiert)
- **Storage:** LocalStorage (Lead-Speicherung lokal)
- **Deployment:** Vercel / Netlify (empfohlen)

### Dateistruktur
```text
src/
├── assets/             # Bilder, Styles, Fonts
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── ui/             # Reusable Atoms (Buttons, Cards)
│   └── sections/       # Feature-Blöcke (Hero, Grid)
├── pages/              # Haupt-Seiten (Views)
├── hooks/              # Custom React Hooks
├── utils/              # Helper Funktionen (Check-Logik)
└── App.jsx             # Routing & Global Providers
```

### Konventionen
- **Komponenten:** PascalCase (z.B. `FeatureCard.jsx`)
- **Verzeichnisse:** kebab-case (z.B. `components/ui/`)
- **Styling:** Utility-First via Tailwind CSS
- **Imports:** Absolute Pfade bevorzugt (via Vite Alias falls konfiguriert)

### Scripts
- `npm run dev`: Lokaler Development-Server
- `npm run build`: Produktions-Build erstellen
- `npm run preview`: Build lokal testen

---

## Bereich 3: Seiten-Baum

Welcome                           → docs/maps/map-welcome.md
  ├── Hero
  ├── Features
  └── Stats

Input                             → docs/maps/map-input.md
  └── AnalysisForm

Scanning                          → docs/maps/map-scanning.md
  └── ScanStatus

Questions                         → docs/maps/map-questions.md
  └── Quiz

ScoreResult                       → docs/maps/map-scoreresult.md
  ├── ResultDashboard
  └── DetailCards

Recommendations                   → docs/maps/map-recommendations.md
  ├── RecommendationsHero
  ├── QuickMetrics
  └── ActionPlan

Booking                           → docs/maps/map-booking.md
  ├── BookingCalendar
  └── BookingDetails

LeadClose                         → docs/maps/map-leadclose.md
  ├── CloseHero
  ├── ExpertProfile
  └── BenefitGrid

ThankYou                          → docs/maps/map-thankyou.md
  └── ThankYouDetails


Layout + geteilte UI              → docs/maps/map-layout.md
                                  → docs/maps/map-ui-shared.md
Navigations-Graph                 → docs/maps/map-navigation.md

