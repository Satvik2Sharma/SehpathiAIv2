import { useEffect, useState, useRef } from "react"
import { Terminal } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

const THINKING_STEPS = [
  { delay: 0,    msg: "⬡ Initializing Sehpathi AI engine..." },
  { delay: 400,  msg: "⬡ Parsing student response data..." },
  { delay: 900,  msg: "⬡ Running Semantic Similarity Engine (TF-IDF)..." },
  { delay: 1500, msg: "⬡ Applying brevity penalty checks..." },
  { delay: 2100, msg: "⬡ Computing weighted Grip Scores per question..." },
  { delay: 2700, msg: "⬡ Aggregating topic-level scores..." },
  { delay: 3200, msg: "⬡ Calculating confidence metrics..." },
  { delay: 3700, msg: "⬡ Tagging priorities (High / Medium / Low)..." },
  { delay: 4200, msg: "⬡ Generating explainability reasons..." },
  { delay: 4700, msg: "⬡ Building actionable suggestions..." },
  { delay: 5200, msg: "✔ Analysis complete. Results ready." },
]

export function ThinkingLog({ active, onComplete }) {
  const [lines, setLines] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!active) { setLines([]); return }

    const timers = THINKING_STEPS.map(({ delay, msg }) =>
      setTimeout(() => {
        setLines(prev => [...prev, msg])
        if (msg.startsWith("✔") && onComplete) {
          setTimeout(onComplete, 500)
        }
      }, delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [active])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  if (!active && lines.length === 0) return null

  return (
    <Card className="animate-slide-up border-emerald-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <Terminal size={15} />
          AI Processing Console
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-black/40 rounded-xl p-4 h-48 overflow-y-auto font-mono text-xs space-y-1.5">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`thinking-line animate-fade-in ${line.startsWith("✔") ? "text-emerald-300 font-semibold" : "text-emerald-500"}`}
            >
              {line}
            </div>
          ))}
          {active && lines.length < THINKING_STEPS.length && (
            <div className="thinking-line animate-pulse">▋</div>
          )}
          <div ref={bottomRef} />
        </div>
      </CardContent>
    </Card>
  )
}
