import os
import re
from typing import List, Dict, Any

class DocumentProcessor:
    """Processes uploaded documents (PDF, DOCX, TXT) into cleaned, metadata-rich chunks."""

    @staticmethod
    def extract_text(file_path: str, file_type: str) -> str:
        file_type = file_type.lower().replace(".", "")
        if file_type == "txt":
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()

        elif file_type == "pdf":
            try:
                from pypdf import PdfReader
                reader = PdfReader(file_path)
                text = ""
                for page in reader.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text += extracted + "\n\n"
                return text
            except Exception as e:
                return f"Error extracting PDF: {str(e)}"

        elif file_type in ["docx", "doc"]:
            try:
                import docx
                doc = docx.Document(file_path)
                return "\n\n".join([p.text for p in doc.paragraphs if p.text.strip()])
            except Exception as e:
                return f"Error extracting DOCX: {str(e)}"

        else:
            raise ValueError(f"Unsupported file type: {file_type}")

    @staticmethod
    def clean_text(text: str) -> str:
        """Clean raw extracted text from unwanted whitespace and artifacts."""
        # Replace multiple whitespace characters with single spaces
        text = re.sub(r'\r\n', '\n', text)
        text = re.sub(r'[ \t]+', ' ', text)
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()

    @staticmethod
    def chunk_text(
        text: str,
        chunk_size: int = 600,
        chunk_overlap: int = 120,
        crop: str = "General",
        topic: str = "General"
    ) -> List[Dict[str, Any]]:
        """Split text into overlapping semantic chunks with metadata."""
        cleaned = DocumentProcessor.clean_text(text)
        if not cleaned:
            return []

        # Split into paragraphs or sections
        paragraphs = cleaned.split("\n\n")
        chunks = []
        current_chunk = ""
        current_section = "General Overview"

        for p in paragraphs:
            p_strip = p.strip()
            if not p_strip:
                continue

            # Detect heading pattern
            if len(p_strip) < 75 and (p_strip.isupper() or p_strip.endswith(":") or p_strip.startswith(("#", "Section", "Chapter", "1.", "2.", "3.", "4.", "5."))):
                current_section = p_strip.replace("#", "").strip()

            if len(current_chunk) + len(p_strip) <= chunk_size:
                current_chunk += ("\n\n" if current_chunk else "") + p_strip
            else:
                if current_chunk:
                    chunks.append({
                        "content": current_chunk,
                        "crop": crop,
                        "topic": topic,
                        "section_name": current_section,
                        "token_count": len(current_chunk.split())
                    })
                    # Maintain overlap from the tail of current_chunk
                    words = current_chunk.split()
                    overlap_words = words[-max(1, chunk_overlap // 5):] if len(words) > 10 else []
                    current_chunk = " ".join(overlap_words) + ("\n\n" if overlap_words else "") + p_strip
                else:
                    # Single paragraph exceeds chunk size, split by sentences
                    sentences = re.split(r'(?<=[.?!]) +', p_strip)
                    sub_chunk = ""
                    for s in sentences:
                        if len(sub_chunk) + len(s) <= chunk_size:
                            sub_chunk += (" " if sub_chunk else "") + s
                        else:
                            if sub_chunk:
                                chunks.append({
                                    "content": sub_chunk,
                                    "crop": crop,
                                    "topic": topic,
                                    "section_name": current_section,
                                    "token_count": len(sub_chunk.split())
                                })
                            sub_chunk = s
                    if sub_chunk:
                        current_chunk = sub_chunk

        if current_chunk:
            chunks.append({
                "content": current_chunk,
                "crop": crop,
                "topic": topic,
                "section_name": current_section,
                "token_count": len(current_chunk.split())
            })

        return chunks
