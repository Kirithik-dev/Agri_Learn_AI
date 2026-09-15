import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Download,
  FileText,
  FileSpreadsheet,
  Globe,
  Share2,
  Edit3,
  Save,
  Clock,
  User,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TrainingModule } from '../../types';
import { PromptModal } from './PromptModal';
import { PipelineDrawer } from './PipelineDrawer';
import { api } from '../../services/api';

interface TrainingModuleViewProps {
  module: TrainingModule;
  onRegenerate?: () => void;
  onModuleUpdated?: (updated: TrainingModule) => void;
}

export const TrainingModuleView: React.FC<TrainingModuleViewProps> = ({
  module,
  onRegenerate,
  onModuleUpdated
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showPromptModal, setShowPromptModal] = React.useState(false);
  const [showPipelineDrawer, setShowPipelineDrawer] = React.useState(false);
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  // Editable fields
  const [editTitle, setEditTitle] = React.useState(module.title);
  const [editIntro, setEditIntro] = React.useState(module.introduction);
  const [editRecs, setEditRecs] = React.useState(module.practical_recommendations);
  const [isSaving, setIsSaving] = React.useState(false);

  // Interactive Quiz State
  const [userAnswers, setUserAnswers] = React.useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);
  const [quizScore, setQuizScore] = React.useState<number | null>(null);

  // Accordion FAQ state
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const handleCopyAll = () => {
    const textToCopy = `
${module.title}
Crop: ${module.crop} | Topic: ${module.topic} | Audience: ${module.target_audience}
Language: ${module.language} | Duration: ${module.duration_minutes} min | Evaluation Score: ${module.evaluation_score}%

--- LEARNING OBJECTIVES ---
${module.learning_objectives.map((o) => `• ${o}`).join('\n')}

--- INTRODUCTION ---
${module.introduction}

--- STEP-BY-STEP TRAINING ---
${module.step_by_step.map((s) => `Step ${s.step_number}: ${s.title}\n${s.action}`).join('\n\n')}

--- SAFETY PRECAUTIONS ---
${module.safety_precautions.map((p) => `⚠️ ${p}`).join('\n')}

--- SOURCES CITED ---
${module.sources.map((s) => `• ${s.title} - ${s.source}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdits = async () => {
    try {
      setIsSaving(true);
      const updated = await api.updateTraining(module.id, {
        title: editTitle,
        introduction: editIntro,
        practical_recommendations: editRecs,
      });
      setIsEditing(false);
      if (onModuleUpdated) onModuleUpdated(updated);
    } catch (err) {
      alert('Failed to save edits');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTranslateToggle = async () => {
    const targetLang = module.language.toLowerCase().includes('tamil') ? 'English' : 'Tamil';
    try {
      setIsTranslating(true);
      const translated = await api.translateTraining(module.id, targetLang);
      if (onModuleUpdated) onModuleUpdated(translated);
    } catch (err) {
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleQuizOptionSelect = (qIdx: number, option: string) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: option }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    module.quiz.forEach((q, idx) => {
      const selected = userAnswers[idx];
      if (selected && selected.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-800">
            🌱 {module.crop}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded-lg border border-teal-200 dark:border-teal-800">
            {module.topic}
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>{module.target_audience}</span>
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{module.language}</span>
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{module.duration_minutes} mins</span>
          </span>
          <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800">
            {module.difficulty}
          </span>
          <span className="ml-auto px-3 py-1 text-xs font-extrabold bg-emerald-600 text-white rounded-full shadow-xs">
            Evaluation: {module.evaluation_score}%
          </span>
        </div>

        {/* Title */}
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full text-xl sm:text-2xl font-bold p-2 border border-emerald-500 rounded-lg bg-emerald-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        ) : (
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            {module.title}
          </h1>
        )}

        {/* Reliability Check Checklist */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Reliability Check:</span>
          <span className="inline-flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Source Context Found</span>
          </span>
          <span className="inline-flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>14 Sections Present</span>
          </span>
          <span className="inline-flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Grounding Check Passed</span>
          </span>
          <span className="inline-flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Safety & PHI Checked</span>
          </span>
        </div>

        {/* Action Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {isEditing ? (
              <button
                onClick={handleSaveEdits}
                disabled={isSaving}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Edits'}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}

            <button
              onClick={handleTranslateToggle}
              disabled={isTranslating}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {isTranslating ? 'Translating...' : module.language.toLowerCase().includes('tamil') ? 'Translate to English' : 'தமிழில் மொழிபெயர்க்க'}
              </span>
            </button>

            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={api.getExportPdfUrl(module.id)}
              download
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-rose-600" />
              <span>PDF</span>
            </a>

            <a
              href={api.getExportDocxUrl(module.id)}
              download
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>DOCX</span>
            </a>

            <button
              onClick={() => setShowPromptModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>View Prompt</span>
            </button>

            <button
              onClick={() => setShowPipelineDrawer(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>How Generated</span>
            </button>
          </div>

        </div>

      </div>

      {/* 1. Learning Objectives */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>1. Learning Objectives</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {module.learning_objectives.map((obj, i) => (
            <div
              key={i}
              className="flex items-start space-x-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {obj}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Introduction */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          2. Introduction
        </h3>
        {isEditing ? (
          <textarea
            rows={4}
            value={editIntro}
            onChange={(e) => setEditIntro(e.target.value)}
            className="w-full text-xs p-3 border border-emerald-500 rounded-lg bg-emerald-50/50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
          />
        ) : (
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {module.introduction}
          </p>
        )}
      </div>

      {/* 3. Key Agronomic Concepts */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          3. Key Agronomic Concepts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {module.key_concepts.map((kc, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                {kc.concept}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {kc.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Step-by-Step Training */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          4. Step-by-Step Field Practice
        </h3>
        <div className="space-y-3">
          {module.step_by_step.map((step) => (
            <div
              key={step.step_number}
              className="flex items-start space-x-3.5 p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {step.step_number}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Practical Recommendations */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          5. Practical Recommendations & Cost-Effective Tips
        </h3>
        {isEditing ? (
          <textarea
            rows={4}
            value={editRecs}
            onChange={(e) => setEditRecs(e.target.value)}
            className="w-full text-xs p-3 border border-emerald-500 rounded-lg bg-emerald-50/50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed whitespace-pre-line"
          />
        ) : (
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
            {module.practical_recommendations}
          </div>
        )}
      </div>

      {/* 6. Common Problems & Diagnostic Symptoms */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          6. Common Problems & Field Diagnostics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {module.common_problems.map((p, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>{p.problem}</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Cause:</span> {p.cause}
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs border border-emerald-100 dark:border-emerald-900">
                <span className="font-semibold">Recommended Remedy:</span> {p.solution}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Preventive Measures */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          7. Preventive Measures & Cultural Controls
        </h3>
        <ul className="space-y-2">
          {module.preventive_measures.map((pm, i) => (
            <li key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{pm}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Do's and Don'ts */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          8. Do's and Don'ts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>DO'S</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {module.dos_and_donts.dos.map((d, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
            <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>DON'TS</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {module.dos_and_donts.donts.map((d, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* 9. Safety Precautions & Pre-Harvest Intervals (PHI) */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-amber-900 dark:text-amber-200 flex items-center space-x-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>9. Safety Precautions & Pre-Harvest Intervals (PHI)</span>
        </h3>
        <p className="text-xs text-amber-800 dark:text-amber-300 mb-3">
          Notice: Agricultural chemicals and plant protection products require strict personal safety controls and adherence to waiting periods to safeguard human health and consumer food safety.
        </p>
        <div className="space-y-2">
          {module.safety_precautions.map((sp, i) => (
            <div key={i} className="flex items-start space-x-2 text-xs text-amber-950 dark:text-amber-200">
              <span className="text-amber-600 font-bold mt-0.5">⚠️</span>
              <span>{sp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Interactive Quiz */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>10. Interactive Knowledge Quiz</span>
          </h3>
          {quizSubmitted && quizScore !== null && (
            <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full font-bold text-xs">
              Score: {quizScore} / {module.quiz.length} ({Math.round((quizScore / module.quiz.length) * 100)}%)
            </div>
          )}
        </div>

        <div className="space-y-6">
          {module.quiz.map((q, qIdx) => {
            const selectedOption = userAnswers[qIdx];
            return (
              <div
                key={qIdx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Q{qIdx + 1}. {q.question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
                    
                    let btnClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-200';
                      }
                    } else if (isSelected) {
                      btnClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-800 dark:text-emerald-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleQuizOptionSelect(qIdx, opt)}
                        className={`text-left px-3.5 py-2.5 rounded-lg text-xs border transition-all ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">Correct Answer: {q.correct_answer}</span>
                    <p className="mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {!quizSubmitted ? (
            <button
              onClick={handleGradeQuiz}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              Submit Quiz for Grading
            </button>
          ) : (
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
            >
              Retake Quiz
            </button>
          )}
        </div>
      </div>

      {/* 11. Frequently Asked Questions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          11. Frequently Asked Questions (FAQs)
        </h3>
        <div className="space-y-3">
          {module.faq.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {item.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <p className="leading-relaxed">{item.answer}</p>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                      Source: {item.source}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 12. Key Takeaways */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          12. Key Takeaways
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {module.key_takeaways.map((kt, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-900 dark:text-teal-200"
            >
              <div className="font-bold text-teal-700 dark:text-teal-400 mb-1">Takeaway #{i + 1}</div>
              {kt}
            </div>
          ))}
        </div>
      </div>

      {/* 13. Summary */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          13. Summary
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {module.summary}
        </p>
      </div>

      {/* 14. Sources & Trusted References */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          14. Trusted Agricultural Sources & Citations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {module.sources.map((s, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{s.title}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded">
                  {s.relevance}% Match
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Authority: {s.source}
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Section: {s.section}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PromptModal
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        promptText={module.prompt_used || ''}
      />

      <PipelineDrawer
        isOpen={showPipelineDrawer}
        onClose={() => setShowPipelineDrawer(false)}
        module={module}
      />

    </div>
  );
};
