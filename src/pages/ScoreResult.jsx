import { useNavigate } from 'react-router-dom';
import { FileDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ResultDashboard from '../components/sections/ResultDashboard';
import DetailCards from '../components/sections/DetailCards';

const ScoreResult = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Analyse-Ergebnis</h2>
              <p className="text-slate-500 text-lg font-body">Detaillierte Auswertung Ihres digitalen Auftritts.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors font-body">
                <FileDown size={18} /> Export PDF
              </button>
              <button 
                onClick={() => navigate('/recommendations')}
                className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity font-body shadow-lg shadow-primary/20"
              >
                Empfehlungen ansehen
              </button>
            </div>
          </div>

          <ResultDashboard />
          <DetailCards />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ScoreResult;
