# AGRI-LEARN AI 🌾
### Intelligent Agricultural Training Content Generator
**INTELLIX: LLM & AI Optimization Hackathon**  
**Problem Statement:** AGR-11 – Agricultural Training Content Generator  
**Domain:** Agriculture & Rural Development  
**Team:** Syntax Soldiers (Team ID: `BIT-AI-002`)  
**College:** Bannari Amman Institute Of Technology  
**Department:** Artificial Intelligence and Data Science (2nd Year, 2026)  

---

## 👥 Team Members
- **Karuppusamy S** – Team Leader 
- **Vivin KG** – Team Member 
- **Nishanth R** – Team Member
- **Kirithik M** – Team Member

---

## 🌟 Project Overview
Agricultural training materials are often generic, difficult to understand, available in limited regional languages, time-consuming to prepare manually, and scattered across fragmented university repositories. When general LLMs are queried without grounding, they frequently hallucinate hazardous chemical pesticide dosages.

**AGRI-LEARN AI** is a state-of-the-art, full-stack web application designed for agricultural trainers, farmers, students, NGOs, and extension officers. It uses **Retrieval-Augmented Generation (RAG)** grounded in certified manuals from the **Indian Council of Agricultural Research (ICAR)** and the **Tamil Nadu Agricultural University (TNAU)** to automatically generate complete, pedagogical training kits in **English** and **Tamil**.

---

## 🚀 Key Features

1. **Multilingual Generation (English & Tamil)**:
   - Not just UI translation—the AI-generated agronomic training content itself is produced in authentic English and Tamil agricultural terminology (e.g. நெல் தண்டு துளைப்பான், வேப்பங்கொட்டை கரைசல், ட்ரைக்கோடெர்மா விரிடி).
2. **7 High-Value Agricultural Crops (Expandable)**:
   - Pre-loaded with official knowledge for: **Paddy (Rice)**, **Tomato**, **Cotton**, **Groundnut**, **Potato**, **Chilli**, and **Banana**.
3. **Target Audience Adaptation**:
   - Pedagogical pacing adapted for: *Beginner Farmer*, *Experienced Farmer*, *Agricultural Student*, *Agricultural Trainer*, *Extension Officer*, and *General Public*.
4. **Structured 14-Section Training Curriculum**:
   - Learning Objectives, Introduction, Key Concepts, Step-by-Step Field Practice, Practical Recommendations, Common Diagnostic Problems, Preventive Measures, Do's and Don'ts, Safety Precautions & Pre-Harvest Intervals (PHI), Interactive Knowledge Quiz, FAQs, Key Takeaways, Summary, and Trusted Source Citations.
5. **Interactive Knowledge Quiz & Scoring**:
   - Automatically generates MCQs and True/False questions with immediate in-browser grading, explanations, and score tracking.
6. **Transparent RAG Pipeline Drawer ("How this was generated")**:
   - Interactive modal detailing: User Requirements → Retrieved Document Chunks → Constructed Prompt → LLM → 7-Metric Evaluation → Reliability Checklist.
7. **Prompt Engineering Inspector ("View Prompt")**:
   - Allows judges to inspect internal structured prompts containing strict hallucination guardrails.
8. **7-Metric Automated Evaluation Scorecard**:
   - Automatically audits: *Relevance*, *Grounding*, *Completeness*, *Readability*, *Language Quality*, *Source Coverage*, and *Safety & PHI*.
9. **Zero-Tolerance Hallucination & Safety Guardrails**:
   - Strictly enforces Pre-Harvest Intervals (PHI), Personal Protective Equipment (PPE), and flags unverified chemical claims.
10. **Native Multi-Format Export**:
    - Instant generation of styled **PDF documents** (via ReportLab) and editable **Microsoft Word DOCX** files (via python-docx).
11. **Knowledge Base Management**:
    - Drag-and-drop uploader for PDF, DOCX, and TXT manuals with automatic text cleaning, chunking, and vector indexing.
12. **Analytics & Performance Dashboard**:
    - Recharts visualizations tracking generation volume, crop popularity, language distribution, and average evaluation scores.

---

## 🏗️ System Architecture

```
[ Frontend: React + TypeScript + Tailwind CSS (Vite) ]
                          │
                   REST APIs via HTTP
                          ▼
            [ Backend: FastAPI (Python 3.11) ]
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
   [ SQLite DB ]    [ RAG Engine ]   [ LLM Abstraction ]
   - Documents      - pypdf/docx     - Gemini / OpenAI
   - Chunks         - Cosine Store   - Groq / Demo Engine
   - Trainings      - ICAR/TNAU Data - Prompt Builder
         │                │                │
         └────────────────┼────────────────┘
                          ▼
           [ 7-Metric Evaluation & Safety ]
                          ▼
            [ Export Engine: PDF & DOCX ]
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Vite 8, Lucide Icons, Recharts |
| **Backend** | Python 3.11, FastAPI, Uvicorn, SQLAlchemy, SQLite |
| **RAG & Vector Search** | Hybrid Cosine Vector Engine, BM25 Keyword Search, PyPDF, python-docx |
| **LLM & AI** | Gemini 1.5 Flash, OpenAI GPT-4o-mini, Groq LLaMA-3, Domain Demo Engine |
| **Document Export** | ReportLab (PDF Generation), python-docx (Word Document Generation) |

---

## ⚙️ Installation & Setup Guide

### 1. Prerequisites
- Python 3.11+
- Node.js v18+ and npm

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# (Optional) Create and activate virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate

# Linux/macOS:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# Start the FastAPI server with auto-reload
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
*The backend will automatically create `data/agri_learn.db` and seed 7 official ICAR/TNAU agricultural reference manuals.*

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*Frontend will run at: `http://localhost:5173`.*

