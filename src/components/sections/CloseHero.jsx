import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const CloseHero = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/thanks');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 space-y-8"
    >
      <div className="space-y-4">
        <span className="text-primary font-bold tracking-widest uppercase text-xs font-body">Premium Beratung</span>
        <h1 className="text-slate-900 text-5xl lg:text-7xl font-black leading-tight tracking-tight">
          Exzellente Beratung für Ihren Erfolg
        </h1>
        <p className="text-slate-600 text-xl font-normal leading-relaxed max-w-xl font-body">
          Erhalten Sie maßgeschneiderte Unterstützung von unseren top-bewerteten Branchenexperten. Setzen Sie die Analyse-Ergebnisse direkt in die Tat um.
        </p>
      </div>

      {/* Phone Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row w-full max-w-xl items-stretch rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
          <div className="flex flex-1 items-center bg-white px-6 py-4">
            <Phone className="text-slate-400 mr-4" size={24} />
            <input 
              required
              type="tel"
              className="w-full border-none focus:ring-0 text-lg placeholder:text-slate-400 font-medium font-body"
              placeholder="Ihre Telefonnummer"
            />
          </div>
          <button 
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-5 text-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap font-body"
          >
            Termin sichern
            <ArrowRight size={20} />
          </button>
        </div>
        <p className="text-sm text-slate-500 flex items-center gap-2 px-2 font-body">
          <ShieldCheck size={16} className="text-primary" /> 
          Kostenloses Erstgespräch. Keine Verpflichtung.
        </p>
      </form>
    </motion.div>
  );
};

export default CloseHero;
