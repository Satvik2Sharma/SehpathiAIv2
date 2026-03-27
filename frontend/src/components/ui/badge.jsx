import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip"

const priorityConfig = {
  High:   { className: "badge-high",   label: "High Priority" },
  Medium: { className: "badge-medium", label: "Medium Priority" },
  Low:    { className: "badge-low",    label: "Low Priority" },
}

export function Badge({ priority, reason }) {
  const config = priorityConfig[priority] || priorityConfig.Low

  const badge = (
    <span className={cn("cursor-help", config.className)}>
      {config.label}
    </span>
  )

  if (reason) {
    return <Tooltip content={reason}>{badge}</Tooltip>
  }
  return badge
}
