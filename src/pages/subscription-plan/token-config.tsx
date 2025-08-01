"use client"

import type * as React from "react"
import { Zap } from "lucide-react"
import { FormInput } from "@/components/Base/Form"
import { Plan } from "@/utils/type"
import { ToggleSwitch } from "./toggle-switch"


interface TokenConfigurationBlockProps {
  plan: Plan
  onUpdate: (updatedPlan: Plan) => void
}

export function TokenConfigurationBlock({ plan, onUpdate }: TokenConfigurationBlockProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onUpdate({ ...plan, [name]: Number.parseFloat(value) || 0 })
  }

  const handleToggleChange = (checked: boolean) => {
    onUpdate({ ...plan, tokenRolloverEnabled: checked })
  }

  const calculatedMaxRollover =
    plan.tokenRolloverEnabled && plan.rolloverPercentage
      ? Math.floor((plan.monthlyTokenCount * plan.rolloverPercentage) / 100)
      : 0

  return (
    <div className="dark:bg-[#151f33] p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <Zap className="w-5 h-5  mr-2" />
        <h3 className="text-lg font-semibold 0">Token Configuration</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`monthlyTokenCount-${plan.id}`} className="block text-sm font-medium  mb-1">
            Monthly Token Count
          </label>
          <FormInput
            id={`monthlyTokenCount-${plan.id}`}
            name="monthlyTokenCount"
            type="number"
            value={plan.monthlyTokenCount}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="flex items-center pt-6">
          <ToggleSwitch label="Token Rollover" checked={plan.tokenRolloverEnabled} onChange={handleToggleChange} />
        </div>

        {plan.tokenRolloverEnabled && (
          <>
            <div>
              <label htmlFor={`rolloverPercentage-${plan.id}`} className="block text-sm font-medium  mb-1">
                Rollover Percentage (%)
              </label>
              <FormInput
                id={`rolloverPercentage-${plan.id}`}
                name="rolloverPercentage"
                type="number"
                value={plan.rolloverPercentage || ""}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor={`maxRolloverTokens-${plan.id}`} className="block text-sm font-medium  mb-1">
                Maximum Rollover Tokens
              </label>
              <FormInput
                id={`maxRolloverTokens-${plan.id}`}
                name="maxRolloverTokens"
                type="number"
                value={calculatedMaxRollover}
                readOnly
                className="w-full bg-gray-50 cursor-not-allowed"
              />
              <p className="mt-1 text-xs ">
                {plan.rolloverPercentage}% of {plan.monthlyTokenCount} = {calculatedMaxRollover} tokens
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
