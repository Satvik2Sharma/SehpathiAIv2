import { useState, useRef, useEffect } from "react"
import { Send, User, Bot, Sparkles, Trophy, BarChart2, List, Zap } from "lucide-react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000"

export function AIChatAssistant({ data }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: {
        answer: "Hello! I am Sehpathi AI, your unified diagnostic assistant. I can help you analyze combined scores (Marks + NLP), identify section leaders, or compare subject difficulty. Try asking: 'Which subject is hardest overall?'",
        visualization_type: "none"
      }
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef()

  const demoQueries = [
    "Which subject is weakest overall?",
    "Show top students in Section A",
    "Compare Section A vs B performance",
    "Which subject is hardest in Section C?",
    "Show best performers overall"
  ]

  const handleSend = async (query = input) => {
    if (!query.trim()) return
    const userMsg = { role: "user", content: { answer: query } }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      })
      const result = await res.json()
      setMessages(prev => [...prev, { role: "bot", content: result }])
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", content: { answer: "Sync failure. Please ensure both datasets are active." } }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
     scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-[75vh] bg-surface-900/60 border border-white/5 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in backdrop-blur-xl max-w-4xl mx-auto group">
       {/* Chat Hub Header */}
       <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-brand-500/20 rounded-2xl text-brand-400 border border-brand-500/20 shadow-lg shadow-brand-500/10">
                <Bot size={24} />
             </div>
             <div>
                <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest">Unified AI Diagnostic Assistant</h3>
                <p className="text-[10px] text-slate-500 flex items-center gap-2 mt-1 font-mono uppercase tracking-tighter">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Multi-Stream Correlation Engine Active
                </p>
             </div>
          </div>
       </div>

       {/* Conversation Flow */}
       <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scrollbar-hide">
          {messages.map((m, i) => (
             <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
                <div className={`max-w-[85%] flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                   <div className={`mt-1 p-2 rounded-xl flex-shrink-0 bg-white/5 border border-white/5 ${m.role === "user" ? "text-brand-400" : "text-emerald-400"}`}>
                      {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                   </div>
                   <div className={`p-5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-brand-600 text-white shadow-2xl shadow-brand-600/30 font-medium" : "bg-white/[0.03] border border-white/5 text-slate-200"}`}>
                      <p>{m.content.answer}</p>
                      
                      {/* Interactive Insight Widgets */}
                      {m.content.visualization_type === "leaderboard" && m.content.data && (
                        <div className="mt-6 bg-black/40 rounded-2xl p-4 space-y-3 border border-white/10 shadow-inner">
                           <div className="text-[10px] font-black text-yellow-500 uppercase flex items-center gap-2 mb-2 tracking-widest"><Trophy size={12}/> Section Pro-Stream Leaders</div>
                           {m.content.data.map((p, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs px-4 py-2 bg-white/5 rounded-xl border border-white/5 group hover:border-brand-500/30 transition-all">
                                 <span className="text-slate-400 font-bold uppercase tracking-tighter">Rank {idx+1}: <span className="text-slate-100">{p.student_id}</span></span>
                                 <span className="text-brand-400 font-black font-mono">{Math.round(p.overall_score * 100)}%</span>
                              </div>
                           ))}
                        </div>
                      )}

                      {m.content.visualization_type === "bar" && m.content.data && (
                         <div className="mt-6 bg-black/40 rounded-2xl p-4 space-y-4 border border-white/10 shadow-inner">
                            <div className="text-[10px] font-black text-brand-400 uppercase flex items-center gap-2 mb-2 tracking-widest"><BarChart2 size={12}/> Strategic Multi-Stream Comparison</div>
                            {m.content.data.map((item, idx) => (
                               <div key={idx} className="space-y-2 group">
                                  <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-tighter">
                                     <span>{item.subject || item.name}</span>
                                     <span className="text-brand-400 font-mono font-black">{Math.round((item.avg_score || item.avg) * 100)}%</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                     <div className="h-full bg-brand-500 transition-all duration-1000 group-hover:bg-brand-400" style={{ width: `${Math.round((item.avg_score || item.avg) * 100)}%` }} />
                                  </div>
                               </div>
                            ))}
                         </div>
                      )}
                   </div>
                </div>
             </div>
          ))}
          {loading && (
             <div className="flex justify-start animate-pulse">
                 <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                 </div>
             </div>
          )}
          <div ref={scrollRef} />
       </div>

       {/* Strategic Query Suggestion Chips */}
       <div className="px-6 py-3 border-t border-white/5 bg-black/20 flex flex-wrap gap-2">
          {demoQueries.map(q => (
             <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="px-4 py-1.5 bg-white/5 hover:bg-brand-500/10 hover:border-brand-500/30 border border-white/5 rounded-full text-[10px] font-bold text-slate-500 hover:text-brand-400 transition-all uppercase tracking-tighter"
             >
                {q}
             </button>
          ))}
       </div>

       {/* Interactive Diagnostic Input */}
       <div className="p-6 bg-surface-900 border-t border-white/5">
          <div className="relative group">
             <input
                type="text"
                placeholder="Query section leaders, subject difficulty, or student lists..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-xs font-medium focus:outline-none focus:border-brand-500/50 transition-all pr-16 text-slate-100 placeholder:text-slate-600 shadow-inner group-hover:bg-white/[0.05]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
             />
             <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="absolute right-2.5 top-2.5 p-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl transition-all shadow-xl shadow-brand-600/30 disabled:opacity-50 disabled:grayscale active:scale-90"
             >
                <Send size={16} />
             </button>
          </div>
       </div>
    </div>
  )
}
