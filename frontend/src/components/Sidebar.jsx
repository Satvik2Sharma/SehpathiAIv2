import { motion } from "framer-motion"
import { Upload, User, LayoutDashboard, MessageSquare, Globe, ChevronRight } from "lucide-react"

const NAV = [
  { id: "upload",  label: "Upload / Analyze",  icon: Upload },
  { id: "student", label: "Student Dashboard", icon: User },
  { id: "teacher", label: "Teacher Analytics", icon: LayoutDashboard },
  { id: "chat",    label: "AI Chat Assistant", icon: MessageSquare },
]

export function Sidebar({ active, onNav, hasData }) {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-[#05070a] border-r border-white/[0.05] h-screen sticky top-0 z-30 shadow-2xl">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-white/[0.03] space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <img 
              src="/logo.png" 
              alt="Sehpathi AI" 
              className="relative w-10 h-10 rounded-xl object-cover border border-white/10"
            />
          </div>
          <div>
            <div className="text-sm font-black text-white tracking-widest uppercase">Sehpathi</div>
            <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">Diagnostic Core</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV.map(({ id, label, icon: Icon }) => {
          const disabled = !hasData && id !== "upload"
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => !disabled && onNav(id)}
              disabled={disabled}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 relative group
                ${isActive
                  ? "bg-indigo-500/10 text-white border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                  : disabled
                    ? "text-slate-700 cursor-not-allowed opacity-30"
                    : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200 border border-transparent hover:border-white/5"}
              `}
            >
              <div className={`p-1.5 rounded-lg ${isActive ? "bg-indigo-500 text-white" : "bg-white/5 text-slate-500 group-hover:text-slate-300"}`}>
                <Icon size={14} />
              </div>
              <span className="flex-1 text-left">{label}</span>
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-indicator"
                  className="absolute right-4 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Personal Branding Footer */}
      <div className="mx-4 mb-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 p-5 space-y-3 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="flex flex-col gap-1 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <User size={12} className="text-indigo-400" />
            </div>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Satvik Sharma</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">
            AI Systems • Full-Stack • Analytics Engineering
          </p>
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">© 2026 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
