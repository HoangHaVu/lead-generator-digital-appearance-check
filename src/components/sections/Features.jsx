import { Zap, Target, LineChart } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

const Features = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard 
        icon={<Zap />}
        title="Schnell & Effizient"
        desc="Erhalten Sie Ihre Ergebnisse in weniger als 2 Minuten durch unseren KI-gestützten Prozess."
      />
      <FeatureCard 
        icon={<Target />}
        title="Präzise Analyse"
        desc="Wir analysieren 42 verschiedene Datenpunkte, um Ihnen ein exaktes Bild Ihrer Präsenz zu geben."
      />
      <FeatureCard 
        icon={<LineChart />}
        title="Echte Resultate"
        desc="Unsere Kunden verzeichnen im Schnitt 15% mehr qualifizierte Leads nach Umsetzung."
      />
    </div>
  );
};

export default Features;
