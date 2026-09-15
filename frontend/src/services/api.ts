import { TrainingModule, DocumentItem, AnalyticsData, EvaluationDetails } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  async generateTraining(data: {
    crop: string;
    topic: string;
    target_audience: string;
    language: string;
    difficulty: string;
    duration_minutes: number;
    content_type: string;
    additional_requirements?: string;
  }): Promise<TrainingModule> {
    const res = await fetch(`${API_BASE}/generate-training`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Failed to generate training module' }));
      throw new Error(err.detail || 'Content generation failed. Please try again.');
    }
    return res.json();
  },

  async getTrainings(params?: { crop?: string; language?: string; topic?: string; search?: string }): Promise<TrainingModule[]> {
    const query = new URLSearchParams();
    if (params?.crop && params.crop !== 'All') query.append('crop', params.crop);
    if (params?.language && params.language !== 'All') query.append('language', params.language);
    if (params?.topic && params.topic !== 'All') query.append('topic', params.topic);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/trainings?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load training modules');
    return res.json();
  },

  async getTrainingById(id: number): Promise<TrainingModule> {
    const res = await fetch(`${API_BASE}/trainings/${id}`);
    if (!res.ok) throw new Error('Training module not found');
    return res.json();
  },

  async updateTraining(id: number, data: Partial<TrainingModule>): Promise<TrainingModule> {
    const res = await fetch(`${API_BASE}/trainings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update training module');
    return res.json();
  },

  async deleteTraining(id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/trainings/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete training module');
    return res.json();
  },

  async translateTraining(id: number, targetLanguage: string): Promise<TrainingModule> {
    const res = await fetch(`${API_BASE}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ training_id: id, target_language: targetLanguage }),
    });
    if (!res.ok) throw new Error('Failed to translate training module');
    return res.json();
  },

  async getDocuments(): Promise<DocumentItem[]> {
    const res = await fetch(`${API_BASE}/documents`);
    if (!res.ok) throw new Error('Failed to load documents');
    return res.json();
  },

  async uploadDocument(formData: FormData): Promise<{ message: string; document: DocumentItem }> {
    const res = await fetch(`${API_BASE}/upload-document`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Failed to upload document' }));
      throw new Error(err.detail || 'Document upload failed');
    }
    return res.json();
  },

  async deleteDocument(id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/documents/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete document');
    return res.json();
  },

  async getAnalytics(): Promise<AnalyticsData> {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to load analytics data');
    return res.json();
  },

  getExportPdfUrl(id: number): string {
    return `${API_BASE}/export/${id}/pdf`;
  },

  getExportDocxUrl(id: number): string {
    return `${API_BASE}/export/${id}/docx`;
  },
};
