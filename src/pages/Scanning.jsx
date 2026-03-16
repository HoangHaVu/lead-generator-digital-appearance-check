import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScanStatus from '../components/sections/ScanStatus';

const Scanning = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 px-6 py-12 lg:py-20 flex flex-col items-center justify-center">
        <ScanStatus />
      </main>

      <Footer />
    </div>
  );
};

export default Scanning;
