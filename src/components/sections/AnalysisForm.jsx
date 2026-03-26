import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Globe, User, Mail, Building2, ArrowRight, Instagram, Facebook, Linkedin, Music2, ChevronDown } from 'lucide-react';
import { useLead } from '../../context/LeadContext';

const AnalysisForm = () => {
  const navigate = useNavigate();
  const { setFormData, setSocialHandles } = useLead();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [socialOpen, setSocialOpen] = useState(true);
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ url, name, email, facilityName });
    setSocialHandles({ instagram, facebook, tiktok, linkedin });
    navigate('/scan');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[640px] space-y-8"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
          <Activity className="text-primary" size={32} />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          Kostenlose Analyse anfordern
        </h2>
        <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed font-body">
          Geben Sie Ihre Website-URL und Ihre Kontaktdaten ein, um eine detaillierte Analyse Ihres digitalen Pflegemarkt-Auftritts zu erhalten.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Website URL - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Website URL</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Globe size={18} />
              </span>
              <input
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 font-body"
                placeholder="https://ihre-einrichtung.de"
                type="url"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 font-body"
                placeholder="Max Mustermann"
                type="text"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">E-Mail Adresse</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </span>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 font-body"
                placeholder="name@einrichtung.de"
                type="email"
              />
            </div>
          </div>

          {/* Organization */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Name der Einrichtung</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Building2 size={18} />
              </span>
              <input
                required
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 font-body"
                placeholder="Pflegeheim Sonnenschein"
                type="text"
              />
            </div>
          </div>

          {/* Social Media — ausklappbar */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={() => setSocialOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-600 font-body"
            >
              <span className="flex items-center gap-2">
                <Instagram size={16} className="text-primary" />
                Social Media Profile hinzufügen
                <span className="text-xs font-normal text-slate-400">(optional — für vollständige Analyse)</span>
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${socialOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {/* Instagram */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Instagram</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-400">
                          <Instagram size={16} />
                        </span>
                        <input
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-body"
                          placeholder="@ihr-profil"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Facebook</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-500">
                          <Facebook size={16} />
                        </span>
                        <input
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-body"
                          placeholder="ihre-seite"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* TikTok */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">TikTok</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-800">
                          <Music2 size={16} />
                        </span>
                        <input
                          value={tiktok}
                          onChange={(e) => setTiktok(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-body"
                          placeholder="@ihr-kanal"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">LinkedIn</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-700">
                          <Linkedin size={16} />
                        </span>
                        <input
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-body"
                          placeholder="unternehmensname"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group font-body" 
              type="submit"
            >
              Analyse starten
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-center text-xs text-slate-500 font-body">
              Durch das Absenden erklären Sie sich mit unseren <a className="underline" href="#">Nutzungsbedingungen</a> und <a className="underline" href="#">Datenschutzbestimmungen</a> einverstanden.
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AnalysisForm;
