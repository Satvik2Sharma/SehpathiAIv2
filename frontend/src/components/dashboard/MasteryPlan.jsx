import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, CheckCircle, Clock, Sparkles } from "lucide-react"

export function MasteryPlan({ student }) {
  const [checkedDays, setCheckedDays] = useState({})

  const toggleDay = (day) => {
    setCheckedDays(prev => ({ ...prev, [day]: !prev[day] }))
  }

  if (!student) return null

  return (
    <div className="bg-[#0a0c12] border border-white/[0.05] rounded-[2.5rem] border-emerald-500/10 overflow-hidden">
      <div className="p-8 border-b border-white/5 bg-emerald-500/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen size={20} className="text-emerald-400" />
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">7-Day Mastery Protocol</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Custom sequence for {student.student_id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-white uppercase">{Object.values(checkedDays).filter(v => v).length}/{student.study_plan.length} Completed</p>
            <div className="w-24 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
              <motion.div 
                 animate={{ width: `${(Object.values(checkedDays).filter(v => v).length / student.study_plan.length) * 100}%` }}
                 className="h-full bg-emerald-500"
              />
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 rounded-lg text-emerald-400 text-[9px] font-black uppercase border border-emerald-500/20">Active</span>
        </div>
      </div>
      <div className="p-4 sm:p-8 space-y-4">
        {student.study_plan.map((item, i) => (
           <motion.div
            key={i}
            onClick={() => toggleDay(item.day)}
            className={`group flex items-center gap-6 p-6 rounded-3xl border transition-all cursor-pointer ${
              checkedDays[item.day]
              ? "bg-emerald-500/5 border-emerald-500/20" 
              : "bg-white/[0.02] border-white/5 hover:border-white/10"
            }`}
           >
              <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                checkedDays[item.day] ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20" : "border-slate-700 group-hover:border-slate-500"
              }`}>
                {checkedDays[item.day] && <CheckCircle size={18} className="text-white" />}
              </div>
              <div className="flex-1">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${checkedDays[item.day] ? "text-emerald-400/50" : "text-slate-500"}`}>{item.day}</span>
                <p className={`text-base font-bold transition-all ${checkedDays[item.day] ? "text-slate-500 line-through" : "text-slate-100"}`}>
                  {item.task}
                </p>
                <p className={`text-[10px] mt-1 ${checkedDays[item.day] ? "text-slate-600" : "text-slate-400"}`}>
                  Focus: {item.focus}
                </p>
              </div>
              {checkedDays[item.day] ? (
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hidden sm:block">Protocol Mastered</span>
              ) : (
                <Clock size={16} className="text-slate-700" />
              )}
           </motion.div>
        ))}
        {student.study_plan.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <Sparkles size={32} className="mx-auto text-indigo-400 opacity-20" />
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Optimization redundant — Performance at range</p>
          </div>
        )}
      </div>
    </div>
  )
}
