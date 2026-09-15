export interface SourceItem {
  title: string;
  source: string;
  section: string;
  relevance: number;
}

export interface KeyConcept {
  concept: string;
  description: string;
}

export interface StepItem {
  step_number: number;
  title: string;
  action: string;
}

export interface CommonProblem {
  problem: string;
  cause: string;
  solution: string;
}

export interface DosAndDonts {
  dos: string[];
  donts: string[];
}

export interface QuizItem {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  source: string;
}

export interface ClaimVerification {
  claim: string;
  status: string;
  confidence?: string;
  evidence_tag?: string;
  warning?: string;
}

export interface EvaluationDetails {
  relevance_score: number;
  grounding_score: number;
  completeness_score: number;
  readability_score: number;
  language_score: number;
  source_coverage_score: number;
  safety_score: number;
  overall_score: number;
  reliability_status: string;
  grounding_status: string;
  supported_claims: ClaimVerification[];
  flagged_claims: ClaimVerification[];
  notes?: string;
}

export interface TrainingModule {
  id: number;
  title: string;
  crop: string;
  topic: string;
  target_audience: string;
  language: string;
  difficulty: string;
  duration_minutes: number;
  content_type: string;
  additional_requirements?: string;
  learning_objectives: string[];
  introduction: string;
  key_concepts: KeyConcept[];
  step_by_step: StepItem[];
  practical_recommendations: string;
  common_problems: CommonProblem[];
  preventive_measures: string[];
  dos_and_donts: DosAndDonts;
  safety_precautions: string[];
  quiz: QuizItem[];
  faq: FAQItem[];
  key_takeaways: string[];
  summary: string;
  sources: SourceItem[];
  prompt_used?: string;
  retrieved_chunks?: any[];
  evaluation_score: number;
  reliability_status: string;
  grounding_status: string;
  generation_mode?: string;
  evaluation_details?: EvaluationDetails;
  created_at?: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  category: string;
  crop: string;
  topic: string;
  source: string;
  filename: string;
  file_type: string;
  file_size_kb: number;
  chunk_count: number;
  is_seed: boolean;
  status: string;
  created_at: string;
}

export interface AnalyticsData {
  total_modules: number;
  generated_today: number;
  available_crops: number;
  supported_languages: number;
  knowledge_documents: number;
  knowledge_chunks: number;
  average_evaluation_score: number;
  crops_distribution: { crop: string; count: number }[];
  languages: { English: number; Tamil: number };
  topics_distribution: { topic: string; count: number }[];
  rag_statistics: {
    avg_retrieval_time_ms: number;
    avg_similarity_score: number;
    grounding_pass_rate: string;
    zero_hallucination_rate: string;
  };
}
