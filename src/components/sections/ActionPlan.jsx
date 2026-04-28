import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useLead } from '../../context/LeadContext';
import { generateRecommendations } from '../../utils/generateRecommendations';

const PRIORITY_COLORS = {
  Kritisch: { bar: 'bg-red-500', badge: 'bg-red-500', text: 'text-red-600' },
  Hoch: { bar: 'bg-amber-500', badge: 'bg-amber-500', text: 'text-amber-600' },
  Mittel: { bar: 'bg-primary', badge: 'bg-primary', text: 'text-primary' },
};

const CATEGORY_IMAGES = {
  Sicherheit: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
  Mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60',
  SEO: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=60',
  Reputation: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=60',
  Rechtliches: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60',
  'Social Media': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
  'SEO Detail': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60';

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
    <div className="p-5 bg-green-50 rounded-full">
      <CheckCircle2 size={40} className="text-green-500" />
    </div>
    <h3 className="text-slate-900 text-2xl font-bold font-body">Alles in bester Ordnung</h3>
    <p className="text-slate-500 font-body max-w-md">
      Keine kritischen Maßnahmen gefunden. Führen Sie zuerst einen vollständigen Scan durch,
      um personalisierte Empfehlungen zu erhalten.
    </p>
  </div>
);

const RecCard = ({ rec, idx, onBook }) => {
  const colors = PRIORITY_COLORS[rec.priority] ?? PRIORITY_COLORS.Mittel;
  const image = CATEGORY_IMAGES[rec.category] ?? FALLBACK_IMAGE;

  return (
    <motion.section
      key={rec.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-8 w-1.5 rounded-full ${colors.bar}`} />
        <h2 className="text-slate-900 text-2xl font-bold font-body">
          {rec.priority === 'Kritisch' ? 'Dringend: ' : 'Empfohlen: '}{rec.title}
        </h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col lg:flex-row">
        <div className="lg:w-1/3 relative min-h-[300px]">
          <img
            src={image}
            alt={rec.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute top-4 left-4 ${colors.badge} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase font-body`}>
            {rec.category}
          </div>
        </div>

        <div className="flex-1 p-8 lg:p-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
              <span className={`text-xs font-bold uppercase tracking-widest font-body ${colors.text}`}>
                {rec.priority}er Handlungsbedarf
              </span>
              <h3 className="text-2xl font-black text-slate-900">{rec.title}</h3>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 tracking-wider font-body">
                {rec.id}
              </div>
              {rec.score > 0 && (
                <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 font-body">
                  Score: {rec.score}/100
                </div>
              )}
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
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group"
                >
                  <div className="size-5 rounded border-2 border-slate-200 mt-0.5 group-hover:border-primary transition-colors flex-shrink-0" />
                  <span className="text-sm text-slate-700 font-body">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
            <button
              onClick={onBook}
              className="text-primary font-bold text-sm hover:translate-x-1 transition-transform flex items-center gap-2 font-body"
            >
              Strategie-Gespräch buchen <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const ActionPlan = () => {
  const navigate = useNavigate();
  const { scanResults, socialResults, seoResults } = useLead();
  const recs = generateRecommendations(scanResults, socialResults, seoResults);

  if (recs.length === 0) return <EmptyState />;

  return (
    <div className="space-y-12">
      {recs.map((rec, idx) => (
        <RecCard key={rec.id} rec={rec} idx={idx} onBook={() => navigate('/booking')} />
      ))}
    </div>
  );
};

export default ActionPlan;
