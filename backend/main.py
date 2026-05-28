from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import sys

# Ensure backend directory is in the path for modular imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Local imports
from api.routes import router as api_router

app = FastAPI(
    title="Sehpaathi AI (V4) — Intelligent Learning Gap Analyzer",
    description="Modularized production-ready API for deep pedagogical analytics. Built for portfolio excellence.",
    version="4.1.0"
)

# CORS configuration
allow_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://sehpaathi-a-iv2.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(api_router, prefix="/api/v1")
# Allow legacy /analyze etc for now (or redirect)
app.include_router(api_router)

@app.get("/")
async def root():
    return {
        "app": "Sehpaathi AI",
        "version": "4.1.0",
        "status": "Online",
        "docs": "/docs"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
