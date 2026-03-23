import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Download, Trash2, Users, TrendingUp, Calendar, LogOut } from 'lucide-react';

const ADMIN_PASSWORD = 'pflege2025';

const exportToCsv = (leads) => {
  const headers = [
    'ID', 'Datum', 'Name', 'E-Mail', 'Einrichtung', 'URL',
    'Score-Gesamt', 'SSL', 'Mobile', 'SEO', 'Bewertungen', 'Impressum',
    'Buchungsdatum', 'Buchungszeit',
    'Quiz-Recruiting', 'Quiz-Social', 'Quiz-Mobile'
  ];

  const rows = leads.map((l) => [
    l.id,
    l.createdAt ? new Date(l.createdAt).toLocaleString('de-DE') : '—',
    l.name || '—',
    l.email || '—',
    l.facilityName || '—',
    l.url || '—',
    l.scanResults?.total ?? '—',
    l.scanResults?.ssl ?? '—',
    l.scanResults?.mobile ?? '—',
    l.scanResults?.seo ?? '—',
    l.scanResults?.reviews ?? '—',
    l.scanResults?.impressum ?? '—',
    l.bookingData?.date ? `${l.bookingData.date}. Oktober 2025` : '—',
    l.bookingData?.time || '—',
    l.quizAnswers?.recruiting || '—',
    l.quizAnswers?.social || '—',
    l.quizAnswers?.mobile || '—',
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
    .join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm">
    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider font-body">{label}</p>
      <p className="text-slate-900 text-2xl font-black">{value}</p>
    </div>
  </div>
);

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const leads = JSON.parse(localStorage.getItem('leads') || '[]');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Falsches Passwort.');
    }
  };

  const handleDeleteLead = (id) => {
    const updated = leads.filter((l) => l.id !== id);
    localStorage.setItem('leads', JSON.stringify(updated));
    window.location.reload();
  };

  const handleDeleteAll = () => {
    if (window.confirm('Alle Leads unwiderruflich löschen?')) {
      localStorage.removeItem('leads');
      window.location.reload();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 w-full max-w-sm space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Admin-Bereich</h1>
            <p className="text-slate-500 text-sm font-body">Nur für interne Nutzung.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body text-slate-900"
            />
            {error && <p className="text-red-500 text-sm font-body">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all font-body"
            >
              Anmelden
            </button>
          </form>
          <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-400 font-body space-y-1">
            <p className="font-bold text-slate-500">Test-Zugangsdaten</p>
            <p>Passwort: <span className="font-mono text-slate-700">pflege2025</span></p>
          </div>
        </motion.div>
      </div>
    );
  }

  const avgScore = leads.length
    ? Math.round(leads.reduce((s, l) => s + (l.scanResults?.total ?? 0), 0) / leads.length)
    : 0;

  const withBooking = leads.filter((l) => l.bookingData?.date).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Lead-Verwaltung</h1>
          <p className="text-slate-500 text-sm font-body">Digitaler Auftritt Check — Messe-Leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToCsv(leads)}
            disabled={leads.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body shadow-lg shadow-primary/20"
          >
            <Download size={16} /> CSV exportieren
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all font-body"
          >
            <LogOut size={16} /> Abmelden
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={<Users size={22} />} label="Gesamt-Leads" value={leads.length} />
          <StatCard icon={<TrendingUp size={22} />} label="Ø Score" value={avgScore || '—'} />
          <StatCard icon={<Calendar size={22} />} label="Buchungen" value={withBooking} />
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 font-body">{leads.length} Lead{leads.length !== 1 ? 's' : ''}</h2>
            {leads.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="text-red-500 text-sm font-bold hover:underline font-body flex items-center gap-1"
              >
                <Trash2 size={14} /> Alle löschen
              </button>
            )}
          </div>

          {leads.length === 0 ? (
            <div className="py-20 text-center text-slate-400 font-body">
              Noch keine Leads gespeichert.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100 font-body">
                    <th className="px-6 py-4">Datum</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Einrichtung</th>
                    <th className="px-6 py-4">E-Mail</th>
                    <th className="px-6 py-4">URL</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Buchung</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...leads].reverse().map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-500 font-body text-xs whitespace-nowrap">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 font-body whitespace-nowrap">{lead.name || '—'}</td>
                      <td className="px-6 py-4 text-slate-600 font-body">{lead.facilityName || '—'}</td>
                      <td className="px-6 py-4 text-slate-600 font-body">{lead.email || '—'}</td>
                      <td className="px-6 py-4 text-slate-500 font-body max-w-[160px] truncate" title={lead.url}>{lead.url || '—'}</td>
                      <td className="px-6 py-4">
                        {lead.scanResults?.total != null ? (
                          <span className={`font-black text-lg ${lead.scanResults.total >= 85 ? 'text-green-600' : lead.scanResults.total >= 70 ? 'text-primary' : 'text-amber-500'}`}>
                            {lead.scanResults.total}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-body whitespace-nowrap">
                        {lead.bookingData?.date ? `${lead.bookingData.date}. Okt — ${lead.bookingData.time}` : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                          title="Lead löschen"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
