import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Music2 } from 'lucide-react';
import { useLead } from '../../context/LeadContext';
import { INDUSTRY_AVG, getScoreLabel } from '../../utils/generateScores';

const WEBSITE_FALLBACK = { ssl: 75, mobile: 68, seo: 72, reviews: 65, impressum: 80, total: 72 };

// Bestimmt Farbe eines Balkens basierend auf Score
const barColor = (score, isTotal) => {
  if (isTotal) return 'bg-primary';
  if (score >= 70) return 'bg-emerald-400';
  if (score >= 45) return 'bg-amber-400';
  return 'bg-red-400';
};

// Einzelner Balken mit Label
const Bar = ({ label, value, delay, isTotal = false }) => (
  <div className="flex flex-col items-center gap-1 flex-1">
    <div className="w-full h-40 flex items-end">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: `${value}%` }}
        transition={{ duration: 1, delay }}
        className={`w-full rounded-t-lg ${barColor(value, isTotal)}`}
      />
    </div>
    <p className={`text-[9px] font-bold uppercase tracking-wider text-center font-body leading-tight ${isTotal ? 'text-primary' : 'text-slate-400'}`}>
      {label}
    </p>
    <p className={`text-xs font-black font-body ${isTotal ? 'text-primary' : 'text-slate-600'}`}>{value}</p>
  </div>
);

// Kleiner Social-Score-Badge
const SocialBadge = ({ platform, score, icon, status }) => {
  if (status === 'not_provided') return null;
  const color = score >= 70 ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
    : score >= 40 ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-red-600 bg-red-50 border-red-200';
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold font-body ${color}`}>
      {icon}
      <span className="capitalize">{platform}</span>
      <span className="ml-auto font-black">{score}</span>
    </div>
  );
};

const ResultDashboard = () => {
  const { scanResults, socialResults, seoResults } = useLead();
  const s  = scanResults || WEBSITE_FALLBACK;
  const sr = socialResults;
  const er = seoResults; // extended SEO

  // Website-Balken (immer)
  const websiteBars = [
    { label: 'SSL',       value: s.ssl },
    { label: 'Mobile',    value: s.mobile },
    { label: 'SEO',       value: s.seo },
    { label: 'Reviews',   value: s.reviews },
    { label: 'Impressum', value: s.impressum },
  ];

  // Social-Balken (nur wenn Daten vorhanden und nicht 'not_provided')
  const socialBars = sr ? [
    { label: 'Instagram', value: sr.instagram?.score ?? 0, skip: sr.instagram?.status === 'not_provided' },
    { label: 'Facebook',  value: sr.facebook?.score  ?? 0, skip: sr.facebook?.status  === 'not_provided' },
    { label: 'TikTok',    value: sr.tiktok?.score    ?? 0, skip: sr.tiktok?.status    === 'not_provided' },
    { label: 'LinkedIn',  value: sr.linkedin?.score  ?? 0, skip: sr.linkedin?.status  === 'not_provided' },
  ].filter((b) => !b.skip) : [];

  // SEO-Detailbalken (nur wenn seoResults vorhanden)
  const seoBars = er ? [
    { label: 'Schema',     value: er.schema?.score      ?? 0 },
    { label: 'OG-Tags',   value: er.openGraph?.score   ?? 0 },
    { label: 'Technical', value: er.technical?.score   ?? 0 },
    { label: 'Content',   value: er.content?.score     ?? 0 },
    { label: 'Speed',     value: er.performance?.score ?? 0 },
  ] : [];

  const allBars = [
    ...websiteBars,
    ...seoBars,
    ...socialBars,
    { label: 'Gesamt', value: s.total, isTotal: true },
  ];

  const diff = s.total - INDUSTRY_AVG;
  const hasSocial = socialBars.length > 0;
  const hasSeo    = seoBars.length > 0;
  const categoryCount = 5 + seoBars.length + socialBars.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Donut Hero — Website-Score */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-sm"
      >
        <div className="absolute inset-0 bg-primary/5 opacity-50" />
        <div className="relative w-44 h-44">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle className="text-slate-100" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="10" />
            <motion.circle
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * s.total) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="text-primary" cx="50" cy="50" fill="transparent" r="40"
              stroke="currentColor" strokeDasharray="251.2" strokeWidth="10" strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-slate-900">{s.total}</span>
            <span className="text-sm font-bold text-primary uppercase tracking-widest font-body">{getScoreLabel(s.total)}</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-slate-900 font-bold font-body">Gesamt-Score</h3>
          <p className="text-slate-400 text-xs mt-1 font-body">Basierend auf {categoryCount} Kategorien</p>
        </div>

        {/* Social-Score-Badges */}
        {hasSocial && sr && (
          <div className="w-full mt-5 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-body">Social Media</p>
            <SocialBadge platform="instagram" score={sr.instagram?.score ?? 0} status={sr.instagram?.status} icon={<Instagram size={12} />} />
            <SocialBadge platform="facebook"  score={sr.facebook?.score  ?? 0} status={sr.facebook?.status}  icon={<Facebook  size={12} />} />
            <SocialBadge platform="tiktok"    score={sr.tiktok?.score    ?? 0} status={sr.tiktok?.status}    icon={<Music2    size={12} />} />
            <SocialBadge platform="linkedin"  score={sr.linkedin?.score  ?? 0} status={sr.linkedin?.status}  icon={<Linkedin  size={12} />} />
          </div>
        )}
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 flex flex-col shadow-sm"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-slate-500 text-sm font-medium font-body">Vergleich zum Branchendurchschnitt</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-900">{diff >= 0 ? '+' : ''}{diff}%</span>
              <span className={`font-bold px-2 py-0.5 rounded text-xs leading-none font-body ${diff >= 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                {diff >= 0 ? 'Über Schnitt' : 'Unter Schnitt'}
              </span>
            </div>
          </div>
          {hasSocial && (
            <div className="flex gap-3 text-xs text-slate-400 font-body">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-200 inline-block" /> Website</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Gesamt</span>
            </div>
          )}
        </div>

        <div className="flex items-end gap-1.5 flex-1">
          {allBars.map((bar, i) => (
            <Bar
              key={bar.label}
              label={bar.label}
              value={bar.value}
              delay={i * 0.08}
              isTotal={bar.isTotal}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ResultDashboard;
