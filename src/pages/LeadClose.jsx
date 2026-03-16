import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CloseHero from '../components/sections/CloseHero';
import ExpertProfile from '../components/sections/ExpertProfile';
import BenefitGrid from '../components/sections/BenefitGrid';

const LeadClose = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 px-6 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <CloseHero />
            <ExpertProfile />
          </div>

          <BenefitGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeadClose;
