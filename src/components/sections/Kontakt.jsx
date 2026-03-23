import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-body">{label}</p>
      <p className="text-slate-900 font-semibold font-body mt-0.5">{value}</p>
    </div>
  </div>
);

const inputClass = "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 font-body";

const Kontakt = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Speichert die Anfrage in localStorage — kann später an ein Backend übergeben werden
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push({ ...form, id: Date.now(), createdAt: new Date().toISOString() });
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    setSent(true);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Left: Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            Kontakt
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Sprechen wir über<br /><span className="text-primary italic">Ihre Einrichtung.</span>
          </h2>
          <p className="text-lg text-slate-600 font-body leading-relaxed">
            Haben Sie Fragen zu unseren Leistungen oder möchten Sie direkt ein Gespräch vereinbaren? Schreiben Sie uns — wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <ContactInfo icon={<Mail size={18} />} label="E-Mail" value="info@deutsche-pflegefilme.de" />
          <ContactInfo icon={<Phone size={18} />} label="Telefon" value="+49 (0) 123 456 789" />
          <ContactInfo icon={<MapPin size={18} />} label="Adresse" value="Musterstraße 1, 80333 München" />
        </div>
      </motion.div>

      {/* Right: Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10"
      >
        {sent ? (
          <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
            <div className="size-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-xl shadow-green-500/20">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Nachricht gesendet!</h3>
            <p className="text-slate-500 font-body">Vielen Dank. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            <button
              onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
              className="text-primary font-bold text-sm font-body hover:underline"
            >
              Weitere Nachricht senden
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="text-xl font-black text-slate-900">Nachricht schreiben</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Name *</label>
                <input required name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Max Mustermann" type="text" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Telefon</label>
                <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+49 123 456 789" type="tel" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">E-Mail *</label>
              <input required name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="name@einrichtung.de" type="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Nachricht *</label>
              <textarea required name="message" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Wie können wir Ihnen helfen?" rows={4} />
            </div>
            <button
              type="submit"
              className="w-full bg-cta hover:bg-cta/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-cta/20 transition-all flex items-center justify-center gap-2 font-body"
            >
              Nachricht senden
              <Send size={18} />
            </button>
            <p className="text-center text-xs text-slate-400 font-body">
              Mit dem Absenden stimmen Sie unserer <button type="button" className="underline hover:text-primary transition-colors">Datenschutzerklärung</button> zu.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Kontakt;
