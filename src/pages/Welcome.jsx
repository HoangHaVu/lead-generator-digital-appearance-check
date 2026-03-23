import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Stats from '../components/sections/Stats';
import UeberUns from '../components/sections/UeberUns';
import Kontakt from '../components/sections/Kontakt';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
          <Hero />
        </section>

        {/* Features Grid */}
        <section id="features" className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
            <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Vorsprung durch digitale Exzellenz</h2>
              <p className="text-slate-600 font-body">Unser Lead-Generator hilft Ihnen dabei, blinde Flecken in Ihrer Online-Präsenz zu identifizieren und direkt zu beheben.</p>
            </div>
            <Features />
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
          <Stats />
        </section>

        {/* Über uns */}
        <section id="ueber-uns" className="max-w-7xl mx-auto px-6 py-24">
          <UeberUns />
        </section>

        {/* Kontakt */}
        <section id="kontakt" className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Kontakt />
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col gap-8 items-center">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
              <HeartPulse className="text-white" size={32} />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">Bereit für den digitalen Check-up?</h2>
            <p className="text-white/80 text-lg lg:text-xl font-body">Schließen Sie sich hunderten zufriedenen Einrichtungen an und starten Sie noch heute Ihre Reise zur digitalen Spitze.</p>
            <button
              onClick={() => navigate('/input')}
              className="px-10 py-5 rounded-2xl bg-white text-primary text-xl font-black shadow-2xl hover:bg-slate-50 transition-all flex items-center gap-3 font-body"
            >
              Jetzt kostenlos starten
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Welcome;
