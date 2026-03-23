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

const Impressum = () => {
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
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Impressum</h1>
            <p className="text-slate-500 font-body">Angaben gemäß § 5 TMG</p>
          </div>

          <Section title="Anbieter">
            <p><strong className="text-slate-900">Deutsche Pflegefilme GmbH</strong></p>
            <p>Musterstraße 1<br />80333 München</p>
          </Section>

          <Section title="Kontakt">
            <p>Telefon: +49 (0) 123 456 789</p>
            <p>E-Mail: info@deutsche-pflegefilme.de</p>
          </Section>

          <Section title="Vertreten durch">
            <p>Geschäftsführer: [Name des Geschäftsführers]</p>
          </Section>

          <Section title="Registereintrag">
            <p>Eintragung im Handelsregister</p>
            <p>Registergericht: Amtsgericht München</p>
            <p>Registernummer: HRB [Nummer]</p>
          </Section>

          <Section title="Umsatzsteuer-ID">
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:</p>
            <p>DE [Nummer]</p>
          </Section>

          <Section title="Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)">
            <p>[Name Verantwortliche/r]<br />Musterstraße 1<br />80333 München</p>
          </Section>

          <Section title="Haftungsausschluss">
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          </Section>

          <Section title="Urheberrecht">
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </Section>

          <div className="pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-body">
              Stand: März 2025 — [PLATZHALTER: Bitte Angaben vor Veröffentlichung vollständig ausfüllen]
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;
