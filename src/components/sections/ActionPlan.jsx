import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const recommendations = [
  {
    id: 'REC-001',
    priority: 'Kritisch',
    title: 'Recruiting-Video Integration',
    desc: 'Bauen Sie authentische Videos Ihrer Mitarbeiter auf der Karriereseite ein. Dies erhöht das Vertrauen und die Bewerbungsrate um bis zu 24%.',
    impact: 'Hoch',
    category: 'Recruiting',
    steps: [
      'Erstellung von 3 kurzen Team-Interviews',
      'Einbindung im Header der Karriereseite',
      'Automatisches Abspielen ohne Ton (Untertitel)',
      'Call-to-Action direkt nach dem Video'
    ],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'
  }
];

const ActionPlan = () => {
  return (
    <div className="space-y-12">
      {recommendations.map((rec, idx) => (
        <motion.section 
          key={rec.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`h-8 w-1.5 rounded-full ${rec.priority === 'Kritisch' ? 'bg-red-500' : 'bg-primary'}`} />
            <h2 className="text-slate-900 text-2xl font-bold font-body">Prioritär: {rec.title}</h2>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col lg:flex-row">
            <div className="lg:w-1/3 relative min-h-[300px]">
              <img 
                src={rec.image} 
                alt={rec.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute top-4 left-4 ${rec.priority === 'Kritisch' ? 'bg-red-500' : 'bg-primary'} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase font-body`}>
                {rec.category}
              </div>
            </div>
            
            <div className="flex-1 p-8 lg:p-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                  <span className={`text-xs font-bold uppercase tracking-widest font-body ${rec.priority === 'Kritisch' ? 'text-red-600' : 'text-primary'}`}>
                    {rec.priority}er Impact
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">{rec.title}</h3>
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 tracking-wider font-body">
                  ID: {rec.id}
                </div>
              </div>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-body">
                {rec.desc}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-body">
                  <CheckCircle2 size={18} className="text-primary" />
                  Vorgeschlagene Schritte:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {rec.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                      <div className="size-5 rounded border-2 border-slate-200 mt-0.5 group-hover:border-primary transition-colors" />
                      <span className="text-sm text-slate-700 font-body">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                <button className="text-primary font-bold text-sm hover:translate-x-1 transition-transform flex items-center gap-2 font-body">
                  Detaillierte Analyse-Daten <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default ActionPlan;
