import React from 'react';
import { Sprout, Heart, ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-white dark:bg-slate-950 border-t border-emerald-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
                AGRI-LEARN <span className="text-emerald-600 dark:text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Intelligent Agricultural Training Content Generator grounded in verified agronomy, RAG retrieval, and hallucination reduction.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] rounded-md border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Grounded with ICAR & TNAU Knowledge</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Hackathon Details
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><span className="font-medium text-slate-700 dark:text-slate-300">Hackathon:</span> INTELLIX: LLM & AI Optimization</li>
              <li><span className="font-medium text-slate-700 dark:text-slate-300">Problem Statement:</span> AGR-11</li>
              <li><span className="font-medium text-slate-700 dark:text-slate-300">Domain:</span> Agriculture & Rural Development</li>
              <li><span className="font-medium text-slate-700 dark:text-slate-300">Team:</span> Syntax Soldiers</li>
              <li><span className="font-medium text-slate-700 dark:text-slate-300">Team ID:</span> BIT-AI-002</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Institution & Team
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><span className="font-medium text-slate-700 dark:text-slate-300">College:</span> Bannari Amman Institute Of Technology</li>
              <li><span className="font-medium text-slate-700 dark:text-slate-300">Dept:</span> Artificial Intelligence & Data Science</li>
              <li><span className="font-medium text-slate-700 dark:text-slate-300">Year:</span> 2nd Year (2026)</li>
              <li className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Karuppusamy S (Lead) • Vivin KG • Nishanth R • Kirithik M
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Core Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">RAG Pipeline</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Vector Cosine</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Prompt Engineering</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">FastAPI</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">React + TS</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Tailwind CSS</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Tamil & English</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">ReportLab PDF</span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AGRI-LEARN AI • Built with <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500" /> for Indian Agriculture & Farmers.</p>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Syntax Soldiers • Bannari Amman Institute Of Technology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
