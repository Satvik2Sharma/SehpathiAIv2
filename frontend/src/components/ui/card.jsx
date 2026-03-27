import { cn } from "@/lib/utils"

export function Card({ className, children, ...props }) {
  return (
    <div className={cn("glass-card p-5", className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children }) {
  return <div className={cn("mb-4", className)}>{children}</div>
}

export function CardTitle({ className, children }) {
  return (
    <h3 className={cn("text-base font-semibold text-slate-100 tracking-tight", className)}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children }) {
  return <div className={cn("", className)}>{children}</div>
}
