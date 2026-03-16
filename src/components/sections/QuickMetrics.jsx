import { AlertTriangle, TrendingUp, Zap } from 'lucide-react';

const MetricCard = ({ label, value, trend, icon, trendColor, bgColor, isProgress }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider font-body">{label}</p>
      <div className={`p-2 rounded-lg ${bgColor}`}>
        {icon}
      </div>
    </div>
    <p className="text-slate-900 text-3xl font-black">{value}</p>
    {isProgress ? (
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
        <div className="bg-blue-500 h-full w-[35%] rounded-full" />
      </div>
    ) : (
      <div className={`flex items-center gap-1 text-sm font-bold font-body ${trendColor}`}>
        <span>{trend}</span>
      </div>
    )}
  </div>
);

const QuickMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard 
        label="Kritische Themen" 
        value="12" 
        trend="+2" 
        icon={<AlertTriangle className="text-red-500" />} 
        trendColor="text-red-600"
        bgColor="bg-red-50"
      />
      <MetricCard 
        label="Erwarteter Impact" 
        value="14.5%" 
        trend="Konversion" 
        icon={<TrendingUp className="text-green-500" />} 
        trendColor="text-green-600"
        bgColor="bg-green-50"
      />
      <MetricCard 
        label="Umsetzungsstatus" 
        value="35%" 
        isProgress 
        icon={<Zap className="text-blue-500" />} 
        bgColor="bg-blue-50"
      />
    </div>
  );
};

export default QuickMetrics;
