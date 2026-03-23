import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLead } from '../../context/LeadContext';

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider font-body">{label}</p>
      <p className="text-slate-900 font-bold font-body">{value}</p>
    </div>
  </div>
);

const BookingDetails = ({ selectedDate, selectedTime, onSelectTime, timeSlots }) => {
  const navigate = useNavigate();
  const { setBookingData, saveLead } = useLead();

  const handleConfirm = () => {
    setBookingData({ date: selectedDate, time: selectedTime });
    saveLead();
    navigate('/close');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-slate-900 text-lg font-bold mb-6 font-body">Verfügbare Uhrzeiten</h3>
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map(time => (
            <button 
              key={time}
              onClick={() => onSelectTime(time)}
              className={`py-3 px-4 rounded-xl border-2 font-bold transition-all font-body ${
                selectedTime === time 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-slate-100 text-slate-700 hover:border-primary/50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/5 rounded-3xl border-2 border-primary/10 p-8"
      >
        <h3 className="text-slate-900 text-lg font-bold mb-6 font-body">Details zur Buchung</h3>
        <div className="space-y-4 mb-8">
          <DetailRow icon={<CalendarIcon size={18} />} label="Datum" value={`Donnerstag, ${selectedDate}. Oktober 2024`} />
          <DetailRow icon={<Clock size={18} />} label="Zeit" value={`${selectedTime} (30 Min.)`} />
          <DetailRow icon={<Video size={18} />} label="Ort" value="Google Meet Video Link" />
        </div>
        <button
          onClick={handleConfirm}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2 font-body"
        >
          Termin bestätigen
          <CheckCircle2 size={20} />
        </button>
        <p className="text-center text-slate-500 text-xs mt-4 italic font-body">Kostenlos und unverbindlich. Absage bis 24h vorher möglich.</p>
      </motion.div>
    </div>
  );
};

export default BookingDetails;
