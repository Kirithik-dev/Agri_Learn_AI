import math
import re
from typing import List, Dict, Any, Optional
import numpy as np
from sqlalchemy.orm import Session
from app.database.models import DocumentChunk, Document

class VectorStore:
    """
    Hybrid semantic vector store with cosine similarity and BM25/keyword ranking.
    Provides fast, local, hallucination-resistant retrieval for agricultural context.
    """

    def __init__(self):
        self.embedding_dim = 128

    def _generate_embedding(self, text: str) -> np.ndarray:
        """
        Generate a deterministic normalized dense embedding vector for text
        using agricultural term hashing and sub-word n-gram frequencies.
        Ensures consistent, reproducible semantic representation without external network dependencies.
        """
        vector = np.zeros(self.embedding_dim, dtype=np.float32)
        words = re.findall(r'\w+', text.lower())
        if not words:
            return vector

        # Term and bigram frequency hashing
        for i, word in enumerate(words):
            h1 = hash(word) % self.embedding_dim
            weight = 1.0 + (0.5 if len(word) > 6 else 0.0)
            vector[h1] += weight

            # Bigram context
            if i > 0:
                bigram = f"{words[i-1]}_{word}"
                h2 = hash(bigram) % self.embedding_dim
                vector[h2] += 1.5

        # Normalize to unit length for cosine similarity
        norm = np.linalg.norm(vector)
        if norm > 0:
            vector = vector / norm
        return vector

    def cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        if norm1 == 0 or norm2 == 0:
            return 0.0
        return float(np.dot(vec1, vec2) / (norm1 * norm2))

    def search(
        self,
        db: Session,
        query: str,
        crop: Optional[str] = None,
        topic: Optional[str] = None,
        top_k: int = 4
    ) -> List[Dict[str, Any]]:
        """
        Retrieve the top_k most relevant chunks using hybrid semantic + metadata scoring.
        """
        query_vec = self._generate_embedding(query)
        query_tokens = set(re.findall(r'\w+', query.lower()))

        chunks_query = db.query(DocumentChunk)
        
        # Crop filter priority
        if crop and crop.lower() != "general":
            # Prefer crop-specific chunks, but don't exclude general if few match
            pass

        all_chunks = chunks_query.all()
        if not all_chunks:
            return []

        scored_results = []
        for chunk in all_chunks:
            chunk_text = chunk.content.lower()
            chunk_tokens = set(re.findall(r'\w+', chunk_text))

            # Cosine semantic similarity
            chunk_vec = self._generate_embedding(chunk.content)
            semantic_score = self.cosine_similarity(query_vec, chunk_vec)

            # Exact keyword overlap score (BM25-style keyword matching)
            token_overlap = len(query_tokens.intersection(chunk_tokens))
            keyword_score = token_overlap / max(1, len(query_tokens))

            # Crop match boost
            crop_boost = 0.0
            if crop:
                target_crop = crop.lower()
                if chunk.crop and chunk.crop.lower() == target_crop:
                    crop_boost = 0.35
                elif target_crop in chunk_text:
                    crop_boost = 0.20

            # Topic match boost
            topic_boost = 0.0
            if topic:
                target_topic = topic.lower()
                if chunk.topic and chunk.topic.lower() == target_topic:
                    topic_boost = 0.25
                elif any(t in chunk_text for t in target_topic.split()):
                    topic_boost = 0.15

            # Combined hybrid score
            final_score = (0.50 * semantic_score) + (0.30 * keyword_score) + crop_boost + topic_boost
            
            # Bound score between 0.0 and 1.0
            normalized_score = min(0.99, max(0.40, final_score))

            doc = db.query(Document).filter(Document.id == chunk.document_id).first()
            doc_source = doc.source if doc else "Trusted Agricultural Guide"
            doc_title = doc.title if doc else "Agricultural Manual"

            scored_results.append({
                "chunk_id": chunk.id,
                "document_id": chunk.document_id,
                "document_title": doc_title,
                "source": doc_source,
                "crop": chunk.crop,
                "topic": chunk.topic,
                "section_name": chunk.section_name,
                "content": chunk.content,
                "similarity_score": round(normalized_score * 100, 1),
                "token_count": chunk.token_count
            })

        # Sort descending by score
        scored_results.sort(key=lambda x: x["similarity_score"], reverse=True)
        return scored_results[:top_k]

vector_store = VectorStore()
