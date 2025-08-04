import Progress from "@/components/Base/Progress"
import { Target } from "lucide-react"

interface RevenueTargetCardProps {
  currentRevenue: number
  targetRevenue: number
}

export function RevenueTargetCard({ currentRevenue, targetRevenue }: RevenueTargetCardProps) {
  const remainingRevenue = targetRevenue - currentRevenue
  const progressPercentage = (currentRevenue / targetRevenue) * 100

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          Revenue Target
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly revenue progress</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Current</span>
            <span className="font-medium">${currentRevenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Target</span>
            <span className="font-medium">${targetRevenue.toLocaleString()}</span>
          </div>
        </div>
        <Progress className="h-2">
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: "#3b82f6",
              borderRadius: "inherit",
              transition: "width 0.3s",
            }}
          />
        </Progress>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{progressPercentage.toFixed(1)}% of monthly target</span>
          <span>Remaining</span>
          <span className="font-medium">${remainingRevenue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
