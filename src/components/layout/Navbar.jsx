import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-primary">
            <Activity size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Deutsche Pflegefilme</h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Home</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Über uns</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Leistungen</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Kontakt</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
