# 🧠 Sehpaathi AI (V4.1) — Intelligent Learning Gap Analyzer

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://your-vercel-link.app)
[![Render Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://your-render-link.onrender.com)
[![SDG 4](https://img.shields.io/badge/SDG-4_Quality_Education-C5192D)](https://sdgs.un.org/goals/goal4)

> **"Transforming static marks into dynamic mastery protocols."**

Sehpaathi AI is a production-grade pedagogy analytics engine designed to identify deep conceptual learning gaps at scale. By merging **NLP-based Answer Similarity** with **Precision Marks Data**, it creates a "Grip Score" that informs 7-day personalized mastery protocols for students and high-fidelity diagnostics for educators.

---

## 🚀 The Problem & Our Solution

### **The Problem**
Traditional grading focuses on **Correctness (Marks)** but ignores **Conceptuality (The "Why")**. A student can score 90/100 through pattern matching without truly understanding the core principles.

### **The Solution**
Sehpaathi AI introduces the **Hybrid Grip Score (HGS)**:
- **0.7 Weight (Accuracy)**: Validates the technical result.
- **0.3 Weight (NLP Similarity)**: Validates conceptual reasoning against model benchmarks.

---

## ✨ Key Features (V4.1)

- **Dual-Stream Analytics**: Simultaneously process NLP corpora (Answers) and Analytics streams (Marks).
- **Interactive Performance Spectrum**: Radar & Bar visualizations for comprehensive strength detection.
- **7-Day Mastery Protocol**: Auto-generated, dynamic study plans derived from real-time performance gaps.
- **Unified AI Chat Assistant**: Context-aware queries (e.g., *"What is the most critical subject gap in Section A?"*).
- **Proactive Interventions**: "Critical Score Gap" banners to highlight the most impactful areas for improvement.

---

## ⚙️ Tech Stack

### **Frontend**
- **React 18**: Component-based UI for high performance.
- **Vite**: Ultra-fast module bundling.
- **Framer Motion**: Premium, fluid UI animations.
- **Recharts**: High-fidelity data visualizations.
- **Tailwind CSS**: Utility-first, professional design system.

### **Backend**
- **FastAPI**: High-performance, asynchronous REST API.
- **Python ML Stack**: Pandas, Scikit-Learn (TF-IDF, Cosine Similarity).
- **Pydantic**: Robust data validation and serialization.

---

## 🏗️ Architecture

```mermaid
graph TD
    A[Frontend: React/Vite] -->|POST /analyze| B[Backend: FastAPI]
    B --> C[Processing Service]
    C --> D[ML Engine: NLP Similarity]
    C --> E[ML Engine: Study Planner]
    C --> F[Data Aggregator]
    F -->|Unified JSON Response| A
    A --> G[Student Dashboard]
    A --> H[AI Chat Assistant]
```

---

## 📊 Screenshots & UI

*(Replace these with your actual screenshots after deployment)*

### **1. Performance Overview**
![Overview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000)
*Visualizing the Grip Score Spectrum and student percentile.*

### **2. Mastery Protocol (7-Day Plan)**
![Mastery Plan](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000)
*Personalized remedial sequences generated automatically.*

---

## 🌐 Live Demos

- **Frontend**: [sehpaathi-ai.vercel.app](https://your-vercel-link.app)
- **Backend**: [sehpaathi-api.onrender.com](https://your-render-link.onrender.com)

---

## 🔮 Future Scope

1. **Multi-Model NLP**: Support for Transformer-based embeddings (BERT/Llama) for deeper semantic search.
2. **Predictive Grading**: Early warning systems to flag students at risk of falling behind.
3. **Teacher Remediation Hub**: Integrated tools for teachers to assign specific content to "Weak Topic" clusters.

---

## 🤝 Contributors

- **Your Name** — *Lead Developer & Architect*

---

*This project was built to empower education through intelligent, data-driven analytics. Aligning with **UN SDG 4**.*
