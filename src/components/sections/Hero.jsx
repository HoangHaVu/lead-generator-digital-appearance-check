import { motion } from 'framer-motion';
import { ArrowRight, PieChart } from 'lucide-react';
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
          <button className="px-8 py-5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-lg font-bold transition-all flex items-center justify-center font-body">
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
        <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-30"></div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video lg:aspect-square bg-slate-100">
          <img 
            alt="Modern Healthcare Technology" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800"
          />
          <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-primary uppercase font-body">Live Report</p>
              <p className="text-lg font-bold text-slate-900 font-body">Digitaler Fortschritt 2024</p>
            </div>
            <div className="bg-primary/20 p-2 rounded-lg">
              <PieChart className="text-primary" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
