import pandas as pd
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any

class LearningAnalyzer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def compute_similarity(self, model_ans: str, student_ans: str) -> float:
        """
        Computes cosine similarity between model and student answers.
        Applies a penalty for very short answers and rewards matching key entities.
        """
        m_str = str(model_ans).strip().lower()
        s_str = str(student_ans).strip().lower()

        if not m_str or not s_str:
            return 0.0
            
        try:
            # 1. Base TF-IDF Similarity
            tfidf = self.vectorizer.fit_transform([m_str, s_str])
            sim = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
            
            # 2. Length Ratio Check
            len_ratio = len(s_str) / len(m_str)
            
            # Severe penalty for extremely short answers (likely missing core points)
            if len_ratio < 0.15:
                sim *= 0.3
            elif len_ratio < 0.4:
                sim *= 0.7
                
            # 3. Keyword/Entity Matching Bonus (Heuristic)
            # Find words that are in model_ans but not in student_ans
            m_words = set(re.findall(r'\w+', m_str))
            s_words = set(re.findall(r'\w+', s_str))
            
            common = m_words.intersection(s_words)
            if len(m_words) > 0:
                keyword_coverage = len(common) / len(m_words)
                # Blend the keyword coverage with cosine similarity
                sim = (0.6 * sim) + (0.4 * keyword_coverage)
                
            return min(float(sim), 1.0)
        except Exception:
            # Fallback for small datasets where fit_transform might fail
            return 0.0

    def calculate_grip_score(self, accuracy: float, similarity: float) -> float:
        """
        Sehpaathi Grip Score (V4.1)
        
        Formula: (0.7 * Accuracy) + (0.3 * NLP Similarity)
        
        Rationale:
        - Accuracy (Marks): Validates student's technical result.
        - Similarity (NLP): Validates conceptual depth and reasoning.
        """
        # Weighted harmonic-like blend (simple weighted average for now)
        return (0.7 * accuracy) + (0.3 * similarity)

    def classify_topic_mastery(self, score: float) -> str:
        """
        Classifies mastery levels based on Grip Score.
        """
        if score >= 0.8:
            return "Strong"
        elif score >= 0.5:
            return "Moderate"
        else:
            return "Weak"

    def process_student_performance(self, answers_df: pd.DataFrame, marks_df: pd.DataFrame) -> Dict[str, Any]:
        """
        Main processing logic to merge NLP insights with raw marks.
        """
        # 1. Normalize NLP data
        answers_df['marks_norm'] = (answers_df['marks'] / answers_df['total_marks']).clip(0, 1)
        answers_df['similarity'] = answers_df.apply(
            lambda r: self.compute_similarity(r['model_answer'], r['student_answer']), axis=1
        )
        answers_df['grip_score'] = answers_df.apply(
            lambda r: self.calculate_grip_score(r['marks_norm'], r['similarity']), axis=1
        )
        answers_df['mastery'] = answers_df['grip_score'].apply(self.classify_topic_mastery)

        return answers_df.to_dict('records')
