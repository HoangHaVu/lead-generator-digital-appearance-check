import { Lightbulb, Award, CalendarCheck, Star } from 'lucide-react';

const BenefitItem = ({ icon, title, desc }) => (
  <div className="flex flex-col gap-4 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-slate-900 font-body">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed font-body">{desc}</p>
    </div>
  </div>
);

const BenefitGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BenefitItem 
        icon={<Lightbulb />} 
        title="Tiefenanalyse" 
        desc="Eingehende Diskussion Ihrer persönlichen Ergebnisse und Potenziale." 
      />
      <BenefitItem 
        icon={<Award />} 
        title="Strategie-Plan" 
        desc="Schritt-für-Schritt Fahrplan zur direkten Umsetzung." 
      />
      <BenefitItem 
        icon={<CalendarCheck />} 
        title="Termintreue" 
        desc="Absolut pünktliche und fokussierte Beraterzeit für Ihr Anliegen." 
      />
      <BenefitItem 
        icon={<Star />} 
        title="Expertise" 
        desc="Zugriff auf Know-how aus über 250 erfolgreichen Projekten." 
      />
    </div>
  );
};

export default BenefitGrid;
