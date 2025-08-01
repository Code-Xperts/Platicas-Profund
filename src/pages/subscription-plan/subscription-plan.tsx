"use client"
import { useState } from "react"
import Button from "@/components/Base/Button"
import { Plan } from "@/utils/type"
import { plans } from "@/utils/data"
import { PlanSummaryCard } from "./plan-summary"
import { PlanDetailsSection } from "./plan-detail-section"

export default function SubscriptionPlanConfig() {
  const [currentPlans, setCurrentPlans] = useState<Plan[]>(plans)

  const handlePlanUpdate = (updatedPlan: Plan) => {
    setCurrentPlans((prevPlans) => prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)))
  }

  return (
    <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold ">Subscription Plan Configuration</h1>
          <p className="mt-1 ">Manage pricing, tokens, and rollover rules for subscription plans</p>
        </div>
        <Button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md">Save All Plans</Button>
      </div>

      {/* Plan Summary Cards */}
      <div className="flex flex-wrap justify-between gap-4 mb-8">
        {currentPlans.map((plan) => (
          <PlanSummaryCard
            key={plan.id}
            tag={plan.tag}
            monthlyPrice={plan.monthlyPrice}
            monthlyTokenCount={plan.monthlyTokenCount}
            rolloverStatus={plan.tokenRolloverEnabled ? `${plan.rolloverPercentage}%` : "Disabled"}
            users={plan.currentSubscribers}
          />
        ))}
      </div>

      {/* Detailed Plan Sections */}
      <div className="space-y-8">
        {currentPlans.map((plan) => (
          <PlanDetailsSection key={plan.id} plan={plan} onUpdate={handlePlanUpdate} />
        ))}
      </div>
    </div>
  )
}
