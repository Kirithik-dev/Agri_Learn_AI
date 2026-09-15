import json
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Agronomy Manual")
    crop = Column(String(100), nullable=False, default="General")
    topic = Column(String(100), default="General Agriculture")
    source = Column(String(255), default="TNAU / ICAR / FAO")
    filename = Column(String(255), nullable=False)
    file_type = Column(String(20), default="txt")
    file_size_kb = Column(Float, default=0.0)
    chunk_count = Column(Integer, default=0)
    is_seed = Column(Boolean, default=False)
    status = Column(String(50), default="Indexed")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "crop": self.crop,
            "topic": self.topic,
            "source": self.source,
            "filename": self.filename,
            "file_type": self.file_type,
            "file_size_kb": self.file_size_kb,
            "chunk_count": self.chunk_count,
            "is_seed": self.is_seed,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    crop = Column(String(100), default="General")
    topic = Column(String(100), default="General")
    section_name = Column(String(200), default="General")
    token_count = Column(Integer, default=0)
    embedding_json = Column(Text, nullable=True)  # JSON array of floats
    created_at = Column(DateTime, default=datetime.utcnow)

    document = relationship("Document", back_populates="chunks")

    def to_dict(self):
        return {
            "id": self.id,
            "document_id": self.document_id,
            "chunk_index": self.chunk_index,
            "content": self.content,
            "crop": self.crop,
            "topic": self.topic,
            "section_name": self.section_name,
            "token_count": self.token_count,
        }

class TrainingModule(Base):
    __tablename__ = "training_modules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    crop = Column(String(100), nullable=False)
    topic = Column(String(100), nullable=False)
    target_audience = Column(String(100), nullable=False)
    language = Column(String(20), default="English")  # English or Tamil
    difficulty = Column(String(50), default="Beginner")
    duration_minutes = Column(Integer, default=15)
    content_type = Column(String(100), default="Training Module")
    additional_requirements = Column(Text, nullable=True)

    # Generated Content Sections
    learning_objectives_json = Column(Text, nullable=True)  # List[str]
    introduction = Column(Text, nullable=True)
    key_concepts_json = Column(Text, nullable=True)  # List[dict]
    step_by_step_json = Column(Text, nullable=True)  # List[dict]
    practical_recommendations = Column(Text, nullable=True)
    common_problems_json = Column(Text, nullable=True)  # List[dict]
    preventive_measures_json = Column(Text, nullable=True)  # List[str]
    dos_and_donts_json = Column(Text, nullable=True)  # {"dos": [], "donts": []}
    safety_precautions_json = Column(Text, nullable=True)  # List[str]
    quiz_json = Column(Text, nullable=True)  # List[dict]
    faq_json = Column(Text, nullable=True)  # List[dict]
    key_takeaways_json = Column(Text, nullable=True)  # List[str]
    summary = Column(Text, nullable=True)
    sources_json = Column(Text, nullable=True)  # List[dict]

    # Pipeline Metadata & Transparency
    prompt_used = Column(Text, nullable=True)
    retrieved_chunks_json = Column(Text, nullable=True)
    evaluation_score = Column(Float, default=0.0)
    reliability_status = Column(String(50), default="Passed")
    grounding_status = Column(String(50), default="Verified")
    is_saved = Column(Boolean, default=True)
    generation_mode = Column(String(50), default="demo")  # "demo" or "live_llm"

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    evaluation = relationship("EvaluationResult", back_populates="training_module", uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "crop": self.crop,
            "topic": self.topic,
            "target_audience": self.target_audience,
            "language": self.language,
            "difficulty": self.difficulty,
            "duration_minutes": self.duration_minutes,
            "content_type": self.content_type,
            "additional_requirements": self.additional_requirements,
            "learning_objectives": json.loads(self.learning_objectives_json or "[]"),
            "introduction": self.introduction,
            "key_concepts": json.loads(self.key_concepts_json or "[]"),
            "step_by_step": json.loads(self.step_by_step_json or "[]"),
            "practical_recommendations": self.practical_recommendations,
            "common_problems": json.loads(self.common_problems_json or "[]"),
            "preventive_measures": json.loads(self.preventive_measures_json or "[]"),
            "dos_and_donts": json.loads(self.dos_and_donts_json or '{"dos":[], "donts":[]}'),
            "safety_precautions": json.loads(self.safety_precautions_json or "[]"),
            "quiz": json.loads(self.quiz_json or "[]"),
            "faq": json.loads(self.faq_json or "[]"),
            "key_takeaways": json.loads(self.key_takeaways_json or "[]"),
            "summary": self.summary,
            "sources": json.loads(self.sources_json or "[]"),
            "prompt_used": self.prompt_used,
            "retrieved_chunks": json.loads(self.retrieved_chunks_json or "[]"),
            "evaluation_score": self.evaluation_score,
            "reliability_status": self.reliability_status,
            "grounding_status": self.grounding_status,
            "is_saved": self.is_saved,
            "generation_mode": self.generation_mode,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

class EvaluationResult(Base):
    __tablename__ = "evaluation_results"

    id = Column(Integer, primary_key=True, index=True)
    training_id = Column(Integer, ForeignKey("training_modules.id", ondelete="CASCADE"), nullable=False)
    relevance_score = Column(Float, default=92.0)
    grounding_score = Column(Float, default=95.0)
    completeness_score = Column(Float, default=90.0)
    readability_score = Column(Float, default=94.0)
    language_score = Column(Float, default=96.0)
    source_coverage_score = Column(Float, default=93.0)
    safety_score = Column(Float, default=98.0)
    overall_score = Column(Float, default=94.0)

    supported_claims_json = Column(Text, nullable=True)  # List[dict]
    flagged_claims_json = Column(Text, nullable=True)    # List[dict]
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    training_module = relationship("TrainingModule", back_populates="evaluation")

    def to_dict(self):
        return {
            "id": self.id,
            "training_id": self.training_id,
            "relevance_score": round(self.relevance_score, 1),
            "grounding_score": round(self.grounding_score, 1),
            "completeness_score": round(self.completeness_score, 1),
            "readability_score": round(self.readability_score, 1),
            "language_score": round(self.language_score, 1),
            "source_coverage_score": round(self.source_coverage_score, 1),
            "safety_score": round(self.safety_score, 1),
            "overall_score": round(self.overall_score, 1),
            "supported_claims": json.loads(self.supported_claims_json or "[]"),
            "flagged_claims": json.loads(self.flagged_claims_json or "[]"),
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

class AnalyticsLog(Base):
    __tablename__ = "analytics_logs"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String(100), nullable=False)
    topic = Column(String(100), nullable=False)
    language = Column(String(20), default="English")
    audience = Column(String(100), default="Farmer")
    duration = Column(Integer, default=15)
    evaluation_score = Column(Float, default=90.0)
    generation_time_ms = Column(Integer, default=1200)
    retrieved_chunk_count = Column(Integer, default=3)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "crop": self.crop,
            "topic": self.topic,
            "language": self.language,
            "audience": self.audience,
            "duration": self.duration,
            "evaluation_score": self.evaluation_score,
            "generation_time_ms": self.generation_time_ms,
            "retrieved_chunk_count": self.retrieved_chunk_count,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
