"use client"

import { useState, useEffect } from "react"
import { Dialog } from "@headlessui/react" // Use your own wrapper if needed
import Button from "@/components/Base/Button"
import { Plan, PlanFeature } from "@/utils/type"
import { PlanFeaturesBlock } from "./plan-feature-block"

interface EditPlanFeaturesModalProps {
  isOpen: boolean
  onClose: () => void
  plan: Plan | null
  onSave: (updatedPlan: Plan) => void
}

export function EditPlanFeaturesModal({
  isOpen,
  onClose,
  plan,
  onSave,
}: EditPlanFeaturesModalProps) {
  const [editedFeatures, setEditedFeatures] = useState<PlanFeature[]>([])

  useEffect(() => {
    if (plan) {
      setEditedFeatures(plan.features.map((feature) => ({ ...feature })))
    }
  }, [plan])

  const handleFeatureTextChange = (index: number, newText: string) => {
    setEditedFeatures((prev) => {
      const updated = [...prev]
      if (updated[index]) {
        updated[index] = { ...updated[index], text: newText }
      }
      return updated
    })
  }

  const handleFeatureToggle = (index: number) => {
    setEditedFeatures((prev) => {
      const updated = [...prev]
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          included: !updated[index].included,
        }
      }
      return updated
    })
  }

  const handleDeleteFeature = (index: number) => {
    setEditedFeatures((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddFeature = (text: string, included: boolean) => {
    setEditedFeatures((prev) => [...prev, { text, included }])
  }

  const handleSave = () => {
    if (plan) {
      onSave({ ...plan, features: editedFeatures })
      onClose()
    }
  }

  if (!plan) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-[95vw] max-w-6xl mx-auto rounded-lg box shadow-lg">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-200">
            <h3 className="text-2xl font-bold ">
              Edit {plan.name} Features
            </h3>
            <p className="text-sm  mt-1">
              Manage which features are included in this plan.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <PlanFeaturesBlock
              features={editedFeatures}
              isEditing={true}
              onFeatureTextChange={handleFeatureTextChange}
              onFeatureToggle={handleFeatureToggle}
              onFeatureDelete={handleDeleteFeature}
              onAddFeature={handleAddFeature}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              variant="outline-secondary"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white"
            >
              Update Features
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
