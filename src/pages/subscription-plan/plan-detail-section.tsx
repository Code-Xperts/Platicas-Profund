"use client"

import type * as React from "react"
import { useState } from "react"
import { Settings, Users } from "lucide-react"
import Button from "@/components/Base/Button"
import { FormInput } from "@/components/Base/Form"
import { Plan } from "@/utils/type"
import { TokenConfigurationBlock } from "./token-config"
import { PlanFeaturesBlock } from "./plan-feature-block"
import { ToggleSwitch } from "./toggle-switch"
import { EditPlanFeaturesModal } from "./edit-plan-features"


interface PlanDetailsSectionProps {
  plan: Plan
  onUpdate: (updatedPlan: Plan) => void
}

export function PlanDetailsSection({ plan, onUpdate }: PlanDetailsSectionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onUpdate({ ...plan, [name]: Number.parseFloat(value) || 0 })
  }

  const handleStatusToggle = (checked: boolean) => {
    onUpdate({ ...plan, statusActive: checked })
  }

  const handleEditFeaturesClick = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveFeatures = (updatedPlan: Plan) => {
    onUpdate(updatedPlan) // Pass the updated plan from the modal to the parent
  }

  return (
    <div className="dark:bg-[#1b253b] p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
      {/* Plan Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-md box px-2.5 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10">
            {plan.tag}
          </span>
          <div>
            <h2 className="text-xl font-bold ">{plan.name}</h2>
            <p className="text-sm ">{plan.description}</p>
          </div>
        </div>
        <Button className="flex items-center gap-2 bg-transparent" onClick={handleEditFeaturesClick}>
          <Settings className="w-4 h-4" /> Edit
        </Button>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`monthlyPrice-${plan.id}`} className="block text-sm font-medium  mb-1">
            Monthly Price ($)
          </label>
          <FormInput
            id={`monthlyPrice-${plan.id}`}
            name="monthlyPrice"
            type="number"
            value={plan.monthlyPrice}
            onChange={handlePriceChange}
            className="w-full dark:bg-[#151f33]"
          />
        </div>
        <div>
          <label htmlFor={`yearlyPrice-${plan.id}`} className="block text-sm font-medium  mb-1">
            Yearly Price ($)
          </label>
          <FormInput
            id={`yearlyPrice-${plan.id}`}
            name="yearlyPrice"
            type="number"
            value={plan.yearlyPrice}
            onChange={handlePriceChange}
            className="w-full dark:bg-[#151f33]"
          />
          {plan.discount && <p className="mt-1 text-xs ">{plan.discount}</p>}
        </div>
      </div>

      {/* Token Configuration */}
      <TokenConfigurationBlock plan={plan} onUpdate={onUpdate} />

      {/* Plan Features (Display only, editing in modal) */}
      <PlanFeaturesBlock features={plan.features} />

      {/* Plan Status */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <ToggleSwitch label="Plan Status" checked={plan.statusActive} onChange={handleStatusToggle} />
        <div className="flex items-center text-sm ">
          <Users className="w-4 h-4 mr-1" /> {plan.currentSubscribers} current subscribers
        </div>
      </div>

      {/* Edit Features Modal */}
      <EditPlanFeaturesModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        plan={plan}
        onSave={handleSaveFeatures}
      />
    </div>
  )
}
