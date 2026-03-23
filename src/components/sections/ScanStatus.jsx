import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Database, Globe, Loader2, Instagram, Facebook, Linkedin, Music2 } from 'lucide-react';
import { useLead } from '../../context/LeadContext';
import { fetchScanResults, fetchSocialResults, fetchSeoResults } from '../../utils/scanApi';

// ─── Scan-Schritte mit Labels ───────────────────────────────
const SCAN_STEPS = [
  { from: 0,  label: 'Analysiere Website-Struktur...' },
  { from: 15, label: 'Prüfe SSL-Zertifikat...' },
  { from: 30, label: 'Analysiere Mobile-Optimierung...' },
  { from: 45, label: 'Sichtbarkeits-Check (SEO)...' },
  { from: 60, label: 'Prüfe Online-Bewertungen...' },
  { from: 70, label: 'Scanne Social-Media-Profile...' },
  { from: 85, label: 'Erstelle Analyse-Zusammenfassung...' },
];

const getStepLabel = (progress) => {
  let label = SCAN_STEPS[0].label;
  for (const s of SCAN_STEPS) {
    if (progress >= s.from) label = s.label;
  }
  return label;
};

// ─── Sub-Komponenten ────────────────────────────────────────
const ScanDetail = ({ icon, label, status, active }) => (
  <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${active ? 'bg-primary/10 border-primary/30' : 'bg-slate-50 border-slate-100'}`}>
    <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
      {active ? <Loader2 size={18} className="animate-spin" /> : icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase font-body">{label}</p>
      <p className={`text-sm font-bold font-body ${active ? 'text-primary' : 'text-slate-700'}`}>{status}</p>
    </div>
  </div>
);

const StatBox = ({ label, value, color = 'text-slate-900' }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-body">{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

// ─── Hauptkomponente ────────────────────────────────────────
const ScanStatus = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(SCAN_STEPS[0].label);
  const navigate = useNavigate();
  const { formData, socialHandles, setScanResults, setSocialResults, setSeoResults } = useLead();

  // Drei unabhängige Done-Flags — alle müssen true sein vor Navigation
  const websiteDone  = useRef(false);
  const socialDone   = useRef(false);
  const seoDone      = useRef(false);
  const animDone     = useRef(false);
  const scoresRef    = useRef(null);
  const socialRef    = useRef(null);
  const seoRef       = useRef(null);

  // Mindestens ein Social-Handle angegeben?
  const hasSocialHandles = Object.values(socialHandles || {}).some(Boolean);

  const tryNavigate = () => {
    if (websiteDone.current && socialDone.current && seoDone.current && animDone.current) {
      setScanResults(scoresRef.current);
      setSocialResults(socialRef.current);
      setSeoResults(seoRef.current);
      setTimeout(() => navigate('/questions'), 800);
    }
  };

  // Alle drei API-Calls parallel starten
  useEffect(() => {
    // Website-Scan
    fetchScanResults(formData.url).then((scores) => {
      scoresRef.current = scores;
      websiteDone.current = true;
      tryNavigate();
    });

    // Erweiterter SEO-Scan
    fetchSeoResults(formData.url).then((results) => {
      seoRef.current = results;
      seoDone.current = true;
      tryNavigate();
    });

    // Social-Scan (sofort als done markieren wenn keine Handles angegeben)
    if (!hasSocialHandles) {
      socialDone.current = true;
    } else {
      fetchSocialResults(socialHandles).then((results) => {
        socialRef.current = results;
        socialDone.current = true;
        tryNavigate();
      });
    }
  }, []);

  // Fortschritts-Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Pausiere bei 99% bis alle drei APIs fertig sind
        if (prev >= 99 && (!websiteDone.current || !socialDone.current || !seoDone.current)) return 99;

        if (prev >= 100) {
          clearInterval(interval);
          animDone.current = true;
          tryNavigate();
          return 100;
        }

        setStatus(getStepLabel(prev));
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Dynamische Social-Cards — nur für angegebene Handles
  const socialCards = [
    { key: 'instagram', label: 'Instagram', icon: <Instagram size={18} />, activeFrom: 70, activeTo: 76 },
    { key: 'facebook',  label: 'Facebook',  icon: <Facebook  size={18} />, activeFrom: 76, activeTo: 80 },
    { key: 'tiktok',    label: 'TikTok',    icon: <Music2    size={18} />, activeFrom: 80, activeTo: 85 },
    { key: 'linkedin',  label: 'LinkedIn',  icon: <Linkedin  size={18} />, activeFrom: 85, activeTo: 90 },
  ].filter((c) => socialHandles?.[c.key]);

  return (
    <div className="w-full max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900">Analyse läuft...</h1>
        <p className="text-slate-600 text-lg font-body">Wir scannen Ihren kompletten digitalen Auftritt.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start bg-white p-8 rounded-3xl shadow-xl border border-primary/10">
        {/* Fortschritts-Kreis */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-4 pt-4">
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48">
              <circle
                className="text-slate-100"
                cx="96" cy="96" fill="transparent" r="80"
                stroke="currentColor" strokeWidth="8"
              />
              <circle
                className="text-primary transition-all duration-300"
                cx="96" cy="96" fill="transparent" r="80"
                stroke="currentColor" strokeWidth="8"
                strokeDasharray="502.6"
                strokeDashoffset={502.6 - (502.6 * progress) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-slate-900">{progress}%</span>
              <span className="text-sm font-medium text-primary uppercase tracking-widest font-body">Aktiv</span>
            </div>
          </div>
        </div>

        {/* Status + Scan-Cards */}
        <div className="lg:col-span-2 space-y-5">
          {/* Status-Text + Fortschrittsbalken */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-900">{status}</h3>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Website-Checks */}
          <div className="grid grid-cols-2 gap-3">
            <ScanDetail
              icon={<ShieldCheck size={18} />}
              label="Security"
              status={progress > 30 ? 'Fertig' : 'Wartet...'}
              active={progress > 15 && progress <= 30}
            />
            <ScanDetail
              icon={<Globe size={18} />}
              label="Mobile"
              status={progress > 45 ? 'Fertig' : 'Wartet...'}
              active={progress > 30 && progress <= 45}
            />
            <ScanDetail
              icon={<Activity size={18} />}
              label="SEO"
              status={progress > 60 ? 'Fertig' : 'Wartet...'}
              active={progress > 45 && progress <= 60}
            />
            <ScanDetail
              icon={<Database size={18} />}
              label="Bewertungen"
              status={progress > 70 ? 'Fertig' : 'Wartet...'}
              active={progress > 60 && progress <= 70}
            />
          </div>

          {/* Social-Media-Checks — nur wenn Handles angegeben */}
          {socialCards.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-body">Social Media</p>
              <div className="grid grid-cols-2 gap-3">
                {socialCards.map((card) => (
                  <ScanDetail
                    key={card.key}
                    icon={card.icon}
                    label={card.label}
                    status={progress > card.activeTo ? 'Fertig' : 'Wartet...'}
                    active={progress > card.activeFrom && progress <= card.activeTo}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistik-Boxen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox label="Datenpunkte analysiert" value={Math.floor(progress * 14.2)} />
        <StatBox label="Optimierungen gefunden" value={Math.floor(progress / 10)} color="text-amber-500" />
        <StatBox
          label="Kanäle geprüft"
          value={`${hasSocialHandles ? socialCards.length + 1 : 1}`}
          color="text-primary"
        />
      </div>
    </div>
  );
};

export default ScanStatus;
