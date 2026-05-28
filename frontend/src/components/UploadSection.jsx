import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export function UploadSection({ onAnalysisStart, onAnalysisDone }) {
  const [ansFile, setAnsFile] = useState(null)
  const [marksFile, setMarksFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalysis = async () => {
    if (!ansFile || !marksFile) {
      setError("Please upload both Answers and Marks datasets.")
      return
    }

    setLoading(true)
    setError(null)
    onAnalysisStart()

    try {
      const formData = new FormData()
      formData.append("answers_file", ansFile)
      formData.append("marks_file", marksFile)

      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.detail || "Analysis failed. Please check CSV schema.")
      }

      const data = await response.json()
      onAnalysisDone(data)
    } catch (err) {
      setError(err.message)
      onAnalysisDone(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* NLP Dataset Upload */}
      <div className="bg-[#0a0c12] border border-white/[0.05] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group transition-all hover:border-indigo-500/20">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 -mr-4 -mt-4">
           <FileText size={120} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Sparkles size={20} className="text-indigo-400" />
             </div>
             <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">
                NLP Corpus (Answers)
             </h3>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight opacity-60">
            Schema: student_id, question, subject, student_answer, marks...
          </p>
          <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-indigo-500/40 transition-all bg-white/[0.01] hover:bg-indigo-500/[0.02]">
             <input 
               type="file" 
               accept=".csv"
               className="absolute inset-0 opacity-0 cursor-pointer" 
               onChange={(e) => setAnsFile(e.target.files[0])}
             />
             {ansFile ? (
               <div className="flex flex-col items-center gap-3 text-indigo-400">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-[10px] font-black truncate max-w-[200px] uppercase tracking-widest">{ansFile.name}</span>
               </div>
             ) : (
               <div className="flex flex-col items-center gap-3 text-slate-500">
                  <Upload size={32} strokeWidth={1} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Select Answers.csv</span>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Marks Dataset Upload */}
      <div className="bg-[#0a0c12] border border-white/[0.05] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group transition-all hover:border-emerald-500/20">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12 -mr-4 -mt-4">
           <FileText size={120} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 size={20} className="text-emerald-400" />
             </div>
             <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">
                Analytics Stream (Marks)
             </h3>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight opacity-60">
            Schema: student_id, section, Java, Python, OS, IKS...
          </p>
          <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-emerald-500/40 transition-all bg-white/[0.01] hover:bg-emerald-500/[0.02]">
             <input 
               type="file" 
               accept=".csv"
               className="absolute inset-0 opacity-0 cursor-pointer" 
               onChange={(e) => setMarksFile(e.target.files[0])}
             />
             {marksFile ? (
               <div className="flex flex-col items-center gap-3 text-emerald-400">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-[10px] font-black truncate max-w-[200px] uppercase tracking-widest">{marksFile.name}</span>
               </div>
             ) : (
               <div className="flex flex-col items-center gap-3 text-slate-500">
                  <Upload size={32} strokeWidth={1} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Select Marks.csv</span>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col items-center gap-6 pt-10">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest px-8 py-3 rounded-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleAnalysis}
            disabled={loading || !ansFile || !marksFile}
            className="relative group px-16 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.4em] transition-all disabled:opacity-30 disabled:grayscale shadow-2xl shadow-indigo-500/20 active:scale-95 text-[10px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            <span className="relative z-10">
              {loading ? "Crunching Dual Data Streams..." : "Integrate & Analyze"}
            </span>
          </button>
          
          <button
            onClick={() => {
              import("../data/demoData").then(m => onAnalysisDone(m.demoData))
            }}
            className="px-8 py-5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl font-black uppercase tracking-[0.4em] transition-all border border-white/5 active:scale-95 text-[10px]"
          >
            Run Demo (Synthetic V4)
          </button>
        </div>
      </div>

    </div>
  )
}
