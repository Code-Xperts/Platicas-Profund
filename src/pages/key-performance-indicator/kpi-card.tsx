// import { cn } from "@fullcalendar/core/internal-common"
import { cn } from "@/utils/kpi-cn"
import { Calendar, Users, Zap, DollarSign, type LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  change?: string
  description?: string
  icon: "Calendar" | "Users" | "Zap" | "DollarSign"
  changeType?: "positive" | "negative"
}

const iconMap: Record<string, LucideIcon> = {
  Calendar: Calendar,
  Users: Users,
  Zap: Zap,
  DollarSign: DollarSign,
}

export function KpiCard({ title, value, change, description, icon, changeType }: KpiCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {IconComponent && <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={cn(
              "text-xs",
              changeType === "positive" && "text-green-500",
              changeType === "negative" && "text-red-500",
              !changeType && "text-gray-500 dark:text-gray-400",
            )}
          >
            {change}
          </p>
        )}
        {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
    </div>
  )
}
