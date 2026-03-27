from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class ChatRequest(BaseModel):
    query: str

class SubjectScore(BaseModel):
    subject: str
    combined_score: float
    marks_raw: float
    grip_score: float

class PeerComparison(BaseModel):
    section_avg: float
    status: str

class StudyPlanDay(BaseModel):
    day: str
    task: str
    focus: str
    status: str

class StudentProfile(BaseModel):
    student_id: str
    section: str
    overall_score: float
    consistency_score: float
    percentile: float
    confidence_indicator: float
    best_subject: str
    weakest_subject: str
    subject_scores: List[SubjectScore]
    weak_concepts: List[str]
    priority_actions: List[str]
    study_plan: List[StudyPlanDay]
    peer_comparison: PeerComparison

class SectionStats(BaseModel):
    avg_score: float
    top_performers: List[StudentProfile]
    student_count: int

class AnalysisResponse(BaseModel):
    students: List[StudentProfile]
    subjects: List[Dict[str, Any]]
    sections: Dict[str, SectionStats]
    global_avg: float
