import { motion } from 'framer-motion';
import { ShieldCheck, Users, Award, TrendingUp } from 'lucide-react';

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <p className="text-4xl font-black text-primary">{value}</p>
    <p className="text-slate-500 text-sm font-body mt-1">{label}</p>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-3"
  >
    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <h4 className="font-bold text-slate-900">{title}</h4>
    <p className="text-slate-500 text-sm font-body leading-relaxed">{desc}</p>
  </motion.div>
);

const UeberUns = () => (
  <div className="flex flex-col gap-20">
    {/* Intro */}
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
          Über uns
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          Wir bringen Pflegeeinrichtungen <span className="text-primary italic">in die Zukunft.</span>
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed font-body">
          Deutsche Pflegefilme ist spezialisiert auf die digitale Transformation von Pflegeeinrichtungen, ambulanten Diensten und Kliniken. Unser Team aus Experten verbindet tiefes Healthcare-Wissen mit modernem Digital-Marketing.
        </p>
        <p className="text-slate-600 leading-relaxed font-body">
          Seit über 8 Jahren helfen wir Einrichtungen dabei, ihre Online-Präsenz zu stärken, neue Mitarbeiter zu gewinnen und das Vertrauen von Patienten und Angehörigen zu festigen.
        </p>
        <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <StatItem value="8+" label="Jahre Erfahrung" />
          <StatItem value="500+" label="Einrichtungen" />
          <StatItem value="98%" label="Zufriedenheit" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl opacity-40" />
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800"
            alt="Pflegeteam bei der Arbeit"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
            <p className="text-xs font-bold text-primary uppercase tracking-wider font-body">Unser Ansatz</p>
            <p className="text-slate-900 font-bold font-body mt-1">Digital. Menschlich. Wirkungsvoll.</p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Values */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ValueCard
        icon={<ShieldCheck size={20} />}
        title="Vertrauen & Transparenz"
        desc="Wir arbeiten mit klaren Zielen und messbaren Ergebnissen. Keine versteckten Kosten, keine leeren Versprechen."
      />
      <ValueCard
        icon={<Users size={20} />}
        title="Branchenexpertise"
        desc="Unser Team kennt die Herausforderungen der Pflegebranche aus der Praxis — nicht nur aus dem Lehrbuch."
      />
      <ValueCard
        icon={<Award size={20} />}
        title="Messbare Ergebnisse"
        desc="Jede Maßnahme wird auf ihren Beitrag zu Sichtbarkeit, Recruiting und Neukundengewinnung überprüft."
      />
    </div>
  </div>
);

export default UeberUns;
