import { StatCardProps } from "@/utils/type"
import { Users } from "lucide-react"

export function PlanSummaryCard({ tag, monthlyPrice, monthlyTokenCount, rolloverStatus, users }: StatCardProps) {
  return (
    <div className="flex-1 min-w-[280px] max-w-[32%] dark:bg-[#1b253b] p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center rounded-md box px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10">
            {tag}
          </span>
          <div className="flex items-center text-sm ">
            <Users className="w-4 h-4 mr-1" /> {users} users
          </div>
        </div>
        <p className="text-2xl font-bold ">${monthlyPrice}/mo</p>
        <p className="mt-1 text-sm ">{monthlyTokenCount} tokens</p>
        <p className="text-sm ">Rollover: {rolloverStatus}</p>
      </div>
    </div>
  )
}
