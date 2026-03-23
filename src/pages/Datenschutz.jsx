import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-xl font-black text-slate-900">{title}</h2>
    <div className="text-slate-600 font-body leading-relaxed space-y-2">{children}</div>
  </div>
);

const Datenschutz = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm font-body mb-10"
        >
          <ArrowLeft size={16} /> Zurück zur Startseite
        </button>

        <div className="space-y-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Datenschutzerklärung</h1>
            <p className="text-slate-500 font-body">gemäß DSGVO und BDSG</p>
          </div>

          <Section title="1. Verantwortlicher">
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
            <p><strong className="text-slate-900">Deutsche Pflegefilme GmbH</strong><br />Musterstraße 1<br />80333 München<br />E-Mail: info@deutsche-pflegefilme.de</p>
          </Section>

          <Section title="2. Erhebung und Speicherung personenbezogener Daten">
            <p>Wenn Sie unseren Digitalen Auftritt Check nutzen, erheben wir folgende Daten, die Sie uns freiwillig mitteilen:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name und Vorname</li>
              <li>E-Mail-Adresse</li>
              <li>Name Ihrer Einrichtung</li>
              <li>Website-URL Ihrer Einrichtung</li>
              <li>Antworten auf die Analyse-Fragen</li>
            </ul>
            <p>Diese Daten werden ausschließlich auf Ihrem Gerät (localStorage) gespeichert und nicht an externe Server übertragen, solange Sie keine aktive Übermittlung vornehmen.</p>
          </Section>

          <Section title="3. Zweck der Datenverarbeitung">
            <p>Die von Ihnen übermittelten Daten werden verwendet, um:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>eine kostenlose Analyse Ihres digitalen Auftritts zu erstellen</li>
              <li>einen Beratungstermin zu koordinieren</li>
              <li>Sie im Nachgang zum Gespräch kontaktieren zu können</li>
            </ul>
          </Section>

          <Section title="4. Rechtsgrundlage">
            <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) sowie Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).</p>
          </Section>

          <Section title="5. Speicherdauer">
            <p>Ihre Daten werden nur so lange gespeichert, wie es für die genannten Zwecke erforderlich ist oder Sie Ihre Einwilligung nicht widerrufen haben.</p>
          </Section>

          <Section title="6. Ihre Rechte">
            <p>Sie haben das Recht auf:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch (Art. 21 DSGVO)</li>
            </ul>
            <p>Zur Ausübung Ihrer Rechte wenden Sie sich an: info@deutsche-pflegefilme.de</p>
          </Section>

          <Section title="7. Kontaktformular">
            <p>Wenn Sie uns über das Kontaktformular eine Nachricht senden, werden die eingegebenen Daten (Name, E-Mail, Nachricht) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet. Die Daten werden nicht an Dritte weitergegeben.</p>
          </Section>

          <Section title="8. Cookies und lokale Speicherung">
            <p>Diese Website verwendet localStorage zur Speicherung von Analyse-Ergebnissen und Lead-Daten auf Ihrem Gerät. Es werden keine Tracking-Cookies gesetzt.</p>
          </Section>

          <Section title="9. Beschwerderecht">
            <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Behörde in Bayern ist:</p>
            <p>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />Promenade 27, 91522 Ansbach</p>
          </Section>

          <div className="pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-body">
              Stand: März 2025 — [PLATZHALTER: Vor Veröffentlichung rechtlich prüfen lassen]
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Datenschutz;
