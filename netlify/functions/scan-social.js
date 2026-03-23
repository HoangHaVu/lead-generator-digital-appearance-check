// ============================================================
// FILE: scan-social.js
// PATH: netlify/functions/scan-social.js
// PROJECT: Lead-Generator
// PURPOSE: Prüft den Social-Media-Auftritt via öffentliche Profile.
//          Analysiert OG-Meta-Tags ohne API-Key.
//          Plattformen: Instagram, Facebook, TikTok, LinkedIn
// ============================================================

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const FETCH_OPTS = {
  method: 'GET',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.5',
  },
  redirect: 'follow',
  signal: AbortSignal.timeout(8000),
};

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/** Extrahiert alle OG-Meta-Tags als Key-Value-Objekt aus rohem HTML */
const extractOG = (html) => {
  const og = {};
  const regex = /<meta[^>]+>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const prop =
      /property=["'](og:[^"']+)["']/i.exec(tag)?.[1] ||
      /name=["'](og:[^"']+)["']/i.exec(tag)?.[1];
    const content = /content=["']([^"']*)["']/i.exec(tag)?.[1];
    if (prop && content) og[prop] = content;
  }
  return og;
};

/** Bereinigt einen Handle: entfernt @, URLs, trailing Slashes */
const cleanHandle = (raw, platformPath = '') => {
  if (!raw) return null;
  return raw
    .trim()
    .replace(new RegExp(`.*${platformPath}\\/`, 'i'), '')
    .replace(/^@/, '')
    .replace(/\/$/, '')
    .split('/')[0]  // nur erster Pfad-Teil
    .split('?')[0]; // keine Query-Parameter
};

// ─────────────────────────────────────────────
// Instagram
// ─────────────────────────────────────────────
const analyzeInstagram = async (raw) => {
  const handle = cleanHandle(raw, 'instagram.com');
  if (!handle) return { score: 0, status: 'not_provided', platform: 'instagram' };

  const url = `https://www.instagram.com/${handle}/`;
  try {
    const res = await fetch(url, FETCH_OPTS);
    if (res.status === 404) return { score: 5, status: 'not_found', handle, platform: 'instagram' };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const og = extractOG(html);

    // og:description Format: "12.3K Followers, 342 Following, 89 Posts - ..."
    const desc = og['og:description'] || '';
    const title = og['og:title'] || '';

    const hasProfile = title.length > 2 && !title.toLowerCase().includes('instagram');
    const hasBio = desc.length > 20;

    // Follower-Anzahl extrahieren
    const followerMatch = desc.match(/([0-9][0-9.,]*[KkMm]?)\s*Follower/i);
    let followers = followerMatch?.[1] ?? null;
    let followerScore = 0;
    if (followers) {
      const str = followers.toUpperCase();
      const num = parseFloat(followers.replace(',', '.'));
      if (str.endsWith('M')) followerScore = 40;
      else if (str.endsWith('K')) followerScore = clamp((num * 1000) / 500, 5, 40);
      else followerScore = clamp(num / 500, 1, 40);
    }

    // Post-Anzahl
    const postMatch = desc.match(/([0-9][0-9.,]*[KkMm]?)\s*Post/i);
    const posts = postMatch?.[1] ?? null;
    const hasActivity = !!posts;

    const score = clamp(
      (hasProfile ? 20 : 0) +
      (hasBio ? 15 : 0) +
      (hasActivity ? 15 : 0) +
      followerScore,
      5, 95
    );

    return { score, status: 'found', handle, platform: 'instagram', followers, posts, hasBio };
  } catch (err) {
    return { score: 0, status: 'error', handle, platform: 'instagram', error: err.message };
  }
};

// ─────────────────────────────────────────────
// Facebook
// ─────────────────────────────────────────────
const analyzeFacebook = async (raw) => {
  const handle = cleanHandle(raw, 'facebook.com');
  if (!handle) return { score: 0, status: 'not_provided', platform: 'facebook' };

  const url = `https://www.facebook.com/${handle}/`;
  try {
    const res = await fetch(url, FETCH_OPTS);
    if (res.status === 404) return { score: 5, status: 'not_found', handle, platform: 'facebook' };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const og = extractOG(html);

    const title = og['og:title'] || '';
    const desc = og['og:description'] || '';
    const type = og['og:type'] || '';

    const hasPage = title.length > 2;
    const hasDesc = desc.length > 10;
    const isBusinessPage = /business|profile|website/i.test(type);
    const hasEngagement =
      /(\d[\d.,K]+)\s*(Like|Gefällt mir|Follower)/i.test(html) ||
      /(\d[\d.,K]+)\s*people/i.test(html);

    const score = clamp(
      (hasPage ? 25 : 0) +
      (hasDesc ? 25 : 0) +
      (isBusinessPage ? 20 : 0) +
      (hasEngagement ? 25 : 0),
      5, 95
    );

    return { score, status: 'found', handle, platform: 'facebook', hasDesc, isBusinessPage, hasEngagement };
  } catch (err) {
    return { score: 0, status: 'error', handle, platform: 'facebook', error: err.message };
  }
};

