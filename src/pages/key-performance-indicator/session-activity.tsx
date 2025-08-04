import { SessionTrendItem } from "@/utils/mock-kpi-data"
import { LineChart } from "lucide-react"

interface SessionActivityTrendsCardProps {
  sessionData: SessionTrendItem[]
}

export function SessionActivityTrendsCard({ sessionData }: SessionActivityTrendsCardProps) {
  const maxCount = Math.max(...sessionData.map((d) => d.count))
  const averageDaily = sessionData.reduce((sum, d) => sum + d.count, 0) / sessionData.length

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <LineChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          Session Activity Trends
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Daily session counts (last 7 days)</p>
      </div>
      <div className="grid gap-4">
        {sessionData.map((data, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span>{data.date}</span>
            <div className="flex items-center gap-2">
              <div
                className="h-2 bg-gray-900 dark:bg-gray-50 rounded-full"
                style={{ width: `${(data.count / maxCount) * 100}%`, minWidth: "10px" }}
              />
              <span className="font-medium">{data.count}</span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between text-sm font-medium pt-2 border-t border-gray-200 dark:border-gray-800">
          <span>Average daily</span>
          <span>{averageDaily.toFixed(0)}</span>
        </div>
      </div>
    </div>
  )
}
