import React from 'react';
import {
  Database,
  UploadCloud,
  FileText,
  Search,
  Trash2,
  CheckCircle2,
  Layers,
  Info,
  ShieldCheck,
  AlertCircle,
  Clock,
  Eye,
  X
} from 'lucide-react';
import { DocumentItem } from '../types';
import { api } from '../services/api';

export const KnowledgeBase: React.FC = () => {
  const [documents, setDocuments] = React.useState<DocumentItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  
  // Upload Form State
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);
  const [crop, setCrop] = React.useState('General');
  const [topic, setTopic] = React.useState('Agronomy & Plant Protection');
  const [category, setCategory] = React.useState('Manual');
  const [source, setSource] = React.useState('TNAU / ICAR / Agricultural University');
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState<string | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // Chunk inspection modal
  const [inspectDoc, setInspectDoc] = React.useState<DocumentItem | null>(null);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await api.getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error('Failed to load documents:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadDocuments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('crop', crop);
    formData.append('topic', topic);
    formData.append('category', category);
    formData.append('source', source);

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(null);
      const res = await api.uploadDocument(formData);
      setUploadSuccess(res.message);
      setUploadFile(null);
      loadDocuments();
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this agricultural document and remove its chunks from the vector store?')) return;
    try {
      await api.deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert('Failed to delete document');
    }
  };

  const filteredDocs = documents.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.crop.toLowerCase().includes(q) ||
      d.source.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2.5">
            <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Agricultural Knowledge Base & RAG Vector Store</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Grounding engine connecting official ICAR, TNAU, and FAO manuals to the generation pipeline.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Vector Index Active: {documents.reduce((acc, d) => acc + d.chunk_count, 0)} Chunks</span>
        </div>
      </div>

      {/* RAG Architecture Diagram Card */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Layers className="w-4 h-4" />
          <span>Retrieval-Augmented Generation (RAG) Pipeline Architecture</span>
        </div>
        
        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
          {[
            { step: '1. Upload', desc: 'PDF, DOCX, TXT' },
            { step: '2. Extraction', desc: 'pypdf & python-docx' },
            { step: '3. Cleaning', desc: 'Whitespace & Syntax' },
            { step: '4. Chunking', desc: '550 chars + 100 overlap' },
            { step: '5. Vector Index', desc: 'Cosine Embeddings' },
            { step: '6. Retrieval', desc: 'BM25 + Semantic Search' },
            { step: '7. Grounding', desc: 'Zero Hallucination LLM' },
          ].map((s, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">{s.step}</div>
              <div className="text-[10px] text-slate-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Document Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <UploadCloud className="w-5 h-5 text-emerald-600" />
          <span>Upload New Agricultural Knowledge Document</span>
        </h3>

        {uploadSuccess && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {uploadError && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Target Crop</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
              >
                <option value="General">General (Multi-crop)</option>
                <option value="Paddy">Paddy (Rice)</option>
                <option value="Tomato">Tomato</option>
                <option value="Cotton">Cotton</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Potato">Potato</option>
                <option value="Chilli">Chilli</option>
                <option value="Banana">Banana</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Agricultural Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Pest & Disease Management"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
              >
                <option value="Manual">Official Agronomy Manual</option>
                <option value="Research Paper">Research Publication</option>
                <option value="Advisory">Seasonal Advisory</option>
                <option value="Field Guide">Extension Field Guide</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Source Authority</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. TNAU Coimbatore / ICAR New Delhi"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
              />
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="w-full sm:w-auto text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-slate-800 dark:file:text-emerald-400"
            />
            <button
              type="submit"
              disabled={!uploadFile || isUploading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              {isUploading ? 'Chunking & Indexing...' : 'Upload & Index to Vector DB'}
            </button>
          </div>
        </form>
      </div>

      {/* Documents Inventory Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Indexed Agricultural Documents</h3>
            <p className="text-xs text-slate-500">Official repositories and manuals currently fueling RAG generation</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Source Authority</th>
                <th className="py-3 px-4">Chunks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{doc.title}</span>
                      {doc.is_seed && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded">
                          Official Seed
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium">
                      {doc.crop}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{doc.category}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {doc.source}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                    {doc.chunk_count}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{doc.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setInspectDoc(doc)}
                      title="Inspect Metadata"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {!doc.is_seed && (
                      <button
                        onClick={() => handleDelete(doc.id)}
                        title="Delete Document"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Metadata Modal */}
      {inspectDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Document Metadata</h3>
              <button onClick={() => setInspectDoc(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Title:</span> {inspectDoc.title}</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Target Crop:</span> {inspectDoc.crop}</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Category:</span> {inspectDoc.category}</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Authority:</span> {inspectDoc.source}</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Vector Chunks:</span> {inspectDoc.chunk_count}</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-300">File Size:</span> {inspectDoc.file_size_kb} KB</p>
              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Index Status:</span> {inspectDoc.status}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setInspectDoc(null)}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
