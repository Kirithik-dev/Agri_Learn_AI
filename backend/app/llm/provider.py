import os
import json
from typing import Dict, Any, List, Optional
import httpx
from app.llm.prompt_builder import PromptBuilder

class LLMProvider:
    """Base abstract provider interface for agricultural LLM generation."""
    async def generate(
        self,
        system_prompt: str,
        user_prompt: str,
        params: Dict[str, Any]
    ) -> Dict[str, Any]:
        raise NotImplementedError

class GeminiProvider(LLMProvider):
    def __init__(self, api_key: str, model_name: str = "gemini-1.5-flash"):
        self.api_key = api_key
        self.model_name = model_name
        self.url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent?key={self.api_key}"

    async def generate(self, system_prompt: str, user_prompt: str, params: Dict[str, Any]) -> Dict[str, Any]:
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": f"{system_prompt}\n\n{user_prompt}\n\nReturn response formatted as clean JSON structure matching the required training sections."}]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "topP": 0.8,
                "maxOutputTokens": 4096
            }
        }
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(self.url, json=payload)
            response.raise_for_status()
            data = response.json()
            raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
            return {"raw_text": raw_text, "provider": "gemini"}

class OpenAIProvider(LLMProvider):
    def __init__(self, api_key: str, model_name: str = "gpt-4o-mini"):
        self.api_key = api_key
        self.model_name = model_name
        self.url = "https://api.openai.com/v1/chat/completions"

    async def generate(self, system_prompt: str, user_prompt: str, params: Dict[str, Any]) -> Dict[str, Any]:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model_name,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "temperature": 0.2
        }
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(self.url, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            raw_text = data["choices"][0]["message"]["content"]
            return {"raw_text": raw_text, "provider": "openai"}

class GroqProvider(LLMProvider):
    def __init__(self, api_key: str, model_name: str = "llama3-70b-8192"):
        self.api_key = api_key
        self.model_name = model_name
        self.url = "https://api.groq.com/openai/v1/chat/completions"

    async def generate(self, system_prompt: str, user_prompt: str, params: Dict[str, Any]) -> Dict[str, Any]:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model_name,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "temperature": 0.2
        }
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(self.url, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            raw_text = data["choices"][0]["message"]["content"]
            return {"raw_text": raw_text, "provider": "groq"}

def get_llm_provider() -> LLMProvider:
    provider = os.getenv("LLM_PROVIDER", "demo").lower()
    api_key = os.getenv("LLM_API_KEY", "").strip()
    model_name = os.getenv("MODEL_NAME", "gemini-1.5-flash")

    if provider == "gemini" and api_key:
        return GeminiProvider(api_key, model_name)
    elif provider == "openai" and api_key:
        return OpenAIProvider(api_key, model_name or "gpt-4o-mini")
    elif provider == "groq" and api_key:
        return GroqProvider(api_key, model_name or "llama3-70b-8192")
    
    # Defaults to Demo mode
    return None
