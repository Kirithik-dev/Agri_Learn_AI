import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Layers,
  Award,
  BookOpen,
  Cpu,
  Sprout,
  CheckCircle2,
  FileText,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  language: string;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, language }) => {
  const isTamil = language === 'Tamil';

  const crops = [
    { name: 'Paddy', ta: 'நெல்', icon: '🌾', desc: 'Rice IPM, SRI Water, Stem Borer & Blast Control' },
    { name: 'Tomato', ta: 'தக்காளி', icon: '🍅', desc: 'Early/Late Blight, Fruit Borer & Drip Fertigation' },
    { name: 'Cotton', ta: 'பருத்தி', icon: '☁️', desc: 'Pink Bollworm, Pheromones, Non-Bt Refugia' },
    { name: 'Groundnut', ta: 'நிலக்கடலை', icon: '🥜', desc: 'Tikka Leaf Spot, Gypsum at 45 DAS, Pod Borer' },
    { name: 'Potato', ta: 'உருளைக்கிழங்கு', icon: '🥔', desc: 'Late Blight Defense, Tuber Moth, Earthing Up' },
    { name: 'Chilli', ta: 'மிளகாய்', icon: '🌶️', desc: 'Chilli Murda, Thrips & Mites, Die-Back Control' },
    { name: 'Banana', ta: 'வாழை', icon: '🍌', desc: 'Panama Wilt, BBTV Eradication, Sucker Selection' },
  ];

  const workflowSteps = [
    { step: '01', title: 'Select Crop & Topic', desc: 'Paddy, Tomato, Cotton, etc. with targeted agronomic needs' },
    { step: '02', title: 'Target Persona & Language', desc: 'Beginner Farmer, Student, Trainer in English or Tamil' },
    { step: '03', title: 'RAG Retrieval', desc: 'Vector cosine similarity search across certified ICAR/TNAU manuals' },
    { step: '04', title: 'Prompt Engineering', desc: 'Structured schema with strict anti-hallucination guardrails' },
    { step: '05', title: 'LLM Generation', desc: '14 structured pedagogical sections including interactive quizzes' },
    { step: '06', title: '7-Metric Evaluation', desc: 'Relevance, Grounding, Completeness, Readability, Safety & PHI' },
    { step: '07', title: 'Export & Share', desc: 'Instant export to professional PDF and Word DOCX formats' },
  ];

  return (
    <div className="space-y-16 py-6 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white px-6 py-16 sm:px-12 sm:py-24 shadow-2xl border border-emerald-800/60">
        
        {/* Subtle Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          
          {/* Hackathon Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/70 border border-emerald-600/60 text-emerald-200 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>INTELLIX: LLM & AI Optimization Hackathon • Team Syntax Soldiers (BIT-AI-002)</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            {isTamil ? (
              <>விவசாய அறிவை <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">அறிவார்ந்த பயிற்சியாக</span> மாற்றுங்கள்</>
            ) : (
              <>Transform Agricultural Knowledge into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Smarter Training</span></>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            {isTamil ? (
              'செயற்கை நுண்ணறிவு (AI), RAG மீட்டெடுப்பு மற்றும் நம்பகமான ICAR/TNAU வேளாண் ஆவணங்களின் துணையுடன் தனிப்பயனாக்கப்பட்ட, பலமொழி விவசாயப் பயிற்சி தொகுப்புகளை உருவாக்குங்கள்.'
            ) : (
              'Generate personalized, multilingual and reliable agricultural training content using AI, RAG and trusted agricultural knowledge.'
            )}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('generate')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isTamil ? 'பயிற்சி உருவாக்குக' : 'Generate Training'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm flex items-center justify-center space-x-2 backdrop-blur-xs border border-white/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isTamil ? 'அறிவுத்தளத்தை ஆராய்க' : 'Explore Knowledge Base'}</span>
            </button>
          </div>

          {/* Key Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-emerald-800/80 text-center">
            <div>
              <div className="text-2xl font-black text-emerald-300">7+ Crops</div>
              <div className="text-xs text-emerald-200/70">Expandable Registry</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-300">Tamil & English</div>
              <div className="text-xs text-emerald-200/70">Bilingual Generation</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-300">100% RAG Grounded</div>
              <div className="text-xs text-emerald-200/70">ICAR & TNAU Citations</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-300">94%+ Quality</div>
              <div className="text-xs text-emerald-200/70">7-Metric Automated Audit</div>
            </div>
          </div>

        </div>
      </section>

      {/* Supported Crops Showcase */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Expandable Agricultural Database
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Pre-Trained on High-Value Crops
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Comprehensive pest management, disease diagnosis, and cultivation protocols ready for instant training generation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {crops.map((crop, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab('generate')}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-3xl mb-3">{crop.icon}</div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {crop.name} <span className="text-xs font-normal text-slate-500">({crop.ta})</span>
                </h3>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {crop.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Workflow: From User to Export */}
      <section className="bg-emerald-50/50 dark:bg-slate-900/50 border border-emerald-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            End-to-End Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            How AGRI-LEARN AI Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A transparent 7-stage workflow combining RAG vector search, structured prompt engineering, and reliability verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.slice(0, 4).map((ws, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{ws.step}</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ws.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ws.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {workflowSteps.slice(4, 7).map((ws, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{ws.step}</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ws.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ws.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Target Audiences Supported */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { title: 'Farmers', desc: 'Practical, low-cost field solutions in everyday colloquial language' },
          { title: 'Agricultural Trainers', desc: 'Structured pedagogical modules, lesson plans, and interactive quizzes' },
          { title: 'Agri Students', desc: 'Scientific terminology, ETL concepts, and botanical classification' },
          { title: 'Extension Officers', desc: 'Government scheme linkages, safety standards, and diagnostic checklists' },
          { title: 'NGOs & Rural Workers', desc: 'Community awareness guides and eco-friendly farming practices' },
        ].map((aud, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{aud.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{aud.desc}</p>
          </div>
        ))}
      </section>

    </div>
  );
};
