<div align="center">

<h1>
  <img src="https://img.shields.io/badge/رصد-RASAD-0f0f0f?style=for-the-badge&labelColor=0f0f0f&color=1a6b3a" alt="RASAD" />
</h1>

### AI-powered Arabic news verification platform

Paste a claim, URL, or upload an image — RASAD runs a **6-agent pipeline** and returns a sourced verdict in **10–15 seconds**.  
No login required. Fully open-source. Runs locally with free APIs.

<br/>

[![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Arabic NLP](https://img.shields.io/badge/Arabic_NLP-CAMeL_Tools-orange?style=flat-square)](https://github.com/CAMeL-Lab/camel_tools)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![No Login](https://img.shields.io/badge/Login-Not_Required-success?style=flat-square)](#)

</div>

---

## What is RASAD?

**RASAD (رصد)** means *observation* or *monitoring* in Arabic. It is a fact-checking pipeline built natively for Arabic-language content — handling dialectal variation, morphological complexity, and Arabic media sources out of the box.

Submit any of the following:

| Input | Examples |
|-------|---------|
| 📝 **Claim text** | "قال الرئيس كذا..." — Arabic or English |
| 🔗 **URL** | News article, social media post, or any public page |
| 🖼️ **Image** | Screenshot, photo, or uploaded media file |

RASAD returns a structured verdict with confidence score, an Arabic explanation, per-agent evidence, and corroborating sources.

---

## Verdict types

| Verdict | Meaning |
|---------|---------|
| ✅ `VERIFIED` | Claim confirmed by multiple reliable sources |
| ❌ `FALSE` | Claim directly contradicted by evidence |
| ⚠️ `MISLEADING` | Partially true but presented out of context |
| 🤖 `AI_GENERATED` | Image or text shows strong AI-generation signals |
| ✂️ `MANIPULATED` | Media has been edited or tampered with |
| 🕐 `OLD_NEWS` | Event is real but being recirculated as new |
| ❓ `UNVERIFIED` | Insufficient evidence to confirm or deny |
| 🔁 `DUPLICATE` | Identical or near-identical claim already processed |
| 🚨 `HIGH_RISK` | High potential for harm; flagged for urgent review |

---

## Output schema

```json
{
  "verdict": "MISLEADING",
  "confidence": 84,
  "arabic_explanation": "هذا الادعاء يحتوي على معلومات مضللة...",
  "agent_breakdown": {
    "arabic_nlp":        { "score": 91, "evidence": "..." },
    "media_authenticity":{ "score": 78, "evidence": "..." },
    "reference_check":   { "score": 88, "evidence": "..." },
    "fake_news_ml":      { "score": 82, "evidence": "..." },
    "claim_tracing":     { "score": 75, "evidence": "..." },
    "verdict_synthesis": { "score": 84, "explanation": "..." }
  },
  "sources": [
    "https://example-arabic-news.com/article-1",
    "https://example-factcheck.org/article-2"
  ]
}
```

---

## The 6-agent pipeline

```
Input
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│  01  Arabic NLP          Morphological analysis, dialect        │
│                          detection, named-entity extraction      │
│                                                                  │
│  02  Media Authenticity  Reverse image search, EXIF metadata,   │
│                          AI-generation detection                 │
│                                                                  │
│  03  Reference Check     Cross-checks RSS feeds + live web      │
│                          search against trusted Arabic sources   │
│                                                                  │
│  04  Fake-news ML        Fine-tuned classifier on linguistic     │
│                          and structural patterns                 │
│                                                                  │
│  05  Claim Tracing       Origin detection, first-appearance      │
│                          timestamp, spread timeline, duplicates  │
│                                                                  │
│  06  Verdict Synthesis   Gemini-powered Arabic explanation +     │
│                          confidence score aggregation            │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
Verdict + Sources (10–15 seconds)
```

---

## Quick start

### Prerequisites

- Python 3.10+
- Git

### 1 — Clone the repo

```bash
git clone https://github.com/your-username/rasad.git
cd rasad
```

### 2 — Set up the backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### 3 — Configure environment

```bash
cp .env.example .env
```

Open `.env` and add your keys:

```env
GEMINI_API_KEY=your_key_here   # Optional — agents run without it
```

> **Note:** RASAD works without a Gemini API key. Agent 6 (Verdict Synthesis) will fall back to a rule-based aggregation. All other agents run fully locally.

### 4 — Start the server

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

API is now live at **http://127.0.0.1:8000**  
Interactive docs at **http://127.0.0.1:8000/docs**

---

## API usage

### Verify a text claim

```bash
curl -X POST http://127.0.0.1:8000/verify \
  -H "Content-Type: application/json" \
  -d '{"input_type": "text", "content": "ادعاء إخباري للتحقق منه"}'
```

### Verify a URL

```bash
curl -X POST http://127.0.0.1:8000/verify \
  -H "Content-Type: application/json" \
  -d '{"input_type": "url", "content": "https://example.com/article"}'
```

### Verify an image

```bash
curl -X POST http://127.0.0.1:8000/verify \
  -F "input_type=image" \
  -F "file=@screenshot.png"
```

---

## Project structure

```
rasad/
├── backend/
│   ├── main.py                 # FastAPI entry point
│   ├── agents/
│   │   ├── arabic_nlp.py       # Agent 01
│   │   ├── media_auth.py       # Agent 02
│   │   ├── reference_check.py  # Agent 03
│   │   ├── fake_news_ml.py     # Agent 04
│   │   ├── claim_tracing.py    # Agent 05
│   │   └── verdict_synthesis.py# Agent 06
│   ├── models/                 # ML model weights
│   ├── requirements.txt
│   └── .env.example
├── frontend/                   # (optional UI)
└── README.md
```

---

## Design principles

- **Arabic-native** — built for Arabic morphology, dialectal variation, and RTL content; not a translation of an English tool
- **Local-first** — open-source models and free APIs; no proprietary black boxes
- **Transparent** — every verdict includes per-agent scores and evidence, not just a label
- **No login required** — zero friction, works immediately
- **Graceful degradation** — Gemini key is optional; the system downgrades cleanly without it

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

```bash
# Run tests
pytest backend/tests/

# Lint
ruff check backend/
```

---

## Roadmap

- [ ] Browser extension for one-click verification
- [ ] WhatsApp bot integration (common Arabic news sharing vector)
- [ ] Additional dialect models (Gulf, Levantine, Maghrebi)
- [ ] Public API with rate limiting
- [ ] Frontend dashboard

---

## License

[MIT](LICENSE)

---

<div align="center">
  <sub>Built for Arabic-speaking communities. رصد — observe, verify, inform.</sub>
</div>
