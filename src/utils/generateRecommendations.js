const PRIORITY_ORDER = { Kritisch: 0, Hoch: 1, Mittel: 2 };

const getPriority = (score) => {
  if (score < 50) return 'Kritisch';
  if (score < 65) return 'Hoch';
  return 'Mittel';
};

export function generateRecommendations(scanResults, socialResults, seoResults) {
  const recs = [];

  // --- Website-Scan ---
  if (scanResults) {
    if (scanResults.ssl < 80) recs.push({
      priority: getPriority(scanResults.ssl),
      score: scanResults.ssl,
      title: 'SSL-Zertifikat & HTTPS absichern',
      category: 'Sicherheit',
      desc: `Ihr SSL-Score liegt bei ${scanResults.ssl}/100. Eine unsichere Verbindung schreckt Besucher ab und wird von Google negativ bewertet.`,
      steps: [
        'HTTPS für alle Seiten erzwingen',
        'Mixed-Content-Warnungen beheben',
        'HSTS-Header einrichten',
        'SSL-Zertifikat regelmäßig erneuern',
      ],
    });

    if (scanResults.mobile < 80) recs.push({
      priority: getPriority(scanResults.mobile),
      score: scanResults.mobile,
      title: 'Mobile-Optimierung verbessern',
      category: 'Mobile',
      desc: `Ihr Mobile-Score liegt bei ${scanResults.mobile}/100. Über 60% der Besucher kommen vom Smartphone — eine schlechte mobile Darstellung kostet direkt Bewerber.`,
      steps: [
        'Viewport-Meta-Tag korrekt setzen',
        'Touch-Targets auf mind. 44px vergrößern',
        'Schriftgrößen für mobile Screens anpassen',
        'Ladezeit auf Mobile unter 3 Sekunden bringen',
      ],
    });

    if (scanResults.seo < 80) recs.push({
      priority: getPriority(scanResults.seo),
      score: scanResults.seo,
      title: 'On-Page SEO stärken',
      category: 'SEO',
      desc: `Ihr SEO-Score liegt bei ${scanResults.seo}/100. Fehlende oder schwache Meta-Tags senken Ihre Sichtbarkeit in Google direkt.`,
      steps: [
        'Title-Tags auf 50–60 Zeichen optimieren',
        'Meta-Descriptions für jede Seite schreiben',
        'H1-Struktur auf jeder Seite prüfen',
        'Alt-Texte für alle Bilder ergänzen',
      ],
    });

    if (scanResults.reviews < 80) recs.push({
      priority: getPriority(scanResults.reviews),
      score: scanResults.reviews,
      title: 'Bewertungsmanagement aufbauen',
      category: 'Reputation',
      desc: `Ihr Bewertungs-Score liegt bei ${scanResults.reviews}/100. Aktives Review-Management steigert Vertrauen und Conversions nachweislich.`,
      steps: [
        'Google My Business Profil vollständig ausfüllen',
        'Systematisch um Bewertungen bitten',
        'Auf alle Bewertungen antworten (auch negative)',
        'Bewertungen auf der Website einbinden',
      ],
    });

    if (scanResults.impressum < 80) recs.push({
      priority: getPriority(scanResults.impressum),
      score: scanResults.impressum,
      title: 'Impressum & Datenschutz vervollständigen',
      category: 'Rechtliches',
      desc: `Ihr Impressums-Score liegt bei ${scanResults.impressum}/100. Unvollständige rechtliche Angaben schaden dem Vertrauen und können zu Abmahnungen führen.`,
      steps: [
        'Impressum nach §5 TMG vollständig ausfüllen',
        'Datenschutzerklärung aktualisieren (DSGVO)',
        'Cookie-Consent-Banner korrekt einrichten',
        'Impressums-Link im Footer sichtbar platzieren',
      ],
    });
  }

  // --- Social Media ---
  if (socialResults) {
    const platforms = {
      instagram: 'Instagram',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      linkedin: 'LinkedIn',
    };

    Object.entries(platforms).forEach(([key, label]) => {
      const data = socialResults[key];
      if (!data) return;

      if (data.status === 'not_provided') {
        recs.push({
          priority: key === 'linkedin' ? 'Hoch' : 'Mittel',
          score: 0,
          title: `${label}-Präsenz aufbauen`,
          category: 'Social Media',
          desc: `Kein ${label}-Profil angegeben. Eine ${label}-Präsenz erhöht die Reichweite und stärkt die Arbeitgebermarke erheblich.`,
          steps: [
            `${label}-Unternehmensseite erstellen`,
            'Profilbild und Banner professionell gestalten',
            'Wöchentlicher Content-Plan aufstellen',
            'Erste 5 Posts mit Unternehmensinhalt veröffentlichen',
          ],
        });
      } else if (data.status === 'not_found') {
        recs.push({
          priority: 'Hoch',
          score: 10,
          title: `${label}-Profil nicht auffindbar`,
          category: 'Social Media',
          desc: `Das angegebene ${label}-Handle konnte nicht gefunden werden. Prüfen Sie, ob das Profil öffentlich zugänglich ist.`,
          steps: [
            `${label}-Profilsichtbarkeit auf "Öffentlich" setzen`,
            'Handle-Schreibweise prüfen und korrigieren',
            'Profil mit Unternehmensname verknüpfen',
            'Verifizierungs-Badge beantragen',
          ],
        });
      } else if (data.score < 70) {
        recs.push({
          priority: getPriority(data.score),
          score: data.score,
          title: `${label}-Performance steigern`,
          category: 'Social Media',
          desc: `Ihr ${label}-Score liegt bei ${data.score}/100. Regelmäßiger, hochwertiger Content steigert die organische Reichweite und Bewerberzahlen.`,
          steps: [
            'Posting-Frequenz auf 3× pro Woche erhöhen',
            'Employer-Branding-Content (Team, Kultur) einbauen',
            'Hashtag-Strategie optimieren',
            'Engagement durch Stories/Reels steigern',
          ],
        });
      }
    });
  }

  // --- SEO Details ---
  if (seoResults) {
    const seoChecks = [
      {
        key: 'schema',
        label: 'Strukturierte Daten (Schema.org) einrichten',
        desc: (s) => `Ihr Schema.org-Score liegt bei ${s}/100. Strukturierte Daten ermöglichen Rich Snippets in Google und erhöhen die Klickrate deutlich.`,
        steps: [
          'LocalBusiness-Schema einrichten',
          'JobPosting-Schema für Stellenanzeigen hinzufügen',
          'FAQ-Schema für häufige Fragen ergänzen',
          'Schema mit Google Rich Results Test validieren',
        ],
      },
      {
        key: 'openGraph',
        label: 'Open Graph Meta-Tags optimieren',
        desc: (s) => `Ihr Open Graph-Score liegt bei ${s}/100. Fehlende OG-Tags führen zu unattraktiven Link-Vorschauen beim Teilen in sozialen Netzwerken.`,
        steps: [
          'og:title, og:description, og:image für alle Seiten setzen',
          'og:image in mindestens 1200×630 px bereitstellen',
          'Twitter Card Meta-Tags ergänzen',
          'OG-Tags mit Facebook Debugger prüfen',
        ],
      },
      {
        key: 'technical',
        label: 'Technische SEO verbessern',
        desc: (s) => `Ihr Technical-SEO-Score liegt bei ${s}/100. Technische Fehler blockieren Google beim Crawlen und Indexieren Ihrer Seiten.`,
        steps: [
          'XML-Sitemap erstellen und in Search Console einreichen',
          'robots.txt prüfen und optimieren',
          'Kanonische URLs (rel=canonical) einrichten',
          '404-Fehler in Google Search Console beheben',
        ],
      },
      {
        key: 'content',
        label: 'Content-Qualität steigern',
        desc: (s) => `Ihr Content-Score liegt bei ${s}/100. Hochwertige, keyword-optimierte Inhalte sind der wichtigste Rankingfaktor bei Google.`,
        steps: [
          'Zielgruppen-Keywords recherchieren (z.B. Semrush)',
          'Blogartikel zu Fachthemen veröffentlichen',
          'Bestehende Seiten um mind. 300 Wörter erweitern',
          'Interne Verlinkungsstruktur stärken',
        ],
      },
      {
        key: 'performance',
        label: 'Website-Performance optimieren',
        desc: (s) => `Ihr Performance-Score liegt bei ${s}/100. Langsame Websites werden von Google abgestraft und von Besuchern sofort verlassen.`,
        steps: [
          'Bilder in WebP konvertieren und komprimieren',
          'CSS/JS-Dateien minifizieren und lazy-loaden',
          'Server-Response-Zeit unter 200ms bringen',
          'Core Web Vitals mit PageSpeed Insights messen',
        ],
      },
    ];

    seoChecks.forEach(({ key, label, desc, steps }) => {
      const score = seoResults[key]?.score;
      if (score != null && score < 70) {
        recs.push({
          priority: getPriority(score),
          score,
          title: label,
          category: 'SEO Detail',
          desc: desc(score),
          steps,
        });
      }
    });
  }

  recs.sort((a, b) => {
    const po = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    return po !== 0 ? po : a.score - b.score;
  });

  return recs.map((rec, i) => ({
    ...rec,
    id: `REC-${String(i + 1).padStart(3, '0')}`,
  }));
}

export function calcOverallScore(scanResults, socialResults, seoResults) {
  const parts = [];
  if (scanResults?.total != null) parts.push(scanResults.total);
  if (seoResults?.seoTotal != null) parts.push(seoResults.seoTotal);
  if (socialResults?.socialTotal != null && socialResults.socialTotal > 0)
    parts.push(socialResults.socialTotal);
  if (parts.length === 0) return null;
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
}
