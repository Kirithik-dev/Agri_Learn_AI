from typing import List, Dict, Any

class PromptBuilder:
    """
    Constructs transparent, grounded, structured prompts for agricultural training generation.
    Incorporates strict hallucination mitigation, safety controls, and target audience framing.
    """

    @staticmethod
    def build_system_prompt() -> str:
        return (
            "You are AGRI-LEARN AI, a senior agricultural training expert and extension pedagogy specialist. "
            "Your objective is to produce personalized, highly reliable, pedagogically structured agricultural training kits. "
            "Your instructions:\n"
            "1. GROUNDING & FIDELITY: Use ONLY the provided retrieved agricultural reference context. Do NOT fabricate chemical dosages, unregistered pesticide mixtures, or speculative farming practices.\n"
            "2. ADAPTABILITY: Adapt the vocabulary and pedagogical pacing precisely to the specified Target Audience, Difficulty Level, and Training Duration.\n"
            "3. MULTILINGUAL FIDELITY: When the requested language is Tamil, generate the training content natively in clear, formal Tamil agricultural terminology (தமிழ் விவசாய கலைச்சொற்கள்).\n"
            "4. SAFETY FIRST: Whenever discussing plant protection or agrochemicals, always include safety gear (PPE), Pre-Harvest Intervals (PHI), and non-toxic bio-agent alternatives first.\n"
            "5. TRANSPARENCY: If the retrieved context lacks sufficient information for a requested topic, explicitly state that reliable data was unavailable in the trusted knowledge base."
        )

    @staticmethod
    def build_user_prompt(
        crop: str,
        topic: str,
        target_audience: str,
        language: str,
        difficulty: str,
        duration: int,
        content_type: str,
        additional_requirements: str,
        retrieved_chunks: List[Dict[str, Any]]
    ) -> str:
        # Format retrieved context
        context_str = ""
        if retrieved_chunks:
            for idx, c in enumerate(retrieved_chunks, 1):
                context_str += (
                    f"--- RETRIEVED SOURCE {idx} ---\n"
                    f"Document: {c.get('document_title', 'Agricultural Manual')}\n"
                    f"Source Authority: {c.get('source', 'ICAR/TNAU/FAO')}\n"
                    f"Section: {c.get('section_name', 'General')}\n"
                    f"Content:\n{c.get('content', '')}\n\n"
                )
        else:
            context_str = "No specific agricultural document chunks were retrieved for this query.\n"

        prompt = f"""================ AGRICULTURAL TRAINING GENERATION REQUEST ================
Crop: {crop}
Topic: {topic}
Target Audience: {target_audience}
Output Language: {language}
Difficulty Level: {difficulty}
Training Duration: {duration} minutes
Content Type: {content_type}
Additional User Requirements: {additional_requirements or 'Standard comprehensive training curriculum.'}

================ RETRIEVED TRUSTED AGRICULTURAL CONTEXT ================
{context_str}

================ OUTPUT FORMAT REQUIREMENTS ================
Produce a complete structured training package in {language}.
Include the following structured sections:
1. Training Title
2. Learning Objectives (3-5 clear action-oriented bullet points)
3. Introduction (Contextual background tailored to {target_audience})
4. Key Concepts (Fundamental agronomic principles)
5. Step-by-Step Training Module (Chronological, actionable field practices)
6. Practical Recommendations & Cost-effective Tips
7. Common Problems & Diagnostic Symptoms
8. Preventive Measures & Cultural Controls
9. Do's and Don'ts (Table/Categorized)
10. Safety Precautions & Environmental Care (Include PPE & Pre-Harvest Intervals)
11. Interactive Quiz (3 MCQs and 2 True/False questions with options, answers, and explanations)
12. Frequently Asked Questions (3-4 FAQs with answers and source citations)
13. Key Takeaways & Summary
14. Sources & Trusted References Cited

RELIABILITY CONSTRAINT:
Ensure every recommendation is grounded in the retrieved agricultural manuals. If a claim cannot be verified, state: 'Sufficient verified agricultural recommendations were not found in the trusted knowledge base.'
"""
        return prompt
