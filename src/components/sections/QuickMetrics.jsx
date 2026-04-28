import { AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { useLead } from '../../context/LeadContext';
import { generateRecommendations, calcOverallScore } from '../../utils/generateRecommendations';

const MetricCard = ({ label, value, trend, icon, trendColor, bgColor, isProgress, progressValue }) => (
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
        <div
          className="bg-blue-500 h-full rounded-full transition-all duration-700"
          style={{ width: `${progressValue ?? 0}%` }}
        />
      </div>
    ) : (
      <div className={`flex items-center gap-1 text-sm font-bold font-body ${trendColor}`}>
        <span>{trend}</span>
      </div>
    )}
  </div>
);

const QuickMetrics = () => {
  const { scanResults, socialResults, seoResults } = useLead();
  const recs = generateRecommendations(scanResults, socialResults, seoResults);
  const overallScore = calcOverallScore(scanResults, socialResults, seoResults);

  const criticalCount = recs.filter(r => r.priority === 'Kritisch').length;
  const totalCount = recs.length;

  const scoreLabel = overallScore == null
    ? '—'
    : overallScore >= 80
      ? 'Gut'
      : overallScore >= 60
        ? 'Ausbaufähig'
        : 'Kritisch';

  const scoreColor = overallScore == null
    ? 'text-slate-400'
    : overallScore >= 80
      ? 'text-green-600'
      : overallScore >= 60
        ? 'text-amber-600'
        : 'text-red-600';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        label="Handlungsempfehlungen"
        value={totalCount}
        trend={`${criticalCount} kritisch`}
        icon={<AlertTriangle className="text-red-500" />}
        trendColor={criticalCount > 0 ? 'text-red-600' : 'text-green-600'}
        bgColor="bg-red-50"
      />
      <MetricCard
        label="Gesamtscore"
        value={overallScore != null ? `${overallScore}/100` : '—'}
        trend={scoreLabel}
        icon={<TrendingUp className="text-green-500" />}
        trendColor={scoreColor}
        bgColor="bg-green-50"
      />
      <MetricCard
        label="Verbesserungspotenzial"
        value={overallScore != null ? `${100 - overallScore}%` : '—'}
        isProgress
        progressValue={overallScore != null ? 100 - overallScore : 0}
        icon={<Zap className="text-blue-500" />}
        bgColor="bg-blue-50"
      />
    </div>
  );
};

export default QuickMetrics;
