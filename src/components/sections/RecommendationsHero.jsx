import { useNavigate } from 'react-router-dom';
import { FileDown, CheckCircle2 } from 'lucide-react';

const RecommendationsHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-between items-end gap-4">
      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider font-body">
          <CheckCircle2 size={16} />
          <span>Analyse abgeschlossen - April 2024</span>
        </div>
        <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Optimierungs-Roadmap</h1>
        <p className="text-slate-600 text-lg font-body">Wir haben die wichtigsten Hebel für Ihren Erfolg identifiziert. Diese Maßnahmen können Ihre Bewerberquote um bis zu 14.5% steigern.</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-white text-slate-900 text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm font-body">
          <FileDown size={18} className="mr-2" /> Export PDF
        </button>
        <button 
          onClick={() => navigate('/booking')}
          className="flex items-center justify-center rounded-xl h-11 px-8 bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 font-body"
        >
          Strategie-Gespräch buchen
        </button>
      </div>
    </div>
  );
};

export default RecommendationsHero;
