const StatCard = ({ label, value }) => (
  <div className="flex flex-col gap-3 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
    <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">{label}</p>
    <p className="text-4xl font-black text-slate-900">{value}</p>
    <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
  </div>
);

export default StatCard;
