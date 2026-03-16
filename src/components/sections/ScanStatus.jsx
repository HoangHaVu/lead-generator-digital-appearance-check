import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Database, Globe, Loader2 } from 'lucide-react';

const ScanDetail = ({ icon, label, status, active }) => (
  <div className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${active ? 'bg-primary/10 border-primary/30' : 'bg-slate-50 border-slate-100'}`}>
    <div className={`size-10 rounded-lg flex items-center justify-center ${active ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
      {active ? <Loader2 size={20} className="animate-spin" /> : icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase font-body">{label}</p>
      <p className={`text-sm font-bold font-body ${active ? 'text-primary' : 'text-slate-700'}`}>{status}</p>
    </div>
  </div>
);

const StatBox = ({ label, value, color = "text-slate-900" }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-body">{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

const ScanStatus = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Analysiere Website-Struktur...');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/questions'), 800);
          return 100;
        }
        
        // Update status text based on progress
        if (prev > 20 && prev < 40) setStatus('Prüfe SSL-Zertifikat...');
        if (prev > 40 && prev < 60) setStatus('Analysiere Mobile-Optimierung...');
        if (prev > 60 && prev < 80) setStatus('Sichtbarkeits-Check (SEO)...');
        if (prev > 80) setStatus('Erstelle Analyse-Zusammenfassung...');
        
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="w-full max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900">Analyse läuft...</h1>
        <p className="text-slate-600 text-lg font-body">Wir scannen Ihre digitale Präsenz auf Optimierungspotenziale.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-center bg-white p-8 rounded-3xl shadow-xl border border-primary/10">
        <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-4">
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

        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-slate-900">{status}</h3>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ScanDetail 
              icon={<ShieldCheck size={20} />}
              label="Security"
              status={progress > 30 ? 'Fertig' : 'Wartet...'}
              active={progress > 20 && progress <= 30}
            />
            <ScanDetail 
              icon={<Globe size={20} />}
              label="Mobile"
              status={progress > 50 ? 'Fertig' : 'Wartet...'}
              active={progress > 40 && progress <= 50}
            />
            <ScanDetail 
              icon={<Activity size={20} />}
              label="SEO"
              status={progress > 70 ? 'Fertig' : 'Wartet...'}
              active={progress > 60 && progress <= 70}
            />
            <ScanDetail 
              icon={<Database size={20} />}
              label="Reviews"
              status={progress > 90 ? 'Fertig' : 'Wartet...'}
              active={progress > 80 && progress <= 90}
            />
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox label="Assets gefunden" value={Math.floor(progress * 12.8)} />
        <StatBox label="Optimierungen" value={Math.floor(progress / 10)} color="text-amber-500" />
        <StatBox label="Scan-Dauer" value="00:12" />
      </div>
    </div>
  );
};

export default ScanStatus;
