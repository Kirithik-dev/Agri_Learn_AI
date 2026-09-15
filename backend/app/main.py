import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import init_db, SessionLocal
from app.rag.seed_data import seed_knowledge_base
from app.api.endpoints import router as api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database and seed agricultural reference documents
    print("[START] Starting AGRI-LEARN AI Backend Service...")
    init_db()
    db = SessionLocal()
    try:
        seed_knowledge_base(db)
    finally:
        db.close()
    print("[READY] AGRI-LEARN AI Knowledge Base is ready.")
    yield
    print("[STOP] Shutting down AGRI-LEARN AI Backend Service...")

app = FastAPI(
    title="AGRI-LEARN AI API",
    description="Intelligent Agricultural Training Content Generator Backend (INTELLIX Hackathon - Team Syntax Soldiers BIT-AI-002)",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
extra_origin = os.getenv("FRONTEND_URL") 
if extra_origin:
    origins.append(extra_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {
        "name": "AGRI-LEARN AI",
        "description": "Intelligent Agricultural Training Content Generator",
        "hackathon": "INTELLIX: LLM & AI Optimization Hackathon",
        "problem_statement": "AGR-11 – Agricultural Training Content Generator",
        "team": "Syntax Soldiers (BIT-AI-002)",
        "college": "Bannari Amman Institute Of Technology",
        "status": "Online",
        "api_docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
