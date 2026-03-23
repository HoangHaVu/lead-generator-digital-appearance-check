import { generateScores, generateSocialScores, generateSeoScores } from './generateScores';

/**
 * Ruft die Netlify-Scan-Function für die Website auf.
 * Fallback: generateScores() — damit die App auch ohne Deployment funktioniert.
 */
export async function fetchScanResults(url) {
  try {
    const endpoint = `/.netlify/functions/scan?url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      ssl: data.ssl ?? 50,
      mobile: data.mobile ?? 50,
      seo: data.seo ?? 50,
      reviews: data.reviews ?? 50,
      impressum: data.impressum ?? 50,
      total: data.total ?? 50,
    };
  } catch {
    return generateScores(url);
  }
}

/**
 * Ruft die Netlify-Scan-Function für den erweiterten SEO-Check auf.
 * Gibt 5 Kategorien zurück: schema, openGraph, technical, content, performance + seoTotal.
 */
export async function fetchSeoResults(url) {
  try {
    const endpoint = `/.netlify/functions/scan-seo?url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return generateSeoScores(url);
  }
}

/**
 * Ruft die Netlify-Scan-Function für Social Media auf.
 * Erwartet ein Objekt mit optionalen Handles: { instagram, facebook, tiktok, linkedin }
 * Fallback: generateSocialScores() — deterministisch basierend auf den Handles.
 */
export async function fetchSocialResults(handles = {}) {
  const params = new URLSearchParams();
  if (handles.instagram) params.set('instagram', handles.instagram);
  if (handles.facebook)  params.set('facebook',  handles.facebook);
  if (handles.tiktok)    params.set('tiktok',     handles.tiktok);
  if (handles.linkedin)  params.set('linkedin',   handles.linkedin);

  // Wenn keine Handles angegeben → sofort leeres Ergebnis zurückgeben
  if (!params.toString()) {
    return generateSocialScores({});
  }

  try {
    const endpoint = `/.netlify/functions/scan-social?${params.toString()}`;
    const res = await fetch(endpoint, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return generateSocialScores(handles);
  }
}
