import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell 
} from "recharts"
import { Target, AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react"

export function PerformanceAnalytics({ student }) {
  const [chartView, setChartView] = useState("radar")

  const chartData = useMemo(() => {
    if (!student) return []
    return student.subject_scores.map(s => ({
      subject: s.subject,
      score: Math.round(s.combined_score * 100),
      marks: Math.round(s.marks_raw * 100),
      grip: Math.round(s.grip_score * 100),
      isWeak: s.combined_score < 0.5
    }))
  }, [student])

  if (!student) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Chart Section */}
      <div className="lg:col-span-7 bg-[#0a0c12] border border-white/[0.05] rounded-[2.5rem] p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
            <Target size={16} className="text-indigo-500" /> Performance Spectrum
          </h3>
          <div className="flex bg-white/5 p-1 rounded-xl">
            {['radar', 'bar'].map(v => (
              <button
                key={v}
                onClick={() => setChartView(v)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${chartView === v ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AnimatePresence mode="wait">
              {chartView === 'radar' ? (
                <RadarChart key="radar" cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Accuracy"
                    dataKey="score"
                    stroke="#818cf8"
                    fill="#818cf8"
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#818cf8', fontSize: '12px', fontWeight: 'bold' }}
                  />
                </RadarChart>
              ) : (
                <BarChart key="bar" data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                  <Bar dataKey="score" radius={[8, 8, 2, 2]} barSize={40}>
                    {chartData.map((e, i) => (
                      <Cell key={i} fill={e.score < 50 ? "#f87171" : e.score < 75 ? "#fbbf24" : "#34d399"} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </AnimatePresence>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#0a0c12] border border-white/[0.05] rounded-3xl p-6 border-red-500/10">
          <h4 className="text-xs font-black text-red-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <AlertTriangle size={14} /> Weak Subjects & Why
          </h4>
          <div className="space-y-3">
            {chartData.filter(s => s.isWeak).length > 0 ? (
              chartData.filter(s => s.isWeak).map((s, i) => {
                const concepts = student.weak_concepts.filter(c => c.toLowerCase().includes(s.subject.toLowerCase()))
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-white uppercase">{s.subject}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-red-400">{s.score}%</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Accuracy</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                    "{concepts.length > 0 ? `Priority Focus: ${concepts.map(c => c.split(': ')[1] || c).join(', ')}` : 'Consider fundamental review.'}"
                    </p>
                  </motion.div>
                )
              })
            ) : (
              <div className="py-8 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                <CheckCircle size={24} className="mx-auto text-emerald-500 mb-2 opacity-30" />
                <p className="text-xs text-slate-500 italic uppercase tracking-widest">No Critical Weaknesses</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#0a0c12] border border-white/[0.05] rounded-3xl p-6 border-indigo-500/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={14} /> Knowledge Retention
            </h4>
            <span className="text-sm font-black text-white">{Math.round(student.confidence_indicator * 100)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${student.confidence_indicator * 100}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-right">Confidence Score</p>
        </div>
      </div>
    </div>
  )
}
