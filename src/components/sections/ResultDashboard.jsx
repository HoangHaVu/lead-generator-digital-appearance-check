import { motion } from 'framer-motion';

const ResultDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Donut Hero */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-sm"
      >
        <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle className="text-slate-100" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="10"></circle>
            <motion.circle 
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * 84) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-primary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeWidth="10" strokeLinecap="round" 
            ></motion.circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-slate-900">84</span>
            <span className="text-sm font-bold text-primary uppercase tracking-widest font-body">Exzellent</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-slate-900 font-bold font-body">Gesamt-Score</h3>
          <p className="text-slate-500 text-sm mt-1 font-body">Basierend auf 124 Datenpunkten</p>
        </div>
      </motion.div>

      {/* Main Trend Illustration/Chart Placeholder */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 flex flex-col shadow-sm"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-500 text-sm font-medium font-body">Vergleich zum Branchendurchschnitt</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-900">+12%</span>
              <span className="text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded text-xs leading-none font-body">Über Schnitt</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-end gap-2 h-40">
          {[40, 60, 45, 90, 75, 84].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className={`flex-1 rounded-t-lg ${i === 5 ? 'bg-primary' : 'bg-slate-200'}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider text-center flex-1 font-body">Website</p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider text-center flex-1 font-body">Mobile</p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider text-center flex-1 font-body">Technik</p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider text-center flex-1 font-body">Reviews</p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider text-center flex-1 font-body">SEO</p>
          <p className="text-primary text-[10px] font-bold uppercase tracking-wider text-center flex-1 font-body">Gesamt</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultDashboard;
