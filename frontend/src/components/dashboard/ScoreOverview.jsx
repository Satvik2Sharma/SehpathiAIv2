import { motion } from "framer-motion"
import { Award, AlertTriangle, BrainCircuit, BarChart3 } from "lucide-react"

export function ScoreOverview({ student }) {
  if (!student) return null

  const performanceTag = student.overall_score > 0.8
    ? { label: "Elite Performer", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" }
    : student.overall_score > 0.6
    ? { label: "Steady Growth", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" }
    : { label: "Action Required", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" }

  const insights = [
    { icon: AlertTriangle, label: "Needs Attention", value: student.weakest_subject, color: "text-red-400", bg: "bg-red-500/10" },
    { icon: Award, label: "Strongest Area", value: student.best_subject, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: BrainCircuit, label: "Confidence", value: `${Math.round(student.confidence_indicator * 100)}%`, color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: BarChart3, label: "Consistency", value: `${Math.round(student.consistency_score * 100)}%`, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-8 relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-slate-900/40 backdrop-blur-md p-10 flex flex-col items-center justify-center group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 opacity-50" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-3 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Top {Math.round(100 - student.percentile)}% in Section</span>
            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">{student.section}</span>
          </div>

          <div className="relative">
            <svg className="w-56 h-56 -rotate-90">
              <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
              <motion.circle
                cx="112" cy="112" r="100" stroke="url(#gradient-score)" strokeWidth="12" fill="transparent"
                strokeDasharray={628}
                initial={{ strokeDashoffset: 628 }}
                animate={{ strokeDashoffset: 628 - (628 * student.overall_score) }}
                transition={{ duration: 1.5, ease: "circOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-score" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-6xl font-black text-white tracking-tighter"
              >
                {Math.round(student.overall_score * 100)}
              </motion.span>
              <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Score</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tight">{student.student_id}</h2>
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border ${performanceTag.border} ${performanceTag.bg} ${performanceTag.color} text-[10px] font-black uppercase tracking-widest`}>
              <Award size={12} /> {performanceTag.label}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="lg:col-span-4 grid grid-cols-1 gap-4">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 5 }}
            className="bg-[#0a0c12] border border-white/[0.05] p-5 rounded-3xl flex items-center gap-4 group cursor-default"
          >
            <div className={`w-12 h-12 rounded-2xl ${insight.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <insight.icon size={22} className={insight.color} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{insight.label}</p>
              <p className="text-lg font-black text-white leading-tight uppercase">{insight.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
