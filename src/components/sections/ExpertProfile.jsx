import { motion } from 'framer-motion';

const ExpertProfile = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 w-full max-w-md lg:max-w-none"
    >
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-[40px] blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80" 
            alt="Dr. Markus Weber" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50">
            <p className="text-primary font-bold text-sm mb-1 uppercase tracking-wider font-body">Top Experte des Monats</p>
            <h3 className="font-black text-2xl text-slate-900 font-body">Dr. Markus Weber</h3>
            <p className="text-slate-500 text-sm italic font-medium font-body">"Ihr Erfolg ist meine Mission."</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpertProfile;
