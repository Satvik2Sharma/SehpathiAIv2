import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { UploadSection } from "./components/UploadSection"
import { ThinkingLog } from "./components/ThinkingLog"
import { StudentDashboard } from "./components/StudentDashboard"
import { TeacherDashboard } from "./components/TeacherDashboard"
import { AIChatAssistant } from "./components/AIChatAssistant"
import { User, LayoutDashboard, Database, MessageSquare } from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("upload")
  const [thinking, setThinking] = useState(false)
  const [data, setData] = useState(null)
  const [studentIdx, setStudentIdx] = useState(0)

  // Global analysis handler
  const handleAnalysisStart = () => {
    setThinking(true)
    setData(null)
  }

  const handleAnalysisDone = (resultData) => {
    if (resultData && resultData.students && resultData.students.length > 0) {
      setData(resultData)
      setStudentIdx(0)
    } else {
      setThinking(false)
    }
  }

  const handleThinkingComplete = () => {
    setThinking(false)
    if (data) {
      setActiveTab("student")
    }
  }

  return (
    <div className="flex min-h-screen bg-[#02040a] text-slate-200 selection:bg-indigo-500/30">
      <Sidebar 
        active={activeTab} 
        onNav={setActiveTab} 
        hasData={!!data} 
      />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden relative">
        {/* Ambient Glows */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
        </div>

        {/* Header */}
        <header className="h-16 border-b border-white/[0.05] bg-slate-950/40 backdrop-blur-xl flex items-center px-8 gap-6 sticky top-0 z-20 transition-all">
          <div className="flex-1 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
              <LayoutDashboard size={18} className="text-indigo-400" />
            </div>
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-white/90">
              Sehpaathi AI <span className="text-indigo-500/50">/</span> <span className="text-indigo-400">Intelligence v4.1</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <span className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/5">
                <Database size={12} className="animate-pulse" /> Modular Unified Engine
             </span>
             <div className="h-4 w-px bg-white/10 hidden sm:block" />
             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter opacity-60 hover:opacity-100 transition-opacity cursor-default">SDG 4 Education Standard</span>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 p-8 relative z-10 overflow-y-auto">
          {/* 1. UPLOAD VIEW */}
          {activeTab === "upload" && (
            <div className="space-y-6 animate-fade-in shadow-2xl">
              <UploadSection
                onAnalysisStart={handleAnalysisStart}
                onAnalysisDone={handleAnalysisDone}
              />
              {thinking && (
                <div className="animate-slide-up shadow-xl">
                  <ThinkingLog active={thinking} onComplete={handleThinkingComplete} />
                </div>
              )}
            </div>
          )}

          {/* 2. STUDENT DASHBOARD */}
          {activeTab === "student" && data && (
            <StudentDashboard 
              student={data.students[studentIdx]} 
              idx={studentIdx}
              total={data.students.length}
              onPrev={() => setStudentIdx(prev => Math.max(0, prev - 1))}
              onNext={() => setStudentIdx(prev => Math.min(data.students.length - 1, prev + 1))}
            />
          )}

          {/* 3. TEACHER ANALYTICS */}
          {activeTab === "teacher" && data && (
            <TeacherDashboard data={data} />
          )}

          {/* 4. AI CHAT ASSISTANT */}
          {activeTab === "chat" && data && (
            <AIChatAssistant data={data} />
          )}
        </main>

        {/* Status Bar */}
        <footer className="h-8 border-t border-white/5 bg-surface-900/40 px-6 flex items-center justify-between text-[10px] text-slate-600 font-mono tracking-tighter">
          <span>Sehpaathi AI · Unified Engine v4.0.0</span>
          <span className="flex items-center gap-3">
             <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse-slow"></span>
             AI Engine Active
          </span>
        </footer>
      </div>
    </div>
  )
}
