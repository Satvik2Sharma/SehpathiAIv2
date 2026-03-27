import { AlertCircle, TrendingDown, TrendingUp, Lightbulb, Target, Flame } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"

function TopicRow({ topic, showReason = true }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 group">
      <div className="mt-0.5 flex-shrink-0">
        {topic.priority === "High" && <TrendingDown size={15} className="text-red-400" />}
        {topic.priority === "Medium" && <Flame size={15} className="text-amber-400" />}
        {topic.priority === "Low" && <TrendingUp size={15} className="text-emerald-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-sm font-medium text-slate-100">{topic.topic}</span>
          <Badge priority={topic.priority} reason={topic.reason} />
        </div>
        <div className="flex gap-4 mt-1.5 text-xs text-slate-400">
          <span>Grip: <span className="text-slate-200 font-medium">{Math.round(topic.grip_score * 100)}%</span></span>
          <span>Confidence: <span className="text-slate-200 font-medium">{Math.round(topic.confidence * 100)}%</span></span>
        </div>
        {showReason && topic.reason && (
          <p className="mt-1 text-xs text-slate-500 italic line-clamp-2">{topic.reason}</p>
        )}
      </div>
    </div>
  )
}

export function InsightsPanel({ data }) {
  const allTopics = [
    ...(data.weak_topics || []),
    ...(data.moderate_topics || []),
    ...(data.strong_topics || []),
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Weak Topics */}
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertCircle size={15} />
            Weak Topics — Needs Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.weak_topics?.length ? (
            data.weak_topics.map((t, i) => <TopicRow key={i} topic={t} />)
          ) : (
            <p className="text-sm text-slate-500 italic">No weak topics detected 🎉</p>
          )}
        </CardContent>
      </Card>

      {/* Moderate Topics */}
      <Card className="border-amber-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-400">
            <Target size={15} />
            Moderate Topics — Push to Mastery
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.moderate_topics?.length ? (
            data.moderate_topics.map((t, i) => <TopicRow key={i} topic={t} />)
          ) : (
            <p className="text-sm text-slate-500 italic">No moderate topics.</p>
          )}
        </CardContent>
      </Card>

      {/* All topics overview */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={15} className="text-brand-400" />
            Full Topic Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {allTopics.map((t, i) => <TopicRow key={i} topic={t} />)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
