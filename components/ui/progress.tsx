import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  max: number
  label?: string
  color?: "blue" | "green" | "purple" | "orange" | "pink"
  showValue?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Progress({
  value,
  max,
  label,
  color = "blue",
  showValue = false,
  size = "md",
  className,
}: ProgressProps) {
  const percentage = Math.round((value / max) * 100)

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
  }

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  }

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1 flex justify-between text-xs text-gray-400">
          <span>{label}</span>
          {showValue && (
            <span>
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full overflow-hidden rounded-full bg-gray-800", sizeClasses[size])}>
        <div
          className={cn("transition-all", colorClasses[color], sizeClasses[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
