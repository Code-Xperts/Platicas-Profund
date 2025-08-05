import { Zap } from "lucide-react"

interface TokenUsageAnalyticsCardProps {
  totalUsage: string
  utilizationRate: string
  transcription: number
  analysis: number
  avgPerSession: number
}

export function TokenUsageAnalyticsCard({
  totalUsage,
  utilizationRate,
  transcription,
  analysis,
  avgPerSession,
}: TokenUsageAnalyticsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          Token Usage Analytics
        </h2>
        {/* <p className="text-sm text-gray-500 dark:text-gray-400">AI resource consumption</p> */}
      </div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between text-sm">
          <span>Total Usage</span>
          <span className="font-medium">{totalUsage}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>{utilizationRate} utilization rate</span>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Transcription</span>
            <span className="font-medium">{transcription.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Analysis</span>
            <span className="font-medium">{analysis.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Avg per session</span>
            <span className="font-medium">{avgPerSession.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
