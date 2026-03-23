/**
 * Generates deterministic scan scores based on a URL string.
 * Same URL always produces the same scores — makes the result feel consistent.
 */
export function generateScores(url) {
  let seed = (url || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 12345);
  const rand = (min, max) => {
    seed = (seed * 9301 + 49297) % 233280;
    return min + Math.floor((seed / 233280) * (max - min + 1));
  };
  const ssl = rand(55, 100);
  const mobile = rand(40, 100);
  const seo = rand(50, 100);
  const reviews = rand(35, 100);
  const impressum = rand(60, 100);
  const total = Math.round((ssl + mobile + seo + reviews + impressum) / 5);
  return { ssl, mobile, seo, reviews, impressum, total };
}

/**
 * Deterministischer Fallback für Social-Media-Scores.
 * Plattformen ohne Handle → status: 'not_provided', score: 0
 * Plattformen mit Handle → plausible Demo-Scores (basierend auf Handle-String)
 */
/**
 * Deterministischer Fallback für erweiterte SEO-Scores.
 * Gibt plausible Demo-Werte basierend auf der URL zurück.
 */
export function generateSeoScores(url = '') {
  let seed = (url || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 99);
  const rand = (min, max) => {
    seed = (seed * 9301 + 49297) % 233280;
    return min + Math.floor((seed / 233280) * (max - min + 1));
  };
  const schema      = { score: rand(10, 80) };
  const openGraph   = { score: rand(20, 90) };
  const technical   = { score: rand(30, 90) };
  const content     = { score: rand(40, 90) };
  const performance = { score: rand(30, 85) };
  const seoTotal = Math.round(
    schema.score * 0.20 + openGraph.score * 0.20 +
    technical.score * 0.30 + content.score * 0.20 + performance.score * 0.10
  );
  return { schema, openGraph, technical, content, performance, seoTotal };
}

export function generateSocialScores(handles = {}) {
  const platforms = ['instagram', 'facebook', 'tiktok', 'linkedin'];
  const result = {};
  let providedSum = 0;
  let providedCount = 0;

  platforms.forEach((platform) => {
    const handle = handles[platform];
    if (!handle) {
      result[platform] = { score: 0, status: 'not_provided', platform };
    } else {
      // Deterministischer Score basierend auf Handle-Zeichenkette
      const seed = handle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 42);
      const score = 40 + (seed % 45); // Bereich: 40–84
      result[platform] = { score, status: 'found', handle, platform };
      providedSum += score;
      providedCount++;
    }
  });

  result.socialTotal = providedCount > 0 ? Math.round(providedSum / providedCount) : 0;
  return result;
}

export const INDUSTRY_AVG = 68;

export const getScoreLabel = (total) => {
  if (total >= 85) return 'Exzellent';
  if (total >= 70) return 'Gut';
  if (total >= 55) return 'Ausbaufähig';
  return 'Kritisch';
};
