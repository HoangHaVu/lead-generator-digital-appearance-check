# map-input.md
# Letzte Aktualisierung: 2026-03-14

## Seite: Input
Route: /input

## Sections & Komponenten

### AnalysisForm
Datei:   src/components/sections/AnalysisForm.jsx
Funktion: Formular zur Eingabe von Einrichtungsname und URL. Validiert die Eingaben und leitet zu /scan weiter.

## Funktionalität
- Validierung: URL muss gültig sein.
- State: Lokale Verwaltung der Input-Felder.
- Navigation: `useNavigate` für Übergang zu Scanning.
