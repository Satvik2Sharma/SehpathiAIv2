import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Flame, MousePointer2, Zap, ExternalLink, TrendingUp } from "lucide-react"

// Modular Components
import { ScoreOverview } from "./dashboard/ScoreOverview"
import { PerformanceAnalytics } from "./dashboard/PerformanceAnalytics"
import { MasteryPlan } from "./dashboard/MasteryPlan"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}

export function StudentDashboard({ student, idx, total, onPrev, onNext }) {
  if (!student) return null

  // Calculate potential gain for the banner
  const scores = student.subject_scores.map(s => s.combined_score)
  const minScore = Math.min(...scores)
  const potentialGain = Math.min(Math.round((0.8 - minScore) * 100 * 0.4), 18)

  return (
    <motion.div
      key={student.student_id}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-8 pb-24"
    >
      {/* 🧭 NAVIGATION & CONTROLS */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI-Driven Diagnostics</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Student Performance <span className="text-slate-600">/</span> <span className="text-indigo-400">Analysis V4</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={onPrev} 
            disabled={idx === 0} 
            className="p-2 hover:bg-white/10 text-slate-400 disabled:opacity-20 rounded-xl transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="px-4 py-1 bg-white/5 rounded-lg">
            <span className="text-sm font-black text-white">{idx + 1}</span>
            <span className="text-[10px] text-slate-500 mx-2 font-bold uppercase">of</span>
            <span className="text-sm font-black text-slate-400">{total}</span>
          </div>
          <button 
            onClick={onNext} 
            disabled={idx === total - 1} 
            className="p-2 hover:bg-white/10 text-slate-400 disabled:opacity-20 rounded-xl transition-all active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>

      {/* 🔥 1. CRITICAL INSIGHT BANNER */}
      <motion.div
        variants={itemVariants}
        className="group relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-500/15 via-orange-500/5 to-transparent p-6 sm:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 animate-bounce-slow">
            <Flame size={28} className="text-red-400" />
          </div>
          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-xs font-black text-red-400 uppercase tracking-[0.3em]">Critical Score Gap Detected</h2>
            <p className="text-lg sm:text-xl text-slate-100 leading-tight font-medium">
              Your biggest performance gap is in <span className="font-extrabold text-white underline decoration-red-500/50 underline-offset-4">{student.weakest_subject}</span>.
              {student.weak_concepts.length > 0 && (
                <> Focused revision on <span className="font-bold text-orange-300">{student.weak_concepts[0].split(': ')[1] || student.weak_concepts[0]}</span> could increase your overall rank.</>
              )}
            </p>
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                Potential Gain: +{potentialGain}%
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                Priority 1 <MousePointer2 size={10} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 📊 2. SCORE OVERVIEW */}
      <ScoreOverview student={student} />

      {/* 📈 3. PERFORMANCE ANALYTICS */}
      <PerformanceAnalytics student={student} />

      {/* 🤖 4. AI ACTION PANEL */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Zap size={18} className="text-indigo-400" />
          </div>
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Priority Action Items</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(student.priority_actions.length > 0 ? student.priority_actions : ["Maintain current momentum", "Explore advanced topics"]).map((action, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-[#0a0c12] border border-white/[0.05] p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-indigo-500/10 transition-colors" />
              <div className="flex flex-col h-full space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-indigo-400">
                  0{i + 1}
                </div>
                <p className="text-sm font-bold text-slate-100 leading-relaxed flex-1">
                  {action}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  Execute Action <ExternalLink size={10} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 📘 5. STUDY PLAN */}
      <motion.div variants={itemVariants}>
        <MasteryPlan student={student} />
      </motion.div>

      {/* 🧑🤝🧑 6. PEER COMPARISON */}
      <motion.div variants={itemVariants} className="bg-[#0a0c12] border border-white/[0.05] rounded-[2.5rem] p-10 border border-white/5 overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
              <TrendingUp size={20} className="text-indigo-400" /> Competitive Index
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comparison against section <span className="text-white font-bold">{student.section}</span> performance baseline. Status: <span className={`font-black uppercase ${student.peer_comparison.status === 'above' ? 'text-emerald-400' : 'text-orange-400'}`}>{student.peer_comparison.status} Average</span>.
            </p>
            <div className={`inline-block px-4 py-2 rounded-2xl ${student.peer_comparison.status === 'above' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-orange-500/10 border-orange-500/20 text-orange-400"} border text-[10px] font-black uppercase tracking-widest`}>
              {student.peer_comparison.status === 'above' ? "Exceeding Expectations" : "Growth Potential Identified"}
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-8">
            {[
              { label: "You", value: Math.round(student.overall_score * 100), color: "bg-indigo-500", glow: "shadow-indigo-500/20" },
              { label: "Section Avg", value: Math.round(student.peer_comparison.section_avg * 100), color: "bg-slate-600", glow: "" },
            ].map((peer, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{peer.label}</span>
                  <span className="text-xl font-black text-white">{peer.value}%</span>
                </div>
                <div className="h-4 bg-white/5 rounded-2xl overflow-hidden p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${peer.value}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2, ease: "circOut" }}
                    className={`h-full rounded-xl ${peer.color} ${peer.glow} shadow-lg`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </motion.div>
  )
}
