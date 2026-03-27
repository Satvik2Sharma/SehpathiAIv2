import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, Legend } from "recharts"
import { Users, GraduationCap, Trophy, Info, AlertTriangle, TrendingUp, Zap, Sparkles, LayoutDashboard } from "lucide-react"

export function TeacherDashboard({ data }) {
  if (!data) return null

  const sectionData = Object.entries(data.sections).map(([name, stats]) => ({
    name: `Section ${name}`,
    avg: Math.round(stats.avg_score * 100)
  }))

  const subjectData = data.subjects.map(s => ({
    subject: s.subject,
    avg: Math.round(s.avg_score * 100),
    difficulty: s.difficulty
  }))

  // Leaderboard flattening across sections
  const leaderboard = []
  Object.entries(data.sections).forEach(([sec, stats]) => {
    stats.top_performers.forEach(p => {
       leaderboard.push({ ...p, section: sec })
    })
  })
  leaderboard.sort((a, b) => b.overall_score - a.overall_score)

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case "Hard": return "text-red-400 bg-red-400/10 border-red-400/20"
      case "Medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default: return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Dynamic Benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-surface-900/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-between shadow-2xl backdrop-blur-xl group hover:border-brand-500/20 transition-all">
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Unified Average</span>
            <div className="text-4xl font-black text-brand-400 mt-2">{Math.round(data.global_avg * 100)}%</div>
            <div className="text-[10px] text-slate-600 mt-4 flex items-center gap-2 font-mono"><TrendingUp size={10} className="text-brand-500"/> Performance Pulse</div>
         </div>
         <div className="bg-surface-900/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-between shadow-2xl backdrop-blur-xl group hover:border-brand-500/20 transition-all">
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Data Reach</span>
            <div className="text-4xl font-black text-slate-100 mt-2 uppercase">{data.students.length}</div>
            <div className="text-[10px] text-slate-600 mt-4 flex items-center gap-2 font-mono"><Users size={10} className="text-brand-500"/> Verified Students</div>
         </div>
         <div className="bg-surface-900/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-between shadow-2xl backdrop-blur-xl group hover:border-brand-500/20 transition-all">
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">Subject Count</span>
            <div className="text-4xl font-black text-brand-500 mt-2">{data.subjects.length}</div>
            <div className="text-[10px] text-slate-600 mt-4 flex items-center gap-2 font-mono"><Sparkles size={10} className="text-brand-500"/> Courses Analyzed</div>
         </div>
         <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl flex flex-col justify-between shadow-2xl group hover:border-emerald-500/20 transition-all">
            <span className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-black">Section Peak</span>
            <div className="text-4xl font-black text-emerald-400 mt-2 uppercase">{Object.keys(data.sections).length}</div>
            <div className="text-[10px] text-emerald-500/60 mt-4 flex items-center gap-2 font-mono"><Users size={10}/> Active Streams</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Strategic Comparison */}
         <div className="bg-surface-900 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <h3 className="text-xs font-black text-slate-300 mb-8 flex items-center gap-3 uppercase tracking-widest">
               <TrendingUp size={16} className="text-brand-500" />
               Sectional Combined Performance
            </h3>
            <div className="h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectionData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis dataKey="name" tick={{ fill: "#64748b", fontStyle: "italic", fontWeight: "bold", fontSize: 10 }} axisLine={false} tickLine={false} />
                     <YAxis hide domain={[0, 100]} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
                        itemStyle={{ color: "#6366f1", fontSize: "12px", fontWeight: "black" }}
                        cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
                     />
                     <Bar dataKey="avg" radius={[12, 12, 4, 4]} barSize={50}>
                        {sectionData.map((entry, index) => (
                           <Cell key={index} fill="#6366f1" fillOpacity={0.8} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Difficulty Matrix */}
         <div className="bg-surface-900 border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xs font-black text-slate-300 mb-8 flex items-center gap-3 uppercase tracking-widest">
               <Zap size={16} className="text-brand-500" />
               Subject Difficulty Index (Global)
            </h3>
            <div className="grid grid-cols-1 gap-4">
               {subjectData.sort((a,b) => a.avg - b.avg).map(s => (
                  <div key={s.subject} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/5 transition-all group">
                     <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">{s.subject}</span>
                     <div className="flex items-center gap-4">
                        <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                           <div className="h-full bg-brand-500 transition-all duration-1000 group-hover:bg-brand-400" style={{ width: `${s.avg}%` }} />
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getDifficultyColor(s.difficulty)}`}>
                           {s.difficulty}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Unified Leaderboard */}
      <div className="bg-surface-900 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 left-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Trophy size={200} />
         </div>
         <h3 className="text-xs font-black text-slate-100 mb-6 flex items-center gap-3 uppercase tracking-widest">
            <Trophy size={16} className="text-yellow-500" />
            Top 10% Leaders (Section-Ranked)
         </h3>
         <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left text-sm">
               <thead>
                  <tr className="text-slate-600 uppercase text-[9px] font-black tracking-widest border-b border-white/5">
                     <th className="pb-4 pl-4">Rank</th>
                     <th className="pb-4">Student Identity</th>
                     <th className="pb-4 text-center">Stream</th>
                     <th className="pb-4 text-center">Combined Score</th>
                     <th className="pb-4 text-right pr-4">Signature Strength</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                  {leaderboard.map((p, i) => (
                     <tr key={p.student_id} className="group hover:bg-brand-500/[0.03] transition-colors border-l-4 border-transparent hover:border-brand-500">
                        <td className="py-5 pl-4">
                           {i < 3 ? <Trophy size={16} className={i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : "text-amber-600"} /> : <span className="text-slate-700 font-black ml-1">{i + 1}</span>}
                        </td>
                        <td className="py-5 font-black text-slate-200">{p.student_id}</td>
                        <td className="py-5 text-center">
                           <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-widest">Section {p.section}</span>
                        </td>
                        <td className="py-5 text-center font-mono text-brand-400 font-black text-base">{Math.round(p.overall_score * 100)}%</td>
                        <td className="py-5 text-right pr-4">
                           <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20 uppercase tracking-tighter">{p.best_subject}</span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Global Heatmap Pillar */}
      <div className="bg-surface-900 border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-xs font-black text-slate-300 mb-8 flex items-center gap-3 uppercase tracking-widest">
            <LayoutDashboard size={16} className="text-brand-500" />
            Strategic Performance Heatmap (FULL GRID)
         </h3>
         <div className="overflow-x-auto border border-white/5 rounded-2xl shadow-inner scrollbar-hide">
            <div className="min-w-[1000px] max-h-[500px] overflow-y-auto custom-scrollbar">
               <table className="w-full text-[10px] border-collapse">
                  <thead className="sticky top-0 bg-surface-950 z-20">
                     <tr>
                        <th className="p-4 text-left border-b border-white/5 text-slate-600 uppercase font-black tracking-widest bg-surface-900">IDENTIFIER</th>
                        {data.subjects.map(s => (
                           <th key={s.subject} className="p-4 text-center border-b border-white/5 text-slate-600 uppercase font-black tracking-widest w-36 bg-surface-900">{s.subject}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {data.students.map(st => (
                        <tr key={st.student_id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                           <td className="p-4 font-black text-slate-400 bg-surface-900/40 sticky left-0 z-10 border-r border-white/5">{st.student_id}</td>
                           {data.subjects.map(s => {
                              const scoreObj = st.subject_scores.find(sub => sub.subject === s.subject)
                              const score = scoreObj ? scoreObj.combined_score : 0
                              const colorIdx = score < 0.5 ? "bg-red-500/30 text-red-300 border-red-500/20" : score < 0.75 ? "bg-yellow-500/30 text-yellow-300 border-yellow-500/20" : "bg-emerald-500/30 text-emerald-300 border-emerald-500/20"
                              return (
                                 <td key={s.subject} className="p-1 px-2">
                                    <div className={`w-full h-8 flex items-center justify-center rounded-lg border text-[10px] font-black tracking-tighter ${colorIdx}`}>
                                       {Math.round(score * 100)}%
                                    </div>
                                 </td>
                              )
                           })}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  )
}
