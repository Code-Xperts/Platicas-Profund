import { TrendingUp, Zap, Target, type LucideIcon } from "lucide-react"

interface InsightCardProps {
  title: string
  description: string
  icon: "TrendingUp" | "Zap" | "Target"
}

const iconMap: Record<string, LucideIcon> = {
  TrendingUp: TrendingUp,
  Zap: Zap,
  Target: Target,
}

export function InsightCard({ title, description, icon }: InsightCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="flex flex-col items-start gap-2">
        {IconComponent && <IconComponent className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}
