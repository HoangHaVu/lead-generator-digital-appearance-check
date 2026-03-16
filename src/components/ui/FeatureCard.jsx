import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-primary/50 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default FeatureCard;
