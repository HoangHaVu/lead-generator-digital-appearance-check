import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Video, User, Home, Download, Mail } from 'lucide-react';
import { useLead } from '../../context/LeadContext';

const SuccessCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-white">
    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider font-body">{label}</p>
      <p className="text-slate-900 font-bold font-body">{value}</p>
    </div>
  </div>
);

const ThankYouDetails = () => {
  const navigate = useNavigate();
  const { formData, bookingData } = useLead();
  const dateLabel = bookingData.date ? `${bookingData.date}. Oktober 2025` : '—';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl w-full bg-white/40 backdrop-blur-3xl rounded-[40px] border border-white/50 shadow-2xl overflow-hidden p-8 lg:p-16 flex flex-col items-center text-center space-y-12"
    >
      <div className="space-y-6">
        <div className="relative mx-auto size-24">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="size-24 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl shadow-green-500/20"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 rounded-full border-2 border-green-500/30 -z-10"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight">Vielen Dank!</h1>
          <p className="text-slate-600 text-xl max-w-lg mx-auto font-body">Anfrage erfolgreich versendet. Wir freuen uns auf das Gespräch mit Ihnen!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <SuccessCard icon={<Calendar size={18} />} label="Vorgemerkt am" value={dateLabel} />
        <SuccessCard icon={<Video size={18} />} label="Format" value="Video-Call" />
        <SuccessCard icon={<User size={18} />} label="Berater" value="Dr. M. Weber" />
      </div>

      <div className="w-full bg-primary/5 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-slate-900 font-body flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              E-Mail unterwegs
            </h4>
            <p className="text-sm text-slate-500 font-body">
              Termin-Details & Vorbereitungsliste wurden an {formData.email || 'Sie'} gesendet.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all font-body">
            <Download size={18} /> Fallstudien (PDF)
          </button>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 group text-slate-500 hover:text-primary font-bold transition-all font-body"
      >
        <Home size={18} />
        Zurück zur Startseite
        <CheckCircle2 className="size-0 group-hover:size-4 opacity-0 group-hover:opacity-100 transition-all" />
      </button>
    </motion.div>
  );
};

export default ThankYouDetails;
