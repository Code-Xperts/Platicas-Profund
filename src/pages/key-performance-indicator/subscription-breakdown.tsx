import Progress from "@/components/Base/Progress";
import { Package } from "lucide-react"

interface SubscriptionTypeBreakdownCardProps {
  basic: { users: number; revenue: number }
  premium: { users: number; revenue: number }
  professional: { users: number; revenue: number }
}

export function SubscriptionTypeBreakdownCard({ basic, premium, professional }: SubscriptionTypeBreakdownCardProps) {
  const totalUsers = basic.users + premium.users + professional.users

  const basicPercentage = (basic.users / totalUsers) * 100
  const premiumPercentage = (premium.users / totalUsers) * 100
  const professionalPercentage = (professional.users / totalUsers) * 100

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-900">
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          Subscription Type Breakdown
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Distribution of subscription plans</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-900 rounded-full dark:bg-gray-50" />
              Basic, {basic.users.toLocaleString()} users
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">${basic.revenue.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400">{basicPercentage.toFixed(1)}%</span>
            </div>
          </div>
          <progress
            value={basicPercentage}
            className="h-2 [&::-webkit-progress-bar]:bg-gray-900 [&::-webkit-progress-value]:bg-gray-900 dark:[&::-webkit-progress-bar]:bg-gray-50 dark:[&::-webkit-progress-value]:bg-gray-50"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-700 rounded-full dark:bg-gray-300" />
              Premium, {premium.users.toLocaleString()} users
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">${premium.revenue.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400">{premiumPercentage.toFixed(1)}%</span>
            </div>
          </div>
          <progress
            value={premiumPercentage}
            className="h-2 [&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:bg-gray-700 dark:[&::-webkit-progress-bar]:bg-gray-300 dark:[&::-webkit-progress-value]:bg-gray-300"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full dark:bg-gray-500" />
              Professional, {professional.users.toLocaleString()} users
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">${professional.revenue.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400">{professionalPercentage.toFixed(1)}%</span>
            </div>
          </div>
          <progress
            value={professionalPercentage}
            className="h-2 [&::-webkit-progress-bar]:bg-gray-500 [&::-webkit-progress-value]:bg-gray-500 dark:[&::-webkit-progress-bar]:bg-gray-500 dark:[&::-webkit-progress-value]:bg-gray-500"
          />
        </div>
      </div>
    </div>
  )
}
