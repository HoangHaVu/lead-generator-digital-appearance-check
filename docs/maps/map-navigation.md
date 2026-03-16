# map-navigation.md
# Navigations-Graph — SPA Projekt
# Letzte Aktualisierung: 2026-03-14

## Screen-Graph

Lead-Generator-Flow:
  Welcome (/) → Input (/input) → Scanning (/scan) → Questions (/questions) → ScoreResult (/result) → Recommendations (/recommendations) → Booking (/booking) → LeadClose (/close) → ThankYou (/thanks)

## Routes (react-router)
  /                → Welcome
  /input           → Input
  /scan            → Scanning
  /questions       → Questions
  /result          → ScoreResult
  /recommendations → Recommendations
  /booking         → Booking
  /close           → LeadClose
  /thanks          → ThankYou

## Shared State (simuliert via Router)
  - Einrichtungsname (geplant)
  - Website URL (geplant)
  - Analyse-Ergebnisse (geplant)
