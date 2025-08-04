"use client"

import Button from "@/components/Base/Button"
import { DashboardData, mockDashboardData } from "@/utils/mock-kpi-data"
import type React from "react"
import { useState } from "react"
import { KpiCard } from "./kpi-card"
import { ActiveUsersBreakdownCard } from "./active-user-brealdown-card"
import { TokenUsageAnalyticsCard } from "./token-usage-analytics"
import { RevenueTargetCard } from "./revenue-target"
import { SubscriptionTypeBreakdownCard } from "./subscription-breakdown"
import { SessionActivityTrendsCard } from "./session-activity"
import { InsightCard } from "./insight-card"
import { cn } from "@/utils/kpi-cn"
// import { cn } from "@fullcalendar/core/internal-common"


type TimePeriod = "this-month" | "last-month" | "last-7-days"

const periodLabels: Record<TimePeriod, string> = {
  "this-month": "This Month",
  "last-month": "Last Month",
  "last-7-days": "Last 7 Days",
}

export default function KPIDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("this-month")
  const data: DashboardData = mockDashboardData[selectedPeriod]

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      <header className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">KPI Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Key performance indicators and business metrics</p>
        </div>
        {/* Replaced DropdownMenu with a segmented button group */}
        <div className="flex rounded-md shadow-sm bg-white dark:bg-gray-800">
          {Object.entries(periodLabels).map(([key, label]) => (
            <Button
              key={key}
            //   variant="ghost"
              onClick={() => setSelectedPeriod(key as TimePeriod)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md",
                selectedPeriod === key
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </header>

      <main className="grid gap-6 md:gap-8">
        {/* Top Row KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <KpiCard
            title="Sessions This Month"
            value={data.kpis.sessions.value}
            change={data.kpis.sessions.change}
            icon="Calendar"
            changeType={data.kpis.sessions.changeType}
          />
          <KpiCard
            title="Active Users"
            value={data.kpis.activeUsers.value}
            change={data.kpis.activeUsers.change}
            icon="Users"
            changeType={data.kpis.activeUsers.changeType}
          />
          <KpiCard
            title="Token Utilization"
            value={data.kpis.tokenUtilization.value}
            description={data.kpis.tokenUtilization.description}
            icon="Zap"
          />
          <KpiCard
            title="Monthly Revenue"
            value={data.kpis.monthlyRevenue.value}
            change={data.kpis.monthlyRevenue.change}
            icon="DollarSign"
            changeType={data.kpis.monthlyRevenue.changeType}
          />
        </div>

        {/* Middle Row Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ActiveUsersBreakdownCard
            clients={data.activeUsersBreakdown.clients}
            counselors={data.activeUsersBreakdown.counselors}
            newThisPeriod={data.activeUsersBreakdown.newThisPeriod}
          />
          <TokenUsageAnalyticsCard
            totalUsage={data.tokenUsageAnalytics.totalUsage}
            utilizationRate={data.tokenUsageAnalytics.utilizationRate}
            transcription={data.tokenUsageAnalytics.transcription}
            analysis={data.tokenUsageAnalytics.analysis}
            avgPerSession={data.tokenUsageAnalytics.avgPerSession}
          />
          {/* <RevenueTargetCard currentRevenue={data.revenueTarget.current} targetRevenue={data.revenueTarget.target} /> */}
        </div>

        {/* Bottom Row Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <SubscriptionTypeBreakdownCard
            basic={data.subscriptionBreakdown.basic}
            premium={data.subscriptionBreakdown.premium}
            professional={data.subscriptionBreakdown.professional}
          />
          <SessionActivityTrendsCard sessionData={data.sessionActivityTrends} />
        </div>

        {/* Quick Insights */}
        <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-900">
          <div className="mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChartIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              Quick Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InsightCard
              title="Growth Opportunity"
              description="Session growth is 7.9% above target. Consider increasing counselor capacity."
              icon="TrendingUp"
            />
            <InsightCard
              title="Token Optimization"
              description="Token utilization at 73.9%. Monitor usage patterns for optimization."
              icon="Zap"
            />
            <InsightCard
              title="Revenue Target"
              description="90.8% of monthly target achieved. On track for goal completion."
              icon="Target"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  )
}
