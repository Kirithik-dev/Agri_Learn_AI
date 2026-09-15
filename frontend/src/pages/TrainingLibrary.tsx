import React from 'react';
import {
  FolderOpen,
  Search,
  Filter,
  Trash2,
  Download,
  ExternalLink,
  BookOpen,
  Globe,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';
import { TrainingModule } from '../types';
import { api } from '../services/api';

interface TrainingLibraryProps {
  onSelectTraining: (training: TrainingModule) => void;
}

export const TrainingLibrary: React.FC<TrainingLibraryProps> = ({ onSelectTraining }) => {
  const [trainings, setTrainings] = React.useState<TrainingModule[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [selectedCrop, setSelectedCrop] = React.useState('All');
  const [selectedLanguage, setSelectedLanguage] = React.useState('All');

  const loadTrainings = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getTrainings({
        crop: selectedCrop,
        language: selectedLanguage,
        search,
      });
      setTrainings(data);
    } catch (err) {
      console.error('Failed to load library:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCrop, selectedLanguage, search]);

  React.useEffect(() => {
    loadTrainings();
  }, [loadTrainings]);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this training module?')) return;
    try {
      await api.deleteTraining(id);
      setTrainings((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert('Failed to delete training module');
    }
  };

  const cropFilters = ['All', 'Paddy', 'Tomato', 'Cotton', 'Groundnut', 'Potato', 'Chilli', 'Banana'];
  const languageFilters = ['All', 'English', 'Tamil'];

  return (
    <div className="space-y-6 py-4 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2.5">
            <FolderOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Training Module Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse, search, edit, and export saved agricultural curriculum kits.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800">
          Total Stored: {trainings.length} Modules
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center gap-4">
        
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, crop or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
          />
        </div>

        {/* Crop Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-medium shrink-0">Crop:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
          >
            {cropFilters.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-medium shrink-0">Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
          >
            {languageFilters.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Grid of Trainings */}
      {loading ? (
        <div className="text-center py-16 text-xs text-slate-500">
          Loading library modules...
        </div>
      ) : trainings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No training modules found</h3>
          <p className="text-xs text-slate-500">Try adjusting your filters or create a new training module in the generator.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainings.map((t) => (
            <div
              key={t.id}
              onClick={() => onSelectTraining(t)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-md">
                    🌱 {t.crop}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {t.evaluation_score}% Score
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {t.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {t.introduction || 'Comprehensive agricultural field training module.'}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  <span>{t.target_audience}</span>
                  <span>•</span>
                  <span>{t.language}</span>
                  <span>•</span>
                  <span>{t.duration_minutes}m</span>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400">
                  {t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Recent'}
                </span>

                <div className="flex items-center space-x-2">
                  <a
                    href={api.getExportPdfUrl(t.id)}
                    onClick={(e) => e.stopPropagation()}
                    download
                    title="Download PDF"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={(e) => handleDelete(e, t.id)}
                    title="Delete Module"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