---

## 🔑 Environment Variables (`backend/.env`)

Configure your `backend/.env` file (copied from `backend/.env.example`):

```env
# LLM Provider: "demo", "gemini", "openai", or "groq"
LLM_PROVIDER=demo
LLM_API_KEY=
MODEL_NAME=gemini-1.5-flash

# Server Configuration
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Data Paths
DATA_DIR=../data
DB_PATH=../data/agri_learn.db
VECTOR_STORE_DIR=../data/vectorstore
DOCUMENTS_DIR=../data/documents
```

> **Note on Demo Mode:** When `LLM_PROVIDER=demo` (or no API key is specified), the system seamlessly runs in **Intelligent Demo Mode**. It produces authentic, grounded, and rich agricultural curricula in English and Tamil without requiring any external paid API keys.

---

## 🧪 Hackathon Demonstration Workflow (Acceptance Criteria)

1. **Launch App**: Open `http://localhost:5173` in your browser.
2. **Landing Page**: Review the hero section (*"Transform Agricultural Knowledge into Smarter Training"*), crop taxonomy, and workflow.
3. **Generate Training**:
   - Click **Generate Training** on the navbar.
   - Crop: **Paddy (நெல்)**
   - Agricultural Topic: **Pest Management**
   - Target Audience: **Beginner Farmer**
   - Language: **தமிழ் (Tamil)**
   - Duration: **15 minutes**
   - Click **Generate Grounded Training Module**.
4. **Observe RAG Pipeline Stepper**: Watch the 7-stage animated loader as it queries vector chunks, frames prompt constraints, and runs reliability audits.
5. **Inspect Output**:
   - Verify authentic Tamil agronomic terminology.
   - Check the **Reliability Checklist** badges (✓ Source Context Found, ✓ 14 Sections Present, ✓ Grounding Passed, ✓ Safety Checked).
   - Check the **Evaluation Score** (e.g. 93%+).
   - Expand and take the **Interactive Knowledge Quiz** (Section 10) and submit for instant grading.
   - Click **How Generated** to inspect the transparent 6-stage RAG drawer.
   - Click **View Prompt** to view the underlying structured system prompt.
6. **Export**: Click **Download PDF** and **Download DOCX** to inspect native document exports.
7. **Training Library**: Navigate to **Training Library** to see your module listed with search and filters.
8. **Knowledge Base**: Navigate to **Knowledge Base** to inspect the 7 pre-seeded ICAR/TNAU manuals and test uploading custom documents.
9. **Analytics**: Inspect the Recharts visualizations of crop popularity, language distribution, and retrieval latency.
10. **About**: View hackathon credentials, problem statement AGR-11, and Team Syntax Soldiers details.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/generate-training` | Executes full RAG + Prompt + LLM + Evaluation pipeline |
| `GET` | `/api/trainings` | Lists saved modules with search and filters |
| `GET` | `/api/trainings/{id}` | Fetches complete module with all 14 sections |
| `PUT` | `/api/trainings/{id}` | Updates module title, intro, and recommendations |
| `DELETE`| `/api/trainings/{id}` | Deletes module from database |
| `POST` | `/api/translate` | Translates a training module between English and Tamil |
| `POST` | `/api/upload-document` | Uploads and vector-indexes PDF, DOCX, or TXT manuals |
| `GET` | `/api/documents` | Lists all indexed knowledge documents |
| `DELETE`| `/api/documents/{id}` | Removes document and its vector chunks |
| `POST` | `/api/evaluate` | Standalone 7-metric evaluation endpoint |
| `GET` | `/api/analytics` | Returns generation trends, crop distributions, and latency |
| `GET` | `/api/export/{id}/pdf` | Generates and downloads native ReportLab PDF |
| `GET` | `/api/export/{id}/docx`| Generates and downloads native Word DOCX |
| `GET` | `/api/health` | Service health status and indexed document count |

---

## 💡 Practical AI Optimization Techniques

1. **Top-K Chunk Pruning**: Filters search results to top-4 high-relevance chunks, cutting prompt token consumption by ~65%.
2. **Hybrid Semantic + BM25 Matching**: Ensures precise botanical and entomological matching for pests, active ingredients, and Tamil translations.
3. **Structured Schema Output**: Enforces strict JSON keys for immediate frontend hydration without post-processing latency.
4. **Deterministic Resilient Dual-Engine**: Seamless fallback from live LLM APIs to the high-fidelity domain engine, ensuring zero downtime during hackathon presentations.

---

## 🏛️ Bananari Amman Institute Of Technology
**Department of Artificial Intelligence and Data Science (2nd Year)**  
Submitted for **INTELLIX: LLM & AI Optimization Hackathon (2026)**
