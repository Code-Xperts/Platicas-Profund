// import { Progress } from "@/components/ui/progress"
import Progress from "@/components/Base/Progress"
import { Users } from "lucide-react"

interface ActiveUsersBreakdownCardProps {
  clients: number
  counselors: number
  newThisPeriod: number
}

export function ActiveUsersBreakdownCard({ clients, counselors, newThisPeriod }: ActiveUsersBreakdownCardProps) {
  const totalUsers = clients + counselors
  const clientPercentage = (clients / totalUsers) * 100
  const counselorPercentage = (counselors / totalUsers) * 100

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          Active Users Breakdown
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">User distribution by role</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Clients
            </div>
            <span>{clients.toLocaleString()}</span>
          </div>
          <progress
            value={clientPercentage}
            className="h-2 [&::-webkit-progress-bar]:bg-blue-500 [&::-webkit-progress-value]:bg-blue-500"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Counselors
            </div>
            <span>{counselors.toLocaleString()}</span>
          </div>
          <progress
            value={counselorPercentage}
            className="h-2 [&::-webkit-progress-bar]:bg-green-500 [&::-webkit-progress-value]:bg-green-500"
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          New this period <span className="text-green-500">+{newThisPeriod.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
