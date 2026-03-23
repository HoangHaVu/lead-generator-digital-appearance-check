import { createContext, useContext, useState } from 'react';

const LeadContext = createContext(null);

export const LeadProvider = ({ children }) => {
  const [formData, setFormData] = useState({ url: '', name: '', email: '', facilityName: '' });
  const [socialHandles, setSocialHandles] = useState({ instagram: '', facebook: '', tiktok: '', linkedin: '' });
  const [scanResults, setScanResults] = useState(null);
  const [socialResults, setSocialResults] = useState(null);
  const [seoResults, setSeoResults] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [bookingData, setBookingData] = useState({ date: null, time: null });

  const saveLead = () => {
    const lead = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...formData,
      socialHandles,
      scanResults,
      socialResults,
      seoResults,
      quizAnswers,
      bookingData,
    };
    const existing = JSON.parse(localStorage.getItem('leads') || '[]');
    existing.push(lead);
    localStorage.setItem('leads', JSON.stringify(existing));
  };

  const resetLead = () => {
    setFormData({ url: '', name: '', email: '', facilityName: '' });
    setSocialHandles({ instagram: '', facebook: '', tiktok: '', linkedin: '' });
    setScanResults(null);
    setSocialResults(null);
    setSeoResults(null);
    setQuizAnswers({});
    setBookingData({ date: null, time: null });
  };

  return (
    <LeadContext.Provider value={{
      formData, setFormData,
      socialHandles, setSocialHandles,
      scanResults, setScanResults,
      socialResults, setSocialResults,
      seoResults, setSeoResults,
      quizAnswers, setQuizAnswers,
      bookingData, setBookingData,
      saveLead, resetLead,
    }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error('useLead must be used within LeadProvider');
  return ctx;
};
