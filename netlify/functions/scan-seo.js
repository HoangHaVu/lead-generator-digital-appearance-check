// ============================================================
// FILE: scan-seo.js
// PATH: netlify/functions/scan-seo.js
// PROJECT: Lead-Generator
// PURPOSE: Erweiterter SEO-Check — analysiert 5 Kategorien:
//          Schema.org, OpenGraph, Technical SEO, Content-Qualität,
//          Performance-Hinweise. Ergänzt scan.js (kein Ersatz).
// ============================================================

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const HTML_FETCH_OPTS = {
  method: 'GET',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (compatible; AuftrittCheck-SEO/1.0; +https://deutsche-pflegefilme.de)',
    Accept: 'text/html,application/xhtml+xml',
  },
  redirect: 'follow',
  signal: AbortSignal.timeout(9000),
};

const HEAD_OPTS = {
  method: 'HEAD',
  redirect: 'follow',
  signal: AbortSignal.timeout(4000),
};

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/** Extrahiert Origin (Protokoll + Host) aus einer URL */
const getOrigin = (url) => {
  try { return new URL(url).origin; } catch { return url; }
};

// ─────────────────────────────────────────────
// 1. Schema.org — Strukturierte Daten (JSON-LD + Microdata)
// ─────────────────────────────────────────────
const analyzeSchema = (html) => {
  const jsonLdRegex =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let hasJsonLd = false;
  let hasBusinessType = false;  // LocalBusiness, MedicalBusiness, etc.
  let hasOrgType = false;       // Organization, Corporation
  let hasContactInfo = false;
  let typeCount = 0;

  while ((match = jsonLdRegex.exec(html)) !== null) {
    hasJsonLd = true;
    typeCount++;
    try {
      const data = JSON.parse(match[1]);
      const types = [].concat(data['@type'] || []);
      const typeStr = types.join(' ');
      if (/LocalBusiness|MedicalBusiness|HealthAnd|CivicStructure|GovernmentOrganization/i.test(typeStr))
        hasBusinessType = true;
      if (/Organization|Corporation|NGO|EducationalOrganization/i.test(typeStr))
        hasOrgType = true;
      if (data.telephone || data.address || data.email || data.geo)
        hasContactInfo = true;
    } catch { /* ungültiges JSON-LD — ignorieren */ }
  }

  // Microdata als Fallback
  const hasMicrodata = /itemtype=["']https?:\/\/schema\.org\//i.test(html);
  const hasAny = hasJsonLd || hasMicrodata;

  const score = clamp(
    (hasAny ? 25 : 0) +
    (hasBusinessType ? 40 : hasOrgType ? 25 : 0) +
    (hasContactInfo ? 25 : 0) +
    (typeCount > 1 ? 10 : 0),
    0, 100
  );

  return { score, hasJsonLd, hasMicrodata, hasBusinessType, hasOrgType, hasContactInfo };
};

// ─────────────────────────────────────────────
// 2. OpenGraph — Social-Sharing-Qualität
// ─────────────────────────────────────────────
const analyzeOpenGraph = (html) => {
  const og = {};
  const regex = /<meta[^>]+>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const tag = m[0];
    const prop =
      /property=["'](og:[^"']+)["']/i.exec(tag)?.[1] ||
      /name=["'](og:[^"']+)["']/i.exec(tag)?.[1];
    const content = /content=["']([^"']*)["']/i.exec(tag)?.[1];
    if (prop && content) og[prop] = content;
  }

  // Twitter Cards als Bonus
  const hasTwitterCard = /name=["']twitter:card["']/i.test(html);

  const hasTitle  = !!og['og:title'];
  const hasDesc   = !!og['og:description'];
  const hasImage  = !!og['og:image'];
  const hasType   = !!og['og:type'];
  const hasUrl    = !!og['og:url'];

  const score = clamp(
    (hasTitle  ? 25 : 0) +
    (hasDesc   ? 25 : 0) +
    (hasImage  ? 30 : 0) +
    (hasType   ? 10 : 0) +
    (hasUrl    ?  5 : 0) +
    (hasTwitterCard ? 5 : 0),
    0, 100
  );

  return { score, hasTitle, hasDesc, hasImage, hasType, hasTwitterCard };
};

// ─────────────────────────────────────────────
// 3. Technical SEO — robots.txt, sitemap, canonical
// ─────────────────────────────────────────────
const analyzeTechnical = async (targetUrl, html) => {
  const origin = getOrigin(targetUrl);

  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);

  // robots.txt + sitemap parallel prüfen (nur HEAD)
  const [robotsRes, sitemapRes] = await Promise.allSettled([
    fetch(`${origin}/robots.txt`,  HEAD_OPTS),
    fetch(`${origin}/sitemap.xml`, HEAD_OPTS),
  ]);

  const hasRobots  = robotsRes.status  === 'fulfilled' && robotsRes.value.ok;
  const hasSitemap = sitemapRes.status === 'fulfilled' && sitemapRes.value.ok;

  // Weiteres: hreflang (Mehrsprachigkeit)
  const hasHreflang = /rel=["']alternate["'][^>]+hreflang/i.test(html);

  // noindex-Flag → schlecht!
  const hasNoindex = /content=["'][^"']*noindex[^"']*["']/i.test(html);

  const score = clamp(
    (hasCanonical  ? 25 : 0) +
    (hasRobots     ? 30 : 0) +
    (hasSitemap    ? 35 : 0) +
    (hasHreflang   ?  5 : 0) +
    (hasNoindex    ? -30 : 0),  // Strafpunkte für noindex
    0, 100
  );

  return { score, hasCanonical, hasRobots, hasSitemap, hasHreflang, hasNoindex };
};

// ─────────────────────────────────────────────
// 4. Content-Qualität — Headings, Alt-Texte, Meta-Längen
// ─────────────────────────────────────────────
const analyzeContent = (html) => {
  // Heading-Hierarchie
  const hasH1 = /<h1[^>]*>[^<]{3,}/i.test(html);
  const hasH2 = /<h2[^>]*>[^<]{3,}/i.test(html);
  const hasH3 = /<h3[^>]*>[^<]{3,}/i.test(html);

  // Alt-Texte auf Bilder
  const allImgs  = (html.match(/<img[^>]+>/gi) || []).length;
  const altImgs  = (html.match(/<img[^>]+alt=["'][^"']{2,}["']/gi) || []).length;
  const goodAlts = allImgs === 0 || altImgs / allImgs >= 0.5;

  // Meta-Description: optimale Länge 120–165 Zeichen
  const metaDescMatch =
    /meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,300})["']/i.exec(html) ||
    /meta[^>]+content=["']([^"']{1,300})["'][^>]+name=["']description["']/i.exec(html);
  const metaDescLen = metaDescMatch?.[1]?.length ?? 0;
  const goodMetaDesc = metaDescLen >= 120 && metaDescLen <= 165;

  // Title: optimale Länge 45–65 Zeichen
  const titleMatch = /<title[^>]*>([^<]{1,100})<\/title>/i.exec(html);
  const titleLen   = titleMatch?.[1]?.trim().length ?? 0;
  const goodTitle  = titleLen >= 45 && titleLen <= 65;

  const score = clamp(
    (hasH1        ? 20 : 0) +
    (hasH2        ? 15 : 0) +
    (hasH3        ?  5 : 0) +
    (goodAlts     ? 20 : allImgs > 0 ? 5 : 10) +
    (goodMetaDesc ? 25 : metaDescLen > 0 ? 12 : 0) +
    (goodTitle    ? 15 : titleLen > 0 ? 7 : 0),
    0, 100
  );

  return { score, hasH1, hasH2, goodAlts, goodMetaDesc, goodTitle, metaDescLen, titleLen };
};

// ─────────────────────────────────────────────
// 5. Performance-Hinweise — render-blocking, lazy load, preload
// ─────────────────────────────────────────────
const analyzePerformance = (html) => {
  // Render-blockierende Scripts (ohne async/defer)
  const allScripts     = (html.match(/<script[^>]+src=[^>]+>/gi) || []);
  const blockingCount  = allScripts.filter((s) => !/async|defer/i.test(s)).length;
  const goodScripts    = allScripts.length === 0 || blockingCount <= 1;

  // Lazy Loading auf Bilder
  const hasLazyLoad = /loading=["']lazy["']/i.test(html);

  // Preload-Hints (Fonts, kritisches CSS)
  const hasPreload  = /<link[^>]+rel=["']preload["']/i.test(html);

  // Viewport Meta (Mobile-Basis)
  const hasViewport = /name=["']viewport["']/i.test(html);

  // Inline-CSS-Menge (grobe Schätzung)
  const inlineStyleCount = (html.match(/style=["'][^"']{50,}["']/gi) || []).length;
  const lowInlineStyles  = inlineStyleCount < 10;

  const score = clamp(
    (goodScripts     ? 30 : Math.max(0, 25 - blockingCount * 5)) +
    (hasLazyLoad     ? 20 : 0) +
    (hasPreload      ? 20 : 0) +
    (hasViewport     ? 20 : 0) +
    (lowInlineStyles ? 10 : 0),
    0, 100
  );

  return { score, goodScripts, blockingCount, hasLazyLoad, hasPreload, hasViewport };
};

// ─────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────
export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }

  const rawUrl = event.queryStringParameters?.url;
  if (!rawUrl) {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify({ error: 'Parameter "url" fehlt.' }),
    };
  }

  let targetUrl = rawUrl;
  if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

  try {
    const res = await fetch(targetUrl, HTML_FETCH_OPTS);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    // Alle Analysen — Technical braucht eigene async-Calls
    const [schemaResult, ogResult, technicalResult, contentResult, perfResult] =
      await Promise.all([
        Promise.resolve(analyzeSchema(html)),
        Promise.resolve(analyzeOpenGraph(html)),
        analyzeTechnical(targetUrl, html),
        Promise.resolve(analyzeContent(html)),
        Promise.resolve(analyzePerformance(html)),
      ]);

    // Gewichteter Gesamt-SEO-Score
    // Technical höher gewichtet — strukturelle Erreichbarkeit ist Grundlage
    const seoTotal = Math.round(
      schemaResult.score   * 0.20 +
      ogResult.score       * 0.20 +
      technicalResult.score * 0.30 +
      contentResult.score  * 0.20 +
      perfResult.score     * 0.10
    );

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        schema:      schemaResult,
        openGraph:   ogResult,
        technical:   technicalResult,
        content:     contentResult,
        performance: perfResult,
        seoTotal,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        schema:      { score: 0 },
        openGraph:   { score: 0 },
        technical:   { score: 0 },
        content:     { score: 0 },
        performance: { score: 0 },
        seoTotal:    0,
        error:       `Seite nicht erreichbar: ${err.message}`,
      }),
    };
  }
};
