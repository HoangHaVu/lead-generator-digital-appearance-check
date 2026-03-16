import { useState } from 'react';
import { Lock, RotateCcw, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookingCalendar from '../components/sections/BookingCalendar';
import BookingDetails from '../components/sections/BookingDetails';

const InfoItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-slate-900 mb-1 font-body">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed font-body">{desc}</p>
    </div>
  </div>
);

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('09:00 AM');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:30 PM', '04:00 PM'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 lg:py-20 w-full">
        <div className="flex flex-col gap-8">
          {/* Hero Section */}
          <div className="flex flex-col gap-3">
            <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Strategie-Gespräch buchen</h1>
            <p className="text-slate-600 text-lg font-normal max-w-2xl font-body">Wählen Sie einen passenden Termin für Ihre kostenlose 30-minütige Erstberatung. Wir besprechen Ihre persönlichen Ergebnisse.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <BookingCalendar 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate} 
            />
            <BookingDetails 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              timeSlots={timeSlots}
            />
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-200">
            <InfoItem 
              icon={<Zap className="text-primary" />} 
              title="Sofort-Bestätigung" 
              desc="Sie erhalten die Einladung inkl. Video-Link sofort per E-Mail." 
            />
            <InfoItem 
              icon={<Lock className="text-primary" />} 
              title="Sicher & Privat" 
              desc="Ihre Daten werden verschlüsselt und nicht an Dritte weitergegeben." 
            />
            <InfoItem 
              icon={<RotateCcw className="text-primary" />} 
              title="Flexible Planung" 
              desc="Verschieben oder stornieren Sie den Termin mit nur einem Klick." 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
