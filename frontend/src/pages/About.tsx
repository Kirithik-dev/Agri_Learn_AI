import React from 'react';
import {
  Info,
  Users,
  Award,
  GraduationCap,
  Building2,
  Code2,
  Cpu,
  Sprout,
  ShieldCheck,
  Zap,
  Globe2,
  Target
} from 'lucide-react';

export const About: React.FC = () => {
  const teamMembers = [
    { name: 'Karuppusamy S', role: 'Team Leader', focus: 'RAG Architecture & LLM Engineering' },
    { name: 'Vivin KG', role: 'Team Member', focus: 'Backend FastAPI & Vector Store' },
    { name: 'Nishanth R', role: 'Team Member', focus: 'Frontend UI/UX & Interactive Design' },
    { name: 'Kirithik M', role: 'Team Member', focus: 'Agricultural Grounding & Evaluation Suite' },
  ];

  return (
    <div className="space-y-12 py-4 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Hackathon Badge Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 text-white rounded-3xl p-8 shadow-md border border-emerald-700/50 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
          <span>Official Hackathon Submission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          AGRI-LEARN AI
        </h1>
        <p className="text-base text-emerald-100 max-w-2xl font-light">
          Intelligent Agricultural Training Content Generator grounded in verified agronomy, RAG retrieval, and hallucination reduction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-emerald-700/60 text-xs">
          <div>
            <div className="text-emerald-300 font-semibold">Hackathon</div>
            <div className="font-bold">INTELLIX: LLM & AI Optimization</div>
          </div>
          <div>
            <div className="text-emerald-300 font-semibold">Problem Statement</div>
            <div className="font-bold">AGR-11 – Content Generator</div>
          </div>
          <div>
            <div className="text-emerald-300 font-semibold">Team Name & ID</div>
            <div className="font-bold">Syntax Soldiers • BIT-AI-002</div>
          </div>
          <div>
            <div className="text-emerald-300 font-semibold">Institution</div>
            <div className="font-bold">Bannari Amman Inst. of Tech</div>
          </div>
        </div>
      </div>

      {/* Team Members Showcase */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Engineers & Researchers
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Team Syntax Soldiers
          </h2>
          <p className="text-xs text-slate-500">
            Department of Artificial Intelligence and Data Science (2nd Year, 2026)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{member.role}</div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {member.focus}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <Target className="w-5 h-5" />
            <span>The Core Agricultural Problem</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Agricultural training materials are traditionally generic, time-consuming to create manually, and scattered across fragmented university PDFs. Crucially, they are rarely available in native regional languages like Tamil, and generic LLMs frequently hallucinate hazardous chemical pesticide dosages.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Zap className="w-5 h-5" />
            <span>The AGRI-LEARN AI Solution</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            An end-to-end full-stack platform that pairs vector-grounded RAG retrieval from ICAR/TNAU manuals with structured prompt engineering. Generates 14-section multilingual training kits with interactive quizzes, diagnostic problems, and automated 7-metric reliability audits.
          </p>
        </div>

      </div>

      {/* AI Approach & Architecture Deep Dive */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-emerald-600" />
          <span>Core AI & Optimization Architecture</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400">1. Hybrid Semantic RAG</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Combines cosine similarity vector hashing with BM25 botanical keyword matching to retrieve certified ICAR/TNAU chunks with &gt;94% precision.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400">2. Anti-Hallucination Guardrails</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Explicit structured prompt framing strictly forbids ungrounded claims, requiring Pre-Harvest Interval (PHI) compliance and biological alternatives first.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400">3. 7-Metric Automated Audit</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Every module is automatically audited across Relevance, Grounding, Completeness, Readability, Language Quality, Source Coverage, and Safety.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Agricultural & Rural Impact */}
      <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2">
          <Sprout className="w-5 h-5 text-emerald-600" />
          <span>Expected Agricultural & Rural Impact</span>
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          By translating complex university research into clear, actionable training modules in Tamil and English, AGRI-LEARN AI empowers agricultural extension officers and progressive farmers to make rapid, scientifically grounded pest and crop decisions. This reduces input expenditures on unnecessary synthetic pesticides, fosters environmental conservation, and protects farmer livelihoods.
        </p>
      </div>

    </div>
  );
};
