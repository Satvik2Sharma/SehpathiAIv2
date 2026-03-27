import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = ({ className, sideOffset = 6, children, ...props }) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-xs rounded-xl border border-white/10 bg-surface-800 px-3 py-2 text-xs text-slate-200 shadow-xl animate-fade-in",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-surface-800" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
)

export function Tooltip({ content, children }) {
  return (
    <TooltipProvider delayDuration={150}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}
