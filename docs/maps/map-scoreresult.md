# map-scoreresult.md
# Letzte Aktualisierung: 2026-03-14

## Seite: ScoreResult
Route: /result

## Sections & Komponenten

### ResultDashboard
Datei:   src/components/sections/ResultDashboard.jsx
Funktion: Visuelles Dashboard mit Donut-Chart (Gesamtscore) und Bar-Chart (Vergleich).

### DetailCards
Datei:   src/components/sections/DetailCards.jsx
Funktion: Grid aus Kategorie-Karten und detaillierte Tabelle der überprüften Kriterien.

## Funktionalität
- Dynamische Charts: Animationen mit Framer Motion, Scores aus LeadContext.
- Filter: 5 Kategorie-Filter-Buttons (Alle / SSL / Mobile / SEO / Bewertungen / Impressum).
- Sortierung: Score-Spalte klickbar → asc/desc mit Pfeil-Icon.
- Export PDF: window.print() — Navbar/Footer/Buttons werden via print:hidden ausgeblendet.