// ─────────────────────────────────────────────
// TikTok
// ─────────────────────────────────────────────
const analyzeTikTok = async (raw) => {
  const handle = cleanHandle(raw, 'tiktok.com/@?');
  if (!handle) return { score: 0, status: 'not_provided', platform: 'tiktok' };

  const url = `https://www.tiktok.com/@${handle}/`;
  try {
    const res = await fetch(url, FETCH_OPTS);
    if (res.status === 404) return { score: 5, status: 'not_found', handle, platform: 'tiktok' };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const og = extractOG(html);

    // og:description Format: "17.5K Followers, 102 Following, 1.4M Likes"
    const desc = og['og:description'] || '';
    const title = og['og:title'] || '';

    const hasProfile = title.length > 1;
    const hasBio = desc.length > 10;

    const followerMatch = desc.match(/([0-9][0-9.,]*[KkMm]?)\s*Follower/i);
    let followers = followerMatch?.[1] ?? null;
    let followerScore = 0;
    if (followers) {
      const str = followers.toUpperCase();
      const num = parseFloat(followers.replace(',', '.'));
      if (str.endsWith('M')) followerScore = 40;
      else if (str.endsWith('K')) followerScore = clamp((num * 1000) / 500, 5, 40);
      else followerScore = clamp(num / 500, 1, 40);
    }

    const likeMatch = desc.match(/([0-9][0-9.,]*[KkMm]?)\s*Like/i);
    const likes = likeMatch?.[1] ?? null;

    const score = clamp(
      (hasProfile ? 20 : 0) +
      (hasBio ? 20 : 0) +
      followerScore,
      5, 95
    );

    return { score, status: 'found', handle, platform: 'tiktok', followers, likes, hasBio };
  } catch (err) {
    return { score: 0, status: 'error', handle, platform: 'tiktok', error: err.message };
  }
};

// ─────────────────────────────────────────────
// LinkedIn
// ─────────────────────────────────────────────
const analyzeLinkedIn = async (raw) => {
  const handle = cleanHandle(raw, 'linkedin.com/company');
  if (!handle) return { score: 0, status: 'not_provided', platform: 'linkedin' };

  const url = `https://www.linkedin.com/company/${handle}/`;
  try {
    const res = await fetch(url, FETCH_OPTS);
    if (res.status === 404) return { score: 5, status: 'not_found', handle, platform: 'linkedin' };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const og = extractOG(html);

    const title = og['og:title'] || '';
    const desc = og['og:description'] || '';

    // LinkedIn leitet nicht-eingeloggte User oft zu einem authwall um
    const isRestricted =
      html.includes('authwall') ||
      html.includes('/login') ||
      title.toLowerCase().includes('login') ||
      title.toLowerCase().includes('sign in');

    if (isRestricted) {
      // Profil existiert, aber Inhalt nicht lesbar → moderater Basis-Score
      return { score: 40, status: 'found_restricted', handle, platform: 'linkedin' };
    }

    const hasCompany = title.length > 2 && !title.toLowerCase().includes('linkedin');
    const hasDesc = desc.length > 20;
    const hasEmployees = /(\d[\d.,K]+)\s*(employee|Mitarbeiter|Beschäftigte)/i.test(html);
    const hasFollowers = /(\d[\d.,K]+)\s*(follower|Abonnenten)/i.test(html);

    const score = clamp(
      10 + // Basis: Profil existiert
      (hasCompany ? 25 : 0) +
      (hasDesc ? 25 : 0) +
      (hasEmployees ? 20 : 0) +
      (hasFollowers ? 15 : 0),
      5, 95
    );

    return { score, status: 'found', handle, platform: 'linkedin', hasDesc, hasEmployees, hasFollowers };
  } catch (err) {
    return { score: 0, status: 'error', handle, platform: 'linkedin', error: err.message };
  }
};

// ─────────────────────────────────────────────
// Gesamt-Social-Score (nur bereitgestellte Plattformen einberechnen)
// ─────────────────────────────────────────────
const calcSocialTotal = (results) => {
  const provided = results.filter((r) => r.status !== 'not_provided');
  if (provided.length === 0) return 0;
  const sum = provided.reduce((acc, r) => acc + (r.score || 0), 0);
  return Math.round(sum / provided.length);
};

// ─────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────
export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }

  const { instagram, facebook, tiktok, linkedin } = event.queryStringParameters || {};

  // Alle 4 Checks parallel ausführen
  const [instaResult, fbResult, ttResult, liResult] = await Promise.allSettled([
    analyzeInstagram(instagram),
    analyzeFacebook(facebook),
    analyzeTikTok(tiktok),
    analyzeLinkedIn(linkedin),
  ]);

  const results = {
    instagram: instaResult.status === 'fulfilled' ? instaResult.value : { score: 0, status: 'error', platform: 'instagram' },
    facebook:  fbResult.status  === 'fulfilled' ? fbResult.value  : { score: 0, status: 'error', platform: 'facebook' },
    tiktok:    ttResult.status  === 'fulfilled' ? ttResult.value  : { score: 0, status: 'error', platform: 'tiktok' },
    linkedin:  liResult.status  === 'fulfilled' ? liResult.value  : { score: 0, status: 'error', platform: 'linkedin' },
  };

  const socialTotal = calcSocialTotal(Object.values(results));

  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({
      ...results,
      socialTotal,
    }),
  };
};
