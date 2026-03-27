import io
import pandas as pd
import numpy as np
import math
from typing import List, Dict, Any, Optional

# Local imports
from ml.analyzer import LearningAnalyzer
from ml.study_planner import PersonalizedStudyPlanner

# Subject normalization map (Extended for V4)
SUBJECT_MAP = {
    'Java': 'Java',
    'Advanced_Python': 'Advanced Python',
    'OS': 'OS',
    'Computers_in_Space_Astronomy': 'Computers in Space & Astronomy',
    'IKS': 'IKS',
    'Environmental_Studies': 'Environmental Studies'
}

class ProcessingService:
    def __init__(self):
        self.analyzer = LearningAnalyzer()

    def process_data(self, answers_df: pd.DataFrame, marks_df: pd.DataFrame) -> Dict[str, Any]:
        """
        Refined data processing pipeline combining NLP diagnostics with marks-based analytics.
        """
        # 1. Base NLP & Grip Scores
        answers_df['marks_norm'] = (answers_df['marks'] / answers_df['total_marks']).clip(0, 1)
        answers_df['similarity'] = answers_df.apply(
            lambda r: self.analyzer.compute_similarity(r['model_answer'], r['student_answer']), axis=1
        )
        answers_df['grip_score'] = answers_df.apply(
            lambda r: self.analyzer.calculate_grip_score(r['marks_norm'], r['similarity']), axis=1
        )

        # Group NLP by student & subject
        nlp_subj = answers_df.groupby(['student_id', 'subject']).agg({
            'grip_score': 'mean',
            'similarity': 'mean',
            'question': list,
            'student_answer': list,
            'model_answer': list
        }).reset_index()

        # 2. Melt Marks Data
        marks_long = pd.melt(
            marks_df, 
            id_vars=['student_id', 'section'], 
            value_vars=[c for c in marks_df.columns if c in SUBJECT_MAP],
            var_name='subject', 
            value_name='marks_raw'
        )
        marks_long['subject'] = marks_long['subject'].map(SUBJECT_MAP)

        # 3. Merge
        merged = pd.merge(marks_long, nlp_subj, on=['student_id', 'subject'], how='inner')
        merged['combined_score'] = (0.7 * (merged['marks_raw']/100)) + (0.3 * merged['grip_score'])

        # 4. Aggregations
        subject_stats = merged.groupby('subject').agg({'combined_score': 'mean'}).rename(columns={'combined_score': 'avg_score'}).reset_index()
        subject_stats['avg_score'] = subject_stats['avg_score'].round(2)
        
        section_averages = merged.groupby('section')['combined_score'].mean().to_dict()

        student_details = []
        for sec in merged['section'].unique():
            sec_df = merged[merged['section'] == sec]
            
            # Ranking & Percentiles
            sec_students = sec_df.groupby('student_id').agg({
                'combined_score': ['mean', 'std'],
                'similarity': 'mean'
            }).reset_index()
            sec_students.columns = ['student_id', 'overall_score', 'std_dev', 'confidence']
            sec_students['std_dev'] = sec_students['std_dev'].fillna(0)
            sec_students['consistency'] = 1 / (1 + sec_students['std_dev'])
            
            sec_students = sec_students.sort_values(by='overall_score', ascending=False)
            sec_students['rank'] = range(1, len(sec_students) + 1)
            n = len(sec_students)
            sec_students['percentile'] = sec_students['rank'].apply(lambda r: round((1 - (r - 1) / n) * 100, 1))

            for _, st_row in sec_students.iterrows():
                sid = st_row['student_id']
                s_subset = merged[merged['student_id'] == sid].sort_values(by='combined_score')
                
                # Weak Concepts (Similarity < 0.5)
                s_ans_raw = answers_df[answers_df['student_id'] == sid]
                weak_raw = s_ans_raw[s_ans_raw['similarity'] < 0.5].to_dict('records')
                
                # Priority Actions
                p_actions = []
                for _, r in s_subset.head(2).iterrows():
                    p_actions.append(f"Reinforce {r['subject']} ({int(r['marks_raw'])}% marks + gap in conceptual clarity)")

                # Use Study Planner for 7-Day Plan
                planner = PersonalizedStudyPlanner(s_subset.to_dict('records'))
                study_plan = planner.generate_7_day_plan()

                student_details.append({
                    "student_id": sid,
                    "section": sec,
                    "overall_score": round(float(st_row['overall_score']), 2),
                    "consistency_score": round(float(st_row['consistency']), 2),
                    "percentile": st_row['percentile'],
                    "confidence_indicator": round(float(st_row['confidence']), 2),
                    "best_subject": s_subset.iloc[-1]['subject'] if not s_subset.empty else "N/A",
                    "weakest_subject": s_subset.iloc[0]['subject'] if not s_subset.empty else "N/A",
                    "subject_scores": s_subset[['subject', 'combined_score', 'marks_raw', 'grip_score']].to_dict('records'),
                    "weak_concepts": [f"{r['subject']}: {r['question']}" for r in weak_raw[:5]],
                    "priority_actions": p_actions[:3],
                    "study_plan": study_plan,
                    "peer_comparison": {
                        "section_avg": round(float(section_averages[sec]), 2),
                        "status": "above" if st_row['overall_score'] > section_averages[sec] else "below"
                    }
                })

        # Section Stats
        teacher_sections = {}
        for sec in merged['section'].unique():
            sec_list = [s for s in student_details if s['section'] == sec]
            sec_list.sort(key=lambda x: x['overall_score'], reverse=True)
            top_count = math.ceil(0.1 * len(sec_list))
            
            teacher_sections[sec] = {
                "avg_score": round(float(sum(s['overall_score'] for s in sec_list)/len(sec_list)), 2),
                "top_performers": sec_list[:top_count],
                "student_count": len(sec_list)
            }

        return {
            "students": student_details,
            "subjects": subject_stats.to_dict('records'),
            "sections": teacher_sections,
            "global_avg": round(float(merged['combined_score'].mean()), 2)
        }
