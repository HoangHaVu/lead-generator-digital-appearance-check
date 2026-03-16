import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RecommendationsHero from '../components/sections/RecommendationsHero';
import QuickMetrics from '../components/sections/QuickMetrics';
import ActionPlan from '../components/sections/ActionPlan';

const Recommendations = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 lg:py-20 w-full">
        <div className="flex flex-col gap-10">
          <RecommendationsHero />
          <QuickMetrics />
          <ActionPlan />

          <div className="flex justify-center pb-20">
            <button className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:bg-white hover:border-primary hover:text-primary transition-all font-body">
              8 weitere Vorschläge laden
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations;
