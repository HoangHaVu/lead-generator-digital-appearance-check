import { 
  Search,
  User,
  Palette,
  Settings2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Activity
} from 'lucide-react';

const CategoryCard = ({ icon, label, score, trend, trendColor }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
    <div className="flex justify-between items-start">
      <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className={`${trendColor} text-xs font-bold font-body`}>{trend}</span>
    </div>
    <div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider font-body">{label}</p>
      <p className="text-slate-900 text-3xl font-black">{score}</p>
    </div>
    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
      <div className="bg-primary h-full rounded-full" style={{ width: `${score}%` }}></div>
    </div>
  </div>
);

const TableRow = ({ category, metric, status, score, warning = false }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 font-semibold text-slate-900 font-body">{category}</td>
    <td className="px-6 py-4 text-slate-600 font-body">{metric}</td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 w-fit font-body ${
        warning ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
      }`}>
        {warning ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
        {status}
      </span>
    </td>
    <td className="px-6 py-4 font-black font-body">{score}</td>
  </tr>
);

const DetailCards = () => {
  return (
    <div className="space-y-8">
      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CategoryCard 
          icon={<Search size={20} className="text-primary" />}
          label="Sichtbarkeit"
          score={92}
          trend="+5%"
          trendColor="text-green-500"
        />
        <CategoryCard 
          icon={<User size={20} className="text-primary" />}
          label="Recruiting"
          score={78}
          trend="-2%"
          trendColor="text-red-500"
        />
        <CategoryCard 
          icon={<Palette size={20} className="text-primary" />}
          label="Design"
          score={88}
          trend="+10%"
          trendColor="text-green-500"
        />
        <CategoryCard 
          icon={<Settings2 size={20} className="text-primary" />}
          label="Technik"
          score={81}
          trend="+4%"
          trendColor="text-green-500"
        />
        <CategoryCard 
          icon={<FileText size={20} className="text-primary" />}
          label="Content"
          score={85}
          trend="+1%"
          trendColor="text-green-500"
        />
      </div>

      {/* Detail Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 font-body">Überprüfte Kriterien</h3>
          <Activity size={18} className="text-primary" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100 font-body">
                <th className="px-6 py-4">Kategorie</th>
                <th className="px-6 py-4">Metrik</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <TableRow category="Sichtbarkeit" metric="Google Indexing" status="Optimiert" score="98/100" />
              <TableRow category="Technik" metric="Mobile Page Speed" status="Warnung" score="72/100" warning />
              <TableRow category="Recruiting" metric="Karriere-Seite UX" status="Verfügbar" score="84/100" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailCards;
