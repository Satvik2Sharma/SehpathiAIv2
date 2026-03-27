from typing import List, Dict, Any

class PersonalizedStudyPlanner:
    def __init__(self, student_results: List[Dict[str, Any]]):
        self.student_results = student_results

    def generate_7_day_plan(self) -> List[Dict[str, Any]]:
        """
        Generates a 7-day study plan based on weak topics and conceptual gaps.
        Uses Grip Score to determine the intensity and type of tasks.
        """
        # Sort by Combined Score (Ascending)
        sorted_results = sorted(self.student_results, key=lambda x: x['combined_score'])
        
        # Identify top 2 weakest subjects/topics
        weak_topics = sorted_results[:2] if len(sorted_results) > 1 else sorted_results

        plan = []
        
        # Day 1-2: Primary Weakness
        if len(weak_topics) > 0:
            w1 = weak_topics[0]
            score = w1['combined_score']
            
            if score < 0.4:
                t1 = f"Total Reset: {w1['subject']} fundamentals."
                f1 = "Watch foundational videos and re-read basic chapters."
            else:
                t1 = f"Conceptual Refinement: {w1['subject']}."
                f1 = "Focus on the gaps identified in your NLP similarity score."
                
            plan.append({"day": "Day 1", "task": t1, "focus": f1, "status": "pending"})
            plan.append({
                "day": "Day 2", 
                "task": f"Active Recall: {w1['subject']} Quiz", 
                "focus": "Take a 10-question practice set with feedback.", 
                "status": "pending"
            })

        # Day 3-4: Secondary Weakness
        if len(weak_topics) > 1:
            w2 = weak_topics[1]
            plan.append({
                "day": "Day 3",
                "task": f"Targeted Review: {w2['subject']}",
                "focus": f"Investigate mapping between marks ({int(w2['marks_raw'])}%) and conceptual clarity.",
                "status": "pending"
            })
            plan.append({
                "day": "Day 4",
                "task": f"Peer Benchmark: {w2['subject']}",
                "focus": "Compare your previous answers with model answer key points.",
                "status": "pending"
            })
        else:
            plan.append({"day": "Day 3", "task": "Advanced Application", "focus": "Deep dive into your strongest subject.", "status": "pending"})
            plan.append({"day": "Day 4", "task": "Exploratory Project", "focus": "Build a small snippet using strongest area.", "status": "pending"})

        # Day 5: Cross-Subject Synthesis
        plan.append({
            "day": "Day 5",
            "task": "Remedial Logic Protocol",
            "focus": "Look for patterns in your errors across different subjects.",
            "status": "pending"
        })

        # Day 6: Simulation
        plan.append({
            "day": "Day 6",
            "task": "Timed Diagnostic Simulation",
            "focus": "Practice answering under time constraints to improve marks.",
            "status": "pending"
        })

        # Day 7: Final Optimization
        plan.append({
            "day": "Day 7",
            "task": "Review & Mastery Check",
            "focus": "Self-assess if your confidence in weak areas has increased.",
            "status": "pending"
        })

        return plan
