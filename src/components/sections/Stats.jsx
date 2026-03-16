import StatCard from '../ui/StatCard';

const Stats = () => {
  return (
    <div className="bg-slate-900 rounded-[40px] p-12 lg:p-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
        <StatCard label="Analysen" value="12k+" />
        <StatCard label="Einrichtungen" value="4.5k" />
        <StatCard label="Steigerung" value="15%" />
        <StatCard label="Präzision" value="99%" />
      </div>
    </div>
  );
};

export default Stats;
