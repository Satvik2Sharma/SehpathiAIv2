import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

function getBarColor(value) {
  if (value >= 0.75) return "#10b981"
  if (value >= 0.50) return "#f59e0b"
  return "#ef4444"
}

// Format all topics into chart-friendly arrays
function buildTopicData(data) {
  const all = [
    ...(data.weak_topics || []),
    ...(data.moderate_topics || []),
    ...(data.strong_topics || []),
  ]
  return all.map(t => ({
    topic: t.topic,
    grip: Math.round(t.grip_score * 100),
    confidence: Math.round(t.confidence * 100),
  }))
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card !p-3 text-xs">
      <p className="font-semibold text-slate-100 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="capitalize">
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  )
}

export function Charts({ data }) {
  const topics = buildTopicData(data)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Topic Strengths — Radar View</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={topics} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis
                dataKey="topic"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#64748b", fontSize: 9 }}
                tickCount={4}
              />
              <Radar
                name="Grip Score"
                dataKey="grip"
                stroke="#6170f4"
                fill="#6170f4"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Radar
                name="Confidence"
                dataKey="confidence"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <RechartsTooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brand-500 inline-block rounded" /> Grip Score</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /> Confidence</span>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Topic-wise Accuracy (Grip Score)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topics} barSize={28} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="topic" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar dataKey="grip" name="Grip Score" radius={[6, 6, 0, 0]}>
                {topics.map((entry, idx) => (
                  <Cell key={idx} fill={getBarColor(entry.grip / 100)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-emerald-500 inline-block rounded" /> Strong ≥75%</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-amber-500 inline-block rounded" /> Moderate</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-red-500 inline-block rounded" /> Weak &lt;50%</span>
          </div>
        </CardContent>
      </Card>

      {/* Performance Heatmap */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Performance Intensity Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {topics.map((t, i) => {
              const pct = t.grip
              const bg =
                pct >= 75 ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" :
                pct >= 50 ? "bg-amber-500/20 border-amber-500/30 text-amber-300" :
                            "bg-red-500/20 border-red-500/30 text-red-300"

              return (
                <div
                  key={i}
                  className={`border rounded-xl p-4 flex flex-col items-center gap-1 transition-transform hover:scale-105 ${bg}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-2xl font-bold tabular-nums">{pct}%</span>
                  <span className="text-xs font-medium text-center opacity-80">{t.topic}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
