from typing import Dict, Any, List

class ChatService:
    def __init__(self, processed_data: Dict[str, Any]):
        self.data = processed_data

    def get_response(self, query: str) -> Dict[str, Any]:
        """
        Refined semantic routing for AI Chat assistant.
        """
        if not self.data:
            return {
                "answer": "Datasets are not initialized. Please upload data first.", 
                "visualization_type": "none"
            }

        query = query.lower()
        
        # 1. Weakest Subject / Gaps
        if any(k in query for k in ["weakest", "gap", "struggling", "low", "worst"]):
            subj = min(self.data["subjects"], key=lambda k: k["avg_score"])
            return {
                "answer": f"The most critical gap is in {subj['subject']} where the global average score is {int(subj['avg_score']*100)}%. We recommend prioritizing this in the next remedial session.",
                "data": self.data["subjects"],
                "visualization_type": "radar"
            }

        # 2. Top Performers / Leading Sections
        if any(k in query for k in ["top", "best", "leading", "high", "good"]):
            best_sec = max(self.data["sections"], key=lambda k: self.data["sections"][k]["avg_score"])
            return {
                "answer": f"Section {best_sec} is leading with a {int(self.data['sections'][best_sec]['avg_score']*100)}% average. These students show high consistency in conceptual understanding.",
                "data": [{"name": f"Section {k}", "avg": v["avg_score"]} for k,v in self.data["sections"].items()],
                "visualization_type": "bar"
            }

        # 3. Subject Specific (Simple lookup)
        for subj_obj in self.data["subjects"]:
            if subj_obj["subject"].lower() in query:
                return {
                    "answer": f"In {subj_obj['subject']}, the average performance is {int(subj_obj['avg_score']*100)}%. This subject is currently being tracked for remedial optimization.",
                    "data": [subj_obj],
                    "visualization_type": "none"
                }

        return {
            "answer": "Ask me about learning gaps, top-performing sections, or specific subject remediation.",
            "visualization_type": "none"
        }
