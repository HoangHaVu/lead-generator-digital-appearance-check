# map-scanning.md
# Letzte Aktualisierung: 2026-03-14

## Seite: Scanning
Route: /scan

## Sections & Komponenten

### ScanStatus
Datei:   src/components/sections/ScanStatus.jsx
Funktion: Animierter Ladebildschirm. Simuliert verschiedene Analyse-Schritte (Security, Mobile, SEO, Reviews).

## Funktionalität
- API-Call: `fetchScanResults(url)` startet sofort parallel zur Animation → netlify/functions/scan.js
- Fallback: generateScores(url) wenn API nicht erreichbar (kein Deployment / Timeout)
- Progress-Animation: setInterval 50ms, hält bei 99% bis API fertig ist
- Status-Updates: Dynamischer Text basierend auf Fortschritt
- Navigation: Erst wenn Animation (100%) UND API-Call beide fertig sind → /questions
