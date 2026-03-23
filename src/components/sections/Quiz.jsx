import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLead } from '../../context/LeadContext';

const questions = [
  {
    id: 'recruiting',
    title: 'Nutzen Sie bereits Recruiting-Videos zur Mitarbeitergewinnung?',
    desc: 'Optimieren Sie Ihre Strategie durch eine ehrliche Einschätzung Ihres Ist-Zustands.',
    options: [
      { label: 'Ja, regelmäßig', detail: 'Videos sind Teil unserer festen Recruiting-Strategie.' },
      { label: 'Teilweise', detail: 'Erste Versuche sind gestartet oder in Planung.' },
      { label: 'Nein', detail: 'Bisher nutzen wir keine Video-Inhalte dafür.' }
    ]
  },
  {
    id: 'social',
    title: 'Wie aktiv sind Ihre Social-Media-Kanäle für das Employer Branding?',
    desc: 'Präsenz auf sozialen Plattformen ist heute entscheidend für Fachkräfte.',
    options: [
      { label: 'Sehr aktiv', detail: 'Tägliche Posts und hohe Interaktionsrate.' },
      { label: 'Gelegentlich', detail: 'Wir posten unregelmäßig, wenn es News gibt.' },
      { label: 'Inaktiv', detail: 'Keine Profile oder keine aktuelle Pflege.' }
    ]
  },
  {
    id: 'mobile',
    title: 'Ist Ihr Bewerbungsprozess für mobile Endgeräte optimiert?',
    desc: 'Die meisten Pflegekräfte suchen heute mobil nach neuen Stellen.',
    options: [
      { label: 'Vollständig', detail: 'Bewerbung ist in 2 Min. am Smartphone möglich.' },
      { label: 'Bedingt', detail: 'Seite ist responsiv, aber Formulare sind schwer.' },
      { label: 'Gar nicht', detail: 'Bewerbung nur über Desktop sinnvoll möglich.' }
    ]
  }
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { setQuizAnswers } = useLead();

  const handleSelect = (optionLabel) => {
    setAnswers({ ...answers, [questions[currentStep].id]: optionLabel });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizAnswers(answers);
      navigate('/result');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/scan');
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-[800px] w-full flex flex-col gap-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-200"
    >
      {/* Progress Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider font-body">Analyse-Fortschritt</span>
          <span className="text-slate-600 text-sm font-medium font-body">{Math.round(progress)}% abgeschlossen</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <p className="text-slate-500 text-xs font-body">Schritt {currentStep + 1} von {questions.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight">
              {questions[currentStep].title}
            </h1>
            <p className="text-slate-600 text-lg font-body">
              {questions[currentStep].desc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {questions[currentStep].options.map((option) => (
              <label 
                key={option.label}
                className={`cursor-pointer group relative flex flex-col items-start gap-2 rounded-2xl border-2 p-5 transition-all ${
                  answers[questions[currentStep].id] === option.label 
                  ? 'border-primary bg-primary/5' 
                  : 'border-slate-100 hover:border-primary/50'
                }`}
              >
                <input 
                  type="radio"
                  name={questions[currentStep].id}
                  className="hidden"
                  onChange={() => handleSelect(option.label)}
                  checked={answers[questions[currentStep].id] === option.label}
                />
                <div className="flex items-center w-full justify-between">
                  <span className="text-slate-900 font-bold text-lg font-body">{option.label}</span>
                  <div className={`size-6 rounded-full border-2 flex items-center justify-center ${
                    answers[questions[currentStep].id] === option.label 
                    ? 'border-primary' 
                    : 'border-slate-300'
                  }`}>
                    {answers[questions[currentStep].id] === option.label && (
                      <div className="size-3 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
                <span className="text-slate-500 text-sm font-body">{option.detail}</span>
              </label>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-200">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors font-body"
        >
          <ArrowLeft size={18} />
          Zurück
        </button>
        <button 
          disabled={!answers[questions[currentStep].id]}
          onClick={handleNext}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all font-body ${
            answers[questions[currentStep].id] 
            ? 'bg-primary text-white shadow-primary/20 hover:bg-primary/90' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentStep === questions.length - 1 ? 'Analyse abschließen' : 'Nächster Schritt'}
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default Quiz;
