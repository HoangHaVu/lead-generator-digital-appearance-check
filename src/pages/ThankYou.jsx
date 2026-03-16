import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ThankYouDetails from '../components/sections/ThankYouDetails';

const ThankYou = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <ThankYouDetails />
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
