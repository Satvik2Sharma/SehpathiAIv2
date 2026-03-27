import io
import pandas as pd
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from typing import Dict, Any

# Local imports
from services.processing import ProcessingService
from services.chat_service import ChatService
from schemas import ChatRequest, AnalysisResponse, StudentProfile

router = APIRouter()

# Global "Cache" for demo/portfolio purpose
# In production, this would use Redis or a Database
class AppState:
    processed_data = None
    students_map = {}

state = AppState()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_endpoint(
    answers_file: UploadFile = File(...),
    marks_file: UploadFile = File(...)
):
    try:
        ans_contents = await answers_file.read()
        marks_contents = await marks_file.read()
        
        ans_df = pd.read_csv(io.BytesIO(ans_contents))
        marks_df = pd.read_csv(io.BytesIO(marks_contents))
        
        service = ProcessingService()
        results = service.process_data(ans_df, marks_df)
        
        state.processed_data = results
        state.students_map = {s["student_id"]: s for s in results["students"]}
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/student/{sid}", response_model=StudentProfile)
async def get_student(sid: str):
    if sid not in state.students_map:
        raise HTTPException(status_code=404, detail="Student not found")
    return state.students_map[sid]

@router.post("/chat")
async def chat_endpoint(req: ChatRequest):
    service = ChatService(state.processed_data)
    response = service.get_response(req.query)
    return response

@router.get("/health")
async def health_check():
    return {"status": "healthy", "version": "4.1.0"}
