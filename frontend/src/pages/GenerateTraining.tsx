import React from 'react';
import {
  Sparkles,
  BookOpen,
  User,
  Globe,
  Clock,
  Layers,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Search,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { TrainingModule } from '../types';
import { api } from '../services/api';
import { TrainingModuleView } from '../components/training/TrainingModuleView';

interface GenerateTrainingProps {
  currentModule: TrainingModule | null;
  setCurrentModule: (m: TrainingModule | null) => void;
  defaultLanguage: string;
}

export const GenerateTraining: React.FC<GenerateTrainingProps> = ({
  currentModule,
  setCurrentModule,
  defaultLanguage,
}) => {
  // Form State
  const [crop, setCrop] = React.useState('Paddy');
  const [topic, setTopic] = React.useState('Pest Management');
  const [targetAudience, setTargetAudience] = React.useState('Beginner Farmer');
  const [language, setLanguage] = React.useState(defaultLanguage || 'Tamil');
  const [difficulty, setDifficulty] = React.useState('Beginner');
  const [duration, setDuration] = React.useState(15);
  const [contentType, setContentType] = React.useState('Training Module');
  const [additionalRequirements, setAdditionalRequirements] = React.useState(
    'Explain common pests affecting paddy and practical prevention methods using organic and biological controls.'
  );

  // Loading & Step Stepper State
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Keep language in sync if prop changes
  React.useEffect(() => {
    if (defaultLanguage) setLanguage(defaultLanguage);
  }, [defaultLanguage]);

  const cropOptions = [
    { name: 'Paddy', ta: 'நெல்', icon: '🌾' },
    { name: 'Tomato', ta: 'தக்காளி', icon: '🍅' },
    { name: 'Cotton', ta: 'பருத்தி', icon: '☁️' },
    { name: 'Groundnut', ta: 'நிலக்கடலை', icon: '🥜' },
    { name: 'Potato', ta: 'உருளைக்கிழங்கு', icon: '🥔' },
    { name: 'Chilli', ta: 'மிளகாய்', icon: '🌶️' },
    { name: 'Banana', ta: 'வாழை', icon: '🍌' },
  ];

  const topicOptions = [
    'Pest Management',
    'Disease Management',
    'Crop Cultivation',
    'Irrigation & Water Management',
    'Soil Management',
    'Fertilizer & Nutrient Management',
    'Organic Farming',
    'Weed Management',
    'Harvesting',
    'Post-Harvest Management',
    'Climate-Smart Agriculture',
  ];

  const audienceOptions = [
    'Beginner Farmer',
    'Experienced Farmer',
    'Agricultural Student',
    'Agricultural Trainer',
    'Extension Officer',
    'General Public',
  ];

  const durationOptions = [5, 10, 15, 30, 45, 60];

  const contentTypeOptions = [
    'Training Module',
    'Lesson Plan',
    'Farmer Awareness Material',
    'Quick Guide',
    'Quiz & Assessment',
    'FAQ Guide',
    'Field Checklist',
    'Complete Training Kit',
  ];

  const pipelineSteps = [
    { num: 1, title: 'Understanding Requirements', desc: 'Parsing target audience, crop biology, and duration constraints' },
    { num: 2, title: 'Searching Agricultural Knowledge', desc: 'Scanning vector index of ICAR and TNAU reference manuals' },
    { num: 3, title: 'Retrieving Relevant Sources', desc: 'Applying hybrid cosine similarity and BM25 botanical matching' },
    { num: 4, title: 'Generating Training Content', desc: 'Synthesizing 14 pedagogical sections with bilingual accuracy' },
    { num: 5, title: 'Evaluating Content Quality', desc: 'Auditing relevance, completeness, readability, and citation depth' },
    { num: 6, title: 'Running Reliability Checks', desc: 'Verifying Pre-Harvest Intervals (PHI) and safety precautions' },
    { num: 7, title: 'Finalizing Training Module', desc: 'Formatting interactive quizzes, diagnostic FAQs, and export formats' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentStep(1);
    setErrorMessage(null);
    setCurrentModule(null);

    // Realistic visual stepper for hackathon demonstration
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 6) return prev + 1;
        return prev;
      });
    }, 450);

    try {
      const generated = await api.generateTraining({
        crop,
        topic,
        target_audience: targetAudience,
        language,
        difficulty,
        duration_minutes: duration,
        content_type: contentType,
        additional_requirements: additionalRequirements,
      });

      clearInterval(stepInterval);
      setCurrentStep(7);

      setTimeout(() => {
        setIsLoading(false);
        setCurrentModule(generated);
      }, 500);

    } catch (err: any) {
      clearInterval(stepInterval);
      setIsLoading(false);
      setErrorMessage(err.message || 'Content generation failed. Please try again.');
    }
  };

  const handleResetForm = () => {
    setCurrentModule(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2.5">
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Generate Agricultural Training Content</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Grounded RAG synthesis tailored for farmers, students, trainers, and extension officers.
          </p>
        </div>

        {currentModule && (
          <button
            onClick={handleResetForm}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Configure New Training</span>
          </button>
        )}
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start space-x-3 text-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Generation Error</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* 7-Step Animated Progress Stepper */}
      {isLoading && (
        <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              RAG + LLM Pipeline Active
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Synthesizing Verified Agricultural Training Kit...
            </h3>
            <p className="text-xs text-slate-500">
              Querying vector knowledge base, framing prompt guardrails, and auditing content safety.
            </p>
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            {pipelineSteps.map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div
                  key={s.num}
                  className={`flex items-start space-x-3 p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 shadow-xs'
                      : isDone
                      ? 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-90'
                      : 'border-transparent opacity-40'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                    ) : (
                      <span className="text-slate-400">{s.num}</span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Step {s.num}: {s.title}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Generator Form (Hidden during loading or when viewing result) */}
      {!isLoading && !currentModule && (
        <form onSubmit={handleGenerate} className="space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Section 1: Crop Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              1. Select Agricultural Crop <span className="text-emerald-600">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {cropOptions.map((c) => {
                const isSelected = crop === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setCrop(c.name)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold scale-[1.02]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">{c.icon}</span>
                    <span className="text-xs">{c.name}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {c.ta}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Topic & Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Agricultural Topic <span className="text-emerald-600">*</span>
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden transition-all"
              >
                {topicOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                3. Target Audience <span className="text-emerald-600">*</span>
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden transition-all"
              >
                {audienceOptions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Section 3: Language, Difficulty & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                4. Output Language <span className="text-emerald-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('English')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    language === 'English'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('Tamil')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    language === 'Tamil'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  தமிழ் (Tamil)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                5. Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
              >
                <option value="Beginner">Beginner (Foundational)</option>
                <option value="Intermediate">Intermediate (Field Practitioner)</option>
                <option value="Advanced">Advanced (Extension / Agronomist)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                6. Training Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
              >
                {durationOptions.map((m) => (
                  <option key={m} value={m}>{m} minutes</option>
                ))}
              </select>
            </div>

          </div>

          {/* Section 4: Content Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              7. Content Type / Delivery Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {contentTypeOptions.map((ct) => {
                const isSelected = contentType === ct;
                return (
                  <button
                    key={ct}
                    type="button"
                    onClick={() => setContentType(ct)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-300'
                    }`}
                  >
                    {ct}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Additional Requirements */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              8. Additional Requirements & Specific Focus
            </label>
            <textarea
              rows={3}
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              placeholder="e.g., Explain common pests affecting paddy and practical prevention methods using neem oil and pheromone traps."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden leading-relaxed"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Grounded Training Module</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>
      )}

      {/* Result Module Presentation View */}
      {currentModule && (
        <TrainingModuleView
          module={currentModule}
          onRegenerate={() => {
            setCurrentModule(null);
          }}
          onModuleUpdated={(updated) => {
            setCurrentModule(updated);
          }}
        />
      )}

    </div>
  );
};
