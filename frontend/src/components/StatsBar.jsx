import { Clock, Award, TrendingDown, BarChart2 } from "lucide-react"
import { AnimatedCounter } from "./AnimatedCounter"
import { Card } from "./ui/card"

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-100 leading-tight">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </Card>
  )
}

export function StatsBar({ data, rowCount = 0 }) {
  const allTopics = [
    ...(data.weak_topics || []),
    ...(data.moderate_topics || []),
    ...(data.strong_topics || []),
  ]
  const weakCount = (data.weak_topics || []).length
  const strongCount = (data.strong_topics || []).length
  // Estimate: 4.5 min per question manually evaluated; we save 70%
  const minutesSaved = Math.round(rowCount * 4.5 * 0.7)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={BarChart2}
        label="Overall Grip Score"
        value={<AnimatedCounter target={Math.round(data.overall_score * 100)} suffix="%" />}
        sub="Across all topics"
        color="bg-brand-600/20 text-brand-400"
      />
      <StatCard
        icon={TrendingDown}
        label="Weak Topics"
        value={weakCount}
        sub={weakCount > 0 ? "Require immediate attention" : "Looking great!"}
        color="bg-red-500/15 text-red-400"
      />
      <StatCard
        icon={Award}
        label="Strong Topics"
        value={strongCount}
        sub="Well mastered"
        color="bg-emerald-500/15 text-emerald-400"
      />
      <StatCard
        icon={Clock}
        label="Est. Teacher Time Saved"
        value={<><AnimatedCounter target={minutesSaved} /> min</>}
        sub="~70% evaluation cost cut"
        color="bg-amber-500/15 text-amber-400"
      />
    </div>
  )
}
