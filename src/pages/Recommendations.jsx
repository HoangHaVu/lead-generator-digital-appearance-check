import { useNavigate } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RecommendationsHero from '../components/sections/RecommendationsHero';
import QuickMetrics from '../components/sections/QuickMetrics';
import ActionPlan from '../components/sections/ActionPlan';

const BookingCta = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-6 py-16 px-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
      <div className="p-4 bg-primary/10 rounded-2xl">
        <CalendarCheck size={32} className="text-primary" />
      </div>
      <div className="flex flex-col gap-2 max-w-lg">
        <h3 className="text-slate-900 text-2xl font-black font-body">
          Alle Maßnahmen professionell umsetzen?
        </h3>
        <p className="text-slate-500 font-body">
          In einem kostenlosen Strategie-Gespräch zeigen wir Ihnen, welche Hebel den
          größten Impact haben — und wie wir die Umsetzung für Sie übernehmen.
        </p>
      </div>
      <button
        onClick={() => navigate('/booking')}
        className="flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-full hover:brightness-110 transition-all shadow-lg shadow-primary/20 font-body"
      >
        <CalendarCheck size={18} />
        Kostenloses Strategie-Gespräch buchen
      </button>
    </div>
  );
};

const Recommendations = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 lg:py-20 w-full">
        <div className="flex flex-col gap-10">
          <RecommendationsHero />
          <QuickMetrics />
          <ActionPlan />
          <BookingCta />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations;
