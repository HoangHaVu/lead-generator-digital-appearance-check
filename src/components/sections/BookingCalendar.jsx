import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookingCalendar = ({ onSelectDate, selectedDate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm"
    >
      <div className="flex items-center justify-between mb-8">
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-slate-900 text-lg font-bold font-body">Oktober 2024</h3>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map(day => (
          <span key={day} className="text-slate-400 text-xs font-bold uppercase tracking-wider py-2 font-body">{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
          <button 
            key={day}
            onClick={() => onSelectDate(day)}
            className={`h-12 flex items-center justify-center font-bold rounded-xl transition-all font-body ${
              selectedDate === day 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default BookingCalendar;
