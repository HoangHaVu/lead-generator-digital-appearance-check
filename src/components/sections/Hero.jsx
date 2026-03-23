import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Smartphone, Search, Star, FileText, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Neu: Digitalisierungs-Check 2024
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
          Wie digital ist Ihre Einrichtung <span className="text-primary italic">wirklich?</span>
        </h1>
        
        <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-body">
          Finden Sie es heraus mit unserer umfassenden Digitalisierungs-Analyse für moderne Pflegeeinrichtungen. Erhalten Sie sofortige Einblicke und Optimierungsvorschläge.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/input')}
            className="px-8 py-5 rounded-xl bg-cta hover:bg-cta/90 text-white text-lg font-bold transition-all shadow-xl shadow-cta/25 flex items-center justify-center gap-2 group font-body"
          >
            <span>Jetzt Analyse starten</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-lg font-bold transition-all flex items-center justify-center font-body"
          >
            Mehr erfahren
          </button>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img 
                  alt={`Benutzer ${i}`} 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 font-body">
            Über <span className="font-bold text-slate-900">500+</span> Einrichtungen nutzen bereits unsere Analyse.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-30" />

        {/* Dashboard Mockup */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-6 flex flex-col gap-5">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-body">Analyse-Ergebnis</p>
              <p className="text-slate-900 font-black">Pflegeheim Sonnenschein</p>
            </div>
            <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full font-body flex items-center gap-1">
              <TrendingUp size={12} /> Über Schnitt
            </span>
          </div>

          {/* Score Ring */}
          <div className="flex items-center gap-6 bg-primary/5 rounded-2xl p-5">
            <div className="relative shrink-0">
              <svg width="96" height="96" viewBox="0 0 100 100" className="-rotate-90">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#e2e8f0" strokeWidth="10" />
                <motion.circle
                  cx="50" cy="50" r="38" fill="transparent"
                  stroke="#0891B2" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray="238.76"
                  initial={{ strokeDashoffset: 238.76 }}
                  animate={{ strokeDashoffset: 238.76 - (238.76 * 84) / 100 }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.6 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900">84</span>
                <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Gut</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              {[
                { icon: <ShieldCheck size={12} />, label: 'SSL', val: 92 },
                { icon: <Smartphone size={12} />, label: 'Mobile', val: 78 },
                { icon: <Search size={12} />, label: 'SEO', val: 85 },
                { icon: <Star size={12} />, label: 'Bewertungen', val: 72 },
                { icon: <FileText size={12} />, label: 'Impressum', val: 90 },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-primary w-3 shrink-0">{icon}</span>
                  <span className="text-[10px] font-bold text-slate-500 w-16 shrink-0 font-body">{label}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-700 w-6 text-right font-body">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Empfehlungen', value: '5', color: 'text-amber-500' },
              { label: 'Potenzial', value: '+16%', color: 'text-green-500' },
              { label: 'Dauer', value: '< 2 Min', color: 'text-primary' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <p className={`text-lg font-black ${color}`}>{value}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-body mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA Badge */}
          <div className="bg-primary rounded-2xl px-5 py-3 flex items-center justify-between">
            <p className="text-white font-bold text-sm font-body">Kostenlose Analyse starten</p>
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
