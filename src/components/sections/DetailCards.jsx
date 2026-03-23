import { useState } from 'react';
import {
  Search, ShieldCheck, Smartphone, Star, FileText,
  CheckCircle2, AlertCircle, Activity, ArrowUpDown, ArrowUp, ArrowDown,
  Instagram, Facebook, Linkedin, Music2, MinusCircle,
  Code2, Share2, Settings2, AlignLeft, Zap,
  Users, FileEdit, ImageIcon, ThumbsUp, Building2, TrendingUp, LightbulbIcon,
} from 'lucide-react';
import { useLead } from '../../context/LeadContext';
import { INDUSTRY_AVG } from '../../utils/generateScores';

// ─── Sub-Komponenten ────────────────────────────────────────

const CategoryCard = ({ icon, label, score, trend, trendColor, muted = false }) => (
  <div className={`bg-white border rounded-2xl p-5 flex flex-col gap-3 transition-all shadow-sm ${muted ? 'border-slate-100 opacity-60' : 'border-slate-200 hover:border-primary/50 cursor-pointer group'}`}>
    <div className="flex justify-between items-start">
      <div className={`p-2 rounded-lg transition-colors ${muted ? 'bg-slate-100' : 'bg-primary/10 group-hover:bg-primary group-hover:text-white'}`}>
        {icon}
      </div>
      <span className={`text-xs font-bold font-body ${trendColor}`}>{trend}</span>
    </div>
    <div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider font-body">{label}</p>
      <p className={`text-3xl font-black ${muted ? 'text-slate-400' : 'text-slate-900'}`}>{muted ? '–' : score}</p>
    </div>
    {!muted && (
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-primary h-full rounded-full" style={{ width: `${score}%` }} />
      </div>
    )}
  </div>
);

