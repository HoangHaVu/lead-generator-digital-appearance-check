// ============================================================
// FILE: scan.js
// PATH: netlify/functions/scan.js
// PROJECT: Lead-Generator
// PURPOSE: Server-side URL-Scan — umgeht Browser-CORS-Block.
//          Prüft SSL, Mobile, Impressum, SEO und Bewertungen.
// ============================================================

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const analyzeHtml = (url, html) => {
  const lower = html.toLowerCase();

  // --- SSL ---
  const sslPass = url.startsWith('https://');
  const ssl = sslPass ? 100 : 15;

  // --- Mobile ---
  const hasViewport =
    lower.includes('name="viewport"') || lower.includes("name='viewport'");
  const mobile = hasViewport ? clamp(85 + Math.floor(Math.random() * 15), 85, 100) : clamp(25 + Math.floor(Math.random() * 20), 25, 45);

  // --- Impressum ---
  const hasImpressum =
    lower.includes('impressum') ||
    lower.includes('/impressum') ||
    lower.includes('legal-notice') ||
    lower.includes('legal notice');
  const impressum = hasImpressum ? clamp(80 + Math.floor(Math.random() * 20), 80, 100) : 10;

  // --- SEO ---
  const hasTitle = /<title[^>]*>[^<]{5,}<\/title>/i.test(html);
  const hasMetaDesc =
    /meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}["']/i.test(html) ||
    /meta[^>]+content=["'][^"']{20,}["'][^>]+name=["']description["']/i.test(html);
  const hasH1 = /<h1[^>]*>[^<]{3,}<\/h1>/i.test(html);
  const seoCount = [hasTitle, hasMetaDesc, hasH1].filter(Boolean).length;
  const seo = clamp(Math.round(20 + (seoCount / 3) * 75), 20, 95);

  // --- Bewertungen ---
  const hasReviews =
    lower.includes('google.com/maps') ||
    lower.includes('g.page') ||
    lower.includes('trustpilot') ||
    lower.includes('jameda') ||
    lower.includes('kununu') ||
    lower.includes('provenexpert') ||
    lower.includes('aggregaterating') ||
    /itemtype=["']https?:\/\/schema\.org\/(review|aggregaterating)/i.test(lower);
  const reviews = hasReviews
    ? clamp(70 + Math.floor(Math.random() * 25), 70, 95)
    : clamp(25 + Math.floor(Math.random() * 20), 25, 45);

  const total = Math.round((ssl + mobile + impressum + seo + reviews) / 5);

  return {
    ssl,
    mobile,
    impressum,
    seo,
    reviews,
    total,
    details: {
      ssl: { pass: sslPass },
      mobile: { pass: hasViewport },
      impressum: { pass: hasImpressum },
      seo: { pass: seoCount >= 2, title: hasTitle, metaDesc: hasMetaDesc, h1: hasH1 },
      reviews: { pass: hasReviews },
    },
  };
};

export const handler = async (event) => {
  // CORS preflight
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

  // Normalize URL
  let targetUrl = rawUrl;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; AuftrittCheck/1.0; +https://deutsche-pflegefilme.de)',
        Accept: 'text/html',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const scores = analyzeHtml(targetUrl, html);

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(scores),
    };
  } catch (err) {
    // Seite nicht erreichbar — trotzdem SSL-Status zurückgeben
    const ssl = targetUrl.startsWith('https://') ? 100 : 15;
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        ssl,
        mobile: 0,
        impressum: 0,
        seo: 0,
        reviews: 0,
        total: Math.round(ssl / 5),
        error: `Seite nicht erreichbar: ${err.message}`,
      }),
    };
  }
};
