export const demoData = {
  global_avg: 0.72,
  subjects: [
    { subject: "Advanced Python", avg_score: 0.65 },
    { subject: "OS", avg_score: 0.78 },
    { subject: "Java", avg_score: 0.70 },
    { subject: "IKS", avg_score: 0.82 },
    { subject: "Computers in Space & Astronomy", avg_score: 0.62 },
    { subject: "Environmental Studies", avg_score: 0.85 }
  ],
  sections: {
    "A": {
      avg_score: 0.75,
      student_count: 32,
      top_performers: [] // Populated by student profiles
    },
    "B": {
      avg_score: 0.68,
      student_count: 28,
      top_performers: []
    }
  },
  students: [
    {
      student_id: "STU-2024-001",
      section: "A",
      overall_score: 0.84,
      consistency_score: 0.92,
      percentile: 98.5,
      confidence_indicator: 0.88,
      best_subject: "Advanced Python",
      weakest_subject: "Java",
      subject_scores: [
        { subject: "Advanced Python", combined_score: 0.92, marks_raw: 95, grip_score: 0.85 },
        { subject: "Java", combined_score: 0.68, marks_raw: 72, grip_score: 0.60 },
        { subject: "OS", combined_score: 0.85, marks_raw: 88, grip_score: 0.78 },
        { subject: "IKS", combined_score: 0.95, marks_raw: 98, grip_score: 0.90 }
      ],
      weak_concepts: [
        "Java: Memory management and Garbage Collection",
        "OS: Deadlocks and Process Synchronization"
      ],
      priority_actions: [
        "Review Java OOP principles.",
        "Practice OS synchronization primitives."
      ],
      study_plan: [
        { day: "Day 1", task: "Java: Memory Management deep dive.", focus: "Review JVM internals.", status: "pending" },
        { day: "Day 2", task: "Java Practice: Heap vs Stack.", focus: "Coding exercises on objects.", status: "pending" },
        { day: "Day 3", task: "OS: Process Sync fundamentals.", focus: "Sempahores and Mutexes.", status: "pending" },
        { day: "Day 4", task: "OS Lab simulation.", focus: "Deadlock prevention.", status: "pending" },
        { day: "Day 5", task: "Peer Review: Java best practices.", focus: "Check section A benchmarks.", status: "pending" },
        { day: "Day 6", task: "Revision: Java & OS.", focus: "Cross-subject conceptual overlap.", status: "pending" },
        { day: "Day 7", task: "Final Mock Test (Block 1).", focus: "30-min timed diagnostic.", status: "pending" }
      ],
      peer_comparison: { section_avg: 0.75, status: "Above Average" }
    },
    {
      student_id: "STU-2024-002",
      section: "B",
      overall_score: 0.62,
      consistency_score: 0.75,
      percentile: 45.0,
      confidence_indicator: 0.58,
      best_subject: "Environmental Studies",
      weakest_subject: "Advanced Python",
      subject_scores: [
        { subject: "Advanced Python", combined_score: 0.45, marks_raw: 50, grip_score: 0.35 },
        { subject: "Environmental Studies", combined_score: 0.88, marks_raw: 92, grip_score: 0.80 },
        { subject: "OS", combined_score: 0.58, marks_raw: 65, grip_score: 0.45 },
        { subject: "Java", combined_score: 0.62, marks_raw: 70, grip_score: 0.55 }
      ],
      weak_concepts: [
        "Advanced Python: List Comprehensions and Generators",
        "OS: Virtual Memory and Paging"
      ],
      priority_actions: [
        "Focus on Python foundational logic.",
        "Attend OS remedial session for Memory management."
      ],
      study_plan: [
        { day: "Day 1", task: "Python: Iterators & Generators.", focus: "Understand lazy evaluation.", status: "pending" },
        { day: "Day 2", task: "Python Lab: Comprehensions.", focus: "Refactoring simple loops.", status: "pending" },
        { day: "Day 3", task: "OS Virtual Memory: Page tables.", focus: "Logical vs Physical addresses.", status: "pending" },
        { day: "Day 4", task: "OS Problems: TLB and Page faults.", focus: "Calculation based exercises.", status: "pending" },
        { day: "Day 5", task: "Self Assessment: Python vs OS.", focus: "Comparing marks vs concepts.", status: "pending" },
        { day: "Day 6", task: "Review: Environmental Studies.", focus: "Maintain the lead in strong areas.", status: "pending" },
        { day: "Day 7", task: "Bi-weekly Remediation Test.", focus: "Focused 45-min evaluation.", status: "pending" }
      ],
      peer_comparison: { section_avg: 0.68, status: "Below Average" }
    }
  ]
};
