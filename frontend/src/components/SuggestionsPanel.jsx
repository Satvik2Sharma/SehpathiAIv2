import { Lightbulb, ChevronRight, BookOpen, Pencil, Brain } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

const iconSet = [BookOpen, Pencil, Brain]

export function SuggestionsPanel({ suggestions = [] }) {
  const top3 = suggestions.slice(0, 3)

  return (
    <Card className="border-brand-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-brand-400">
          <Lightbulb size={15} />
          AI-Powered Action Plan — Top Priority Steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {top3.map((s, i) => {
            const Icon = iconSet[i % iconSet.length]
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-brand-600/10 border border-brand-500/20 px-4 py-3 transition-colors hover:bg-brand-600/15"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="p-1.5 rounded-lg bg-brand-600/20 mt-0.5 flex-shrink-0">
                  <Icon size={13} className="text-brand-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-400 bg-brand-600/20 px-2 py-0.5 rounded-full">
                      Action {i + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-200">{s}</p>
                </div>
                <ChevronRight size={14} className="text-slate-500 mt-1 flex-shrink-0" />
              </div>
            )
          })}
        </div>

        {suggestions.length === 0 && (
          <p className="text-sm text-slate-500 italic text-center py-4">
            No suggestions. The student is performing well! 🎉
          </p>
        )}

        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="flex items-start gap-2">
            <Lightbulb size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-500">
              <span className="text-amber-400 font-medium">SDG 4 Aligned:</span>{" "}
              These suggestions support personalized learning (SDG 4.1) and empower educators with data-driven insights (SDG 4.c).
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