const StatusBadge = ({ warning, notProvided, notFound }) => {
  if (notProvided) return (
    <span className="px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 w-fit font-body bg-slate-100 text-slate-400">
      <MinusCircle size={12} /> Nicht angegeben
    </span>
  );
  if (notFound) return (
    <span className="px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 w-fit font-body bg-red-100 text-red-600">
      <AlertCircle size={12} /> Nicht gefunden
    </span>
  );
  return (
    <span className={`px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 w-fit font-body ${warning ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
      {warning ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
      {warning ? 'Warnung' : 'Optimiert'}
    </span>
  );
};

const TableRow = ({ category, metric, status, score, warning, notProvided, notFound }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 font-semibold text-slate-900 font-body">{category}</td>
    <td className="px-6 py-4 text-slate-600 font-body">{metric}</td>
    <td className="px-6 py-4">
      <StatusBadge warning={warning} notProvided={notProvided} notFound={notFound} />
    </td>
    <td className="px-6 py-4 font-black font-body text-slate-500">
      {notProvided ? '–' : score}
    </td>
  </tr>
);

const SortIcon = ({ field, sortField, sortDir }) => {
  if (sortField !== field) return <ArrowUpDown size={14} className="text-slate-300" />;
  return sortDir === 'asc' ? <ArrowUp size={14} className="text-primary" /> : <ArrowDown size={14} className="text-primary" />;
};

// ─── Hilfsfunktionen ────────────────────────────────────────

const FALLBACK = { ssl: 75, mobile: 68, seo: 72, reviews: 65, impressum: 80 };

const getTrend = (score) => {
  const diff = score - INDUSTRY_AVG;
  return { label: (diff >= 0 ? '+' : '') + diff + '%', color: diff >= 0 ? 'text-green-500' : 'text-red-500' };
};

const socialStatusLabel = (status) => {
  if (status === 'found')            return { warning: false, notProvided: false, notFound: false };
  if (status === 'found_restricted') return { warning: true,  notProvided: false, notFound: false };
  if (status === 'not_found')        return { warning: false, notProvided: false, notFound: true };
  if (status === 'not_provided')     return { warning: false, notProvided: true,  notFound: false };
  return { warning: true, notProvided: false, notFound: false };
};

// ─── Social Detail & Empfehlungen ───────────────────────────

const MetricChip = ({ icon, label, ok, na = false }) => (
  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-body border ${
    na ? 'bg-slate-50 border-slate-100 text-slate-300' :
    ok ? 'bg-green-50 border-green-200 text-green-700' :
         'bg-red-50 border-red-200 text-red-600'
  }`}>
    {icon}
    <span>{label}</span>
    {!na && (ok
      ? <CheckCircle2 size={11} className="ml-0.5" />
      : <AlertCircle  size={11} className="ml-0.5" />
    )}
  </div>
);

const RecommendationItem = ({ text }) => (
  <li className="flex items-start gap-2 text-sm text-slate-600 font-body">
    <LightbulbIcon size={14} className="text-amber-500 mt-0.5 shrink-0" />
    <span>{text}</span>
  </li>
);

const PLATFORM_META = {
  instagram: { label: 'Instagram', icon: <Instagram size={18} className="text-pink-500" />, color: 'border-pink-200 bg-pink-50' },
  facebook:  { label: 'Facebook',  icon: <Facebook  size={18} className="text-blue-500" />, color: 'border-blue-200 bg-blue-50' },
  tiktok:    { label: 'TikTok',    icon: <Music2    size={18} className="text-slate-800"/>, color: 'border-slate-200 bg-slate-50' },
  linkedin:  { label: 'LinkedIn',  icon: <Linkedin  size={18} className="text-blue-700" />, color: 'border-blue-300 bg-blue-50' },
};

const getInstagramRecommendations = (d) => {
  const recs = [];
  if (!d.hasBio)                       recs.push('Bio hinzufügen — beschreiben Sie kurz Ihr Unternehmen und Ihre Leistungen.');
  if (!d.posts || parseInt(d.posts) < 10) recs.push('Mehr Beiträge veröffentlichen — mindestens 12 Posts stärken Ihre Glaubwürdigkeit.');
  if (d.followers) {
    const num = parseFloat(String(d.followers).replace(',', '.'));
    const isK = String(d.followers).toUpperCase().endsWith('K');
    const realNum = isK ? num * 1000 : num;
    if (realNum < 500) recs.push('Reichweite aufbauen: Reels und Hashtags gezielt einsetzen, um die ersten 500 Follower zu erreichen.');
  } else {
    recs.push('Follower-Aufbau starten — regelmäßiger Content ist der wichtigste Hebel.');
  }
  if (recs.length === 0) recs.push('Profil ist gut optimiert — halten Sie die Posting-Frequenz konstant.');
  return recs;
};

const getFacebookRecommendations = (d) => {
  const recs = [];
  if (!d.hasDesc)        recs.push('Seitenbeschreibung ergänzen — erklären Sie in 2–3 Sätzen, was Sie anbieten.');
  if (!d.isBusinessPage) recs.push('Als Business-Seite einrichten: Kategorie, Öffnungszeiten und Kontaktdaten vervollständigen.');
  if (!d.hasEngagement)  recs.push('Engagement steigern — regelmäßige Posts und Reaktionen auf Kommentare verbessern die Reichweite.');
  if (recs.length === 0) recs.push('Facebook-Seite ist gut aufgestellt — weiterhin aktiv bleiben und auf Bewertungen reagieren.');
  return recs;
};

const getTikTokRecommendations = (d) => {
  const recs = [];
  if (!d.hasBio) recs.push('Bio hinzufügen — kurz erklären, für wen Ihr Content gedacht ist.');
  if (d.followers) {
    const num = parseFloat(String(d.followers).replace(',', '.'));
    const isK = String(d.followers).toUpperCase().endsWith('K');
    const realNum = isK ? num * 1000 : num;
    if (realNum < 1000) recs.push('Mehr Videos veröffentlichen — TikTok belohnt Konsistenz mit organischer Reichweite.');
  } else {
    recs.push('Kanal aktiv befüllen — mindestens 3 Videos pro Woche für sichtbares Wachstum.');
  }
  if (recs.length === 0) recs.push('TikTok-Profil ist aktiv — Trends und Sounds nutzen für mehr Sichtbarkeit.');
  return recs;
};

const getLinkedInRecommendations = (d) => {
  const recs = [];
  if (d.status === 'found_restricted') {
    recs.push('Profil wurde gefunden, ist aber für nicht eingeloggte Besucher eingeschränkt — Unternehmensprofil regelmäßig mit Beiträgen befüllen.');
    return recs;
  }
  if (!d.hasDesc)      recs.push('Unternehmensbeschreibung hinzufügen — erklären Sie Ihre Kernkompetenzen und Zielgruppe.');
  if (!d.hasEmployees) recs.push('Mitarbeiterzahl pflegen — erhöht das Vertrauen bei potenziellen Kunden und Bewerbern.');
  if (!d.hasFollowers) recs.push('LinkedIn-Präsenz aufbauen — Mitarbeiter einladen, der Unternehmensseite zu folgen.');
  if (recs.length === 0) recs.push('LinkedIn-Profil ist vollständig — regelmäßige Fachbeiträge stärken die Thought-Leadership-Position.');
  return recs;
};

const RECOMMENDATION_FNS = {
  instagram: getInstagramRecommendations,
  facebook:  getFacebookRecommendations,
  tiktok:    getTikTokRecommendations,
  linkedin:  getLinkedInRecommendations,
};

const SocialPlatformDetail = ({ platform, data }) => {
  const meta = PLATFORM_META[platform];
  if (!meta || !data || data.status === 'not_provided') return null;

  const isNotFound = data.status === 'not_found';
  const isError    = data.status === 'error';
  const scoreColor = data.score >= 70 ? 'text-green-600 bg-green-50 border-green-200'
    : data.score >= 40 ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-red-600 bg-red-50 border-red-200';

  const recommendations = isNotFound
    ? [`${meta.label}-Profil erstellen — Ihre Kunden suchen Sie auch auf ${meta.label}.`]
    : isError
    ? ['Profil konnte nicht analysiert werden — bitte Handle prüfen und erneut scannen.']
    : RECOMMENDATION_FNS[platform]?.(data) ?? [];

  // Plattform-spezifische Metriken
  const metrics = (() => {
    if (isNotFound || isError) return [];
    if (platform === 'instagram') return [
      { icon: <Users size={11} />,     label: data.followers ? `${data.followers} Follower` : 'Follower unbekannt', ok: !!data.followers },
      { icon: <ImageIcon size={11} />, label: data.posts    ? `${data.posts} Posts`         : 'Posts unbekannt',    ok: !!data.posts },
      { icon: <FileEdit size={11} />,  label: 'Bio',                                                                 ok: !!data.hasBio },
    ];
    if (platform === 'facebook') return [
      { icon: <FileEdit  size={11} />, label: 'Beschreibung',   ok: !!data.hasDesc },
      { icon: <Building2 size={11} />, label: 'Business-Seite', ok: !!data.isBusinessPage },
      { icon: <ThumbsUp  size={11} />, label: 'Engagement',     ok: !!data.hasEngagement },
    ];
    if (platform === 'tiktok') return [
      { icon: <Users    size={11} />, label: data.followers ? `${data.followers} Follower` : 'Follower unbekannt', ok: !!data.followers },
      { icon: <TrendingUp size={11}/>, label: data.likes    ? `${data.likes} Likes`        : 'Likes unbekannt',   ok: !!data.likes },
      { icon: <FileEdit size={11} />, label: 'Bio',                                                               ok: !!data.hasBio },
    ];
    if (platform === 'linkedin') return [
      { icon: <FileEdit  size={11} />, label: 'Beschreibung', ok: !!data.hasDesc,      na: data.status === 'found_restricted' },
      { icon: <Users     size={11} />, label: 'Mitarbeiter',  ok: !!data.hasEmployees, na: data.status === 'found_restricted' },
      { icon: <TrendingUp size={11}/>, label: 'Follower',     ok: !!data.hasFollowers, na: data.status === 'found_restricted' },
    ];
    return [];
  })();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl border ${meta.color}`}>{meta.icon}</div>
          <div>
            <p className="font-bold text-slate-900 font-body">{meta.label}</p>
            {data.handle && <p className="text-xs text-slate-400 font-body">@{data.handle}</p>}
          </div>
        </div>
        <span className={`text-sm font-black px-3 py-1 rounded-xl border font-body ${isNotFound || isError ? 'text-slate-400 bg-slate-50 border-slate-200' : scoreColor}`}>
          {isNotFound ? 'Nicht gefunden' : isError ? 'Fehler' : `${data.score}/100`}
        </span>
      </div>

      {/* Metriken */}
      {metrics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metrics.map((m, i) => (
            <MetricChip key={i} icon={m.icon} label={m.label} ok={m.ok} na={m.na} />
          ))}
        </div>
      )}

      {/* Empfehlungen */}
      <div className="border-t border-slate-100 pt-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-body">Empfehlungen</p>
        <ul className="space-y-1.5">
          {recommendations.map((r, i) => <RecommendationItem key={i} text={r} />)}
        </ul>
      </div>
    </div>
  );
};

// ─── Hauptkomponente ────────────────────────────────────────

const DetailCards = () => {
  const { scanResults, socialResults, seoResults } = useLead();
  const s  = scanResults || FALLBACK;
  const sr = socialResults;
  const er = seoResults;

  const [activeFilter, setActiveFilter] = useState('all');
  const [sortField, setSortField]   = useState(null);
  const [sortDir, setSortDir]       = useState('desc');

  // Website-Kategoriekarten
  const websiteCategories = [
    { icon: <ShieldCheck size={20} className="text-primary" />, label: 'SSL',        score: s.ssl },
    { icon: <Smartphone  size={20} className="text-primary" />, label: 'Mobile',     score: s.mobile },
    { icon: <Search      size={20} className="text-primary" />, label: 'Sichtbarkeit', score: s.seo },
    { icon: <Star        size={20} className="text-primary" />, label: 'Bewertungen', score: s.reviews },
    { icon: <FileText    size={20} className="text-primary" />, label: 'Impressum',  score: s.impressum },
  ];

  // Social-Media-Kategoriekarten
  const socialCategories = sr ? [
    { key: 'instagram', icon: <Instagram size={20} className="text-pink-500"  />, label: 'Instagram' },
    { key: 'facebook',  icon: <Facebook  size={20} className="text-blue-500"  />, label: 'Facebook' },
    { key: 'tiktok',    icon: <Music2    size={20} className="text-slate-800" />, label: 'TikTok' },
    { key: 'linkedin',  icon: <Linkedin  size={20} className="text-blue-700"  />, label: 'LinkedIn' },
  ].map((c) => ({
    ...c,
    score: sr[c.key]?.score ?? 0,
    muted: sr[c.key]?.status === 'not_provided',
    trend: sr[c.key]?.status === 'not_provided' ? 'N/A' : getTrend(sr[c.key]?.score ?? 0).label,
    trendColor: sr[c.key]?.status === 'not_provided' ? 'text-slate-300' : getTrend(sr[c.key]?.score ?? 0).color,
  })) : [];

  const hasSocial = sr && Object.values(sr).some((v) => v?.status !== 'not_provided' && v?.status !== undefined);

  // SEO-Unterkategorien als Karten
  const seoCategories = er ? [
    { key: 'schema',      icon: <Code2     size={20} className="text-primary" />, label: 'Schema.org',  score: er.schema?.score      ?? 0 },
    { key: 'openGraph',   icon: <Share2    size={20} className="text-primary" />, label: 'OpenGraph',   score: er.openGraph?.score   ?? 0 },
    { key: 'technical',   icon: <Settings2 size={20} className="text-primary" />, label: 'Technical',   score: er.technical?.score   ?? 0 },
    { key: 'content',     icon: <AlignLeft size={20} className="text-primary" />, label: 'Content',     score: er.content?.score     ?? 0 },
    { key: 'performance', icon: <Zap       size={20} className="text-primary" />, label: 'Performance', score: er.performance?.score ?? 0 },
  ] : [];

  // Tabellenzeilen — Website
  const websiteRows = [
    { category: 'SSL-Zertifikat', metric: 'HTTPS-Verschlüsselung',  group: 'website', score: s.ssl,       warning: s.ssl < 70 },
    { category: 'Mobile',         metric: 'Responsive Design',       group: 'website', score: s.mobile,    warning: s.mobile < 70 },
    { category: 'Sichtbarkeit',   metric: 'Google Indexing / SEO',   group: 'website', score: s.seo,       warning: s.seo < 70 },
    { category: 'Bewertungen',    metric: 'Online-Reputation',       group: 'website', score: s.reviews,   warning: s.reviews < 70 },
    { category: 'Impressum',      metric: 'Rechtliche Angaben',      group: 'website', score: s.impressum, warning: s.impressum < 70 },
  ];

  // Tabellenzeilen — Erweitertes SEO
  const seoRows = er ? [
    { category: 'Schema.org',  metric: 'Strukturierte Daten (JSON-LD)', group: 'seo', score: er.schema?.score      ?? 0, warning: (er.schema?.score      ?? 0) < 50 },
    { category: 'OpenGraph',   metric: 'Social-Sharing-Optimierung',    group: 'seo', score: er.openGraph?.score   ?? 0, warning: (er.openGraph?.score   ?? 0) < 50 },
    { category: 'Technical',   metric: 'robots.txt / sitemap / canonical', group: 'seo', score: er.technical?.score ?? 0, warning: (er.technical?.score   ?? 0) < 50 },
    { category: 'Content',     metric: 'Headings, Alt-Texte, Meta-Länge', group: 'seo', score: er.content?.score   ?? 0, warning: (er.content?.score     ?? 0) < 50 },
    { category: 'Performance', metric: 'Ladezeit-Signale & Lazy Load',  group: 'seo', score: er.performance?.score ?? 0, warning: (er.performance?.score ?? 0) < 50 },
  ] : [];

  // Tabellenzeilen — Social Media
  const socialRows = sr ? [
    { category: 'Instagram', metric: 'Instagram-Profil & Reichweite', group: 'social', score: sr.instagram?.score ?? 0, ...socialStatusLabel(sr.instagram?.status) },
    { category: 'Facebook',  metric: 'Facebook-Seite & Engagement',   group: 'social', score: sr.facebook?.score  ?? 0, ...socialStatusLabel(sr.facebook?.status) },
    { category: 'TikTok',    metric: 'TikTok-Kanal & Follower',       group: 'social', score: sr.tiktok?.score    ?? 0, ...socialStatusLabel(sr.tiktok?.status) },
    { category: 'LinkedIn',  metric: 'LinkedIn-Unternehmensprofil',   group: 'social', score: sr.linkedin?.score  ?? 0, ...socialStatusLabel(sr.linkedin?.status) },
  ] : [];

  const allRows = [...websiteRows, ...seoRows, ...socialRows];

  // Filter-Buttons dynamisch
  const FILTERS = [
    { key: 'all',           label: 'Alle' },
    { key: 'SSL-Zertifikat',label: 'SSL' },
    { key: 'Mobile',        label: 'Mobile' },
    { key: 'Sichtbarkeit',  label: 'SEO' },
    { key: 'Bewertungen',   label: 'Bewertungen' },
    { key: 'Impressum',     label: 'Impressum' },
    ...(er ? [
      { key: 'Schema.org',  label: 'Schema' },
      { key: 'OpenGraph',   label: 'OG-Tags' },
      { key: 'Technical',   label: 'Technical' },
      { key: 'Content',     label: 'Content' },
      { key: 'Performance', label: 'Performance' },
    ] : []),
    ...(hasSocial ? [
      { key: 'Instagram', label: 'Instagram' },
      { key: 'Facebook',  label: 'Facebook' },
      { key: 'TikTok',    label: 'TikTok' },
      { key: 'LinkedIn',  label: 'LinkedIn' },
    ] : []),
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  let tableRows = activeFilter === 'all' ? allRows : allRows.filter((r) => r.category === activeFilter);
  if (sortField) {
    tableRows = [...tableRows].sort((a, b) =>
      sortDir === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
    );
  }

  return (
    <div className="space-y-8">
      {/* Website-Kategoriekarten */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-body">Website-Analyse</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {websiteCategories.map(({ icon, label, score }) => {
            const trend = getTrend(score);
            return (
              <CategoryCard key={label} icon={icon} label={label} score={score} trend={trend.label} trendColor={trend.color} />
            );
          })}
        </div>
      </div>

      {/* Erweiterte SEO-Unterkategorien */}
      {er && (
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-body">SEO-Detailanalyse</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {seoCategories.map(({ key, icon, label, score }) => {
              const trend = getTrend(score);
              return (
                <CategoryCard key={key} icon={icon} label={label} score={score} trend={trend.label} trendColor={trend.color} />
              );
            })}
          </div>
        </div>
      )}

      {/* Social-Media-Kategoriekarten */}
      {sr && (
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-body">Social Media</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialCategories.map(({ key, icon, label, score, muted, trend, trendColor }) => (
              <CategoryCard key={key} icon={icon} label={label} score={score} trend={trend} trendColor={trendColor} muted={muted} />
            ))}
          </div>
        </div>
      )}

      {/* Social Media Detail + Empfehlungen */}
      {hasSocial && sr && (
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-body">Social Media — Details & Empfehlungen</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['instagram', 'facebook', 'tiktok', 'linkedin'].map((platform) => (
              <SocialPlatformDetail key={platform} platform={platform} data={sr[platform]} />
            ))}
          </div>
        </div>
      )}

      {/* Detailtabelle */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3 bg-slate-50">
          <h3 className="font-bold text-slate-900 font-body">Überprüfte Kriterien</h3>
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-body ${
                  activeFilter === key
                    ? 'bg-primary text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/50'
                }`}
              >
                {label}
              </button>
            ))}
            <Activity size={18} className="text-primary ml-2" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100 font-body">
                <th className="px-6 py-4">Kategorie</th>
                <th className="px-6 py-4">Metrik</th>
                <th className="px-6 py-4">Status</th>
                <th
                  className="px-6 py-4 cursor-pointer hover:text-primary transition-colors select-none print:cursor-default"
                  onClick={() => handleSort('score')}
                >
                  <span className="flex items-center gap-1.5">
                    Score <SortIcon field="score" sortField={sortField} sortDir={sortDir} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableRows.map(({ category, metric, score, warning, notProvided, notFound }) => (
                <TableRow
                  key={category}
                  category={category}
                  metric={metric}
                  score={`${score}/100`}
                  warning={warning}
                  notProvided={notProvided}
                  notFound={notFound}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailCards;
