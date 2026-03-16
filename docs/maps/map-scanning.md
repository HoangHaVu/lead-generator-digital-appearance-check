# map-scanning.md
# Letzte Aktualisierung: 2026-03-14

## Seite: Scanning
Route: /scan

## Sections & Komponenten

### ScanStatus
Datei:   src/components/sections/ScanStatus.jsx
Funktion: Animierter Ladebildschirm. Simuliert verschiedene Analyse-Schritte (Security, Mobile, SEO, Reviews).

## Funktionalität
- Progress-Simulation: `setInterval` bis 100%.
- Status-Updates: Dynamischer Text basierend auf Fortschritt.
- Automatischer Redirect: Nach 100% Weiterleitung zu /questions.
