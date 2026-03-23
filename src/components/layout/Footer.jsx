import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 opacity-70 cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-primary scale-75">
            <Activity size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Deutsche Pflegefilme</h2>
        </div>

        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <button onClick={() => navigate('/impressum')} className="hover:text-primary transition-colors">Impressum</button>
          <button onClick={() => navigate('/datenschutz')} className="hover:text-primary transition-colors">Datenschutz</button>
          <button onClick={() => navigate('/impressum')} className="hover:text-primary transition-colors">AGB</button>
        </div>

        <p className="text-sm text-slate-500">© 2025 Deutsche Pflegefilme. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;
