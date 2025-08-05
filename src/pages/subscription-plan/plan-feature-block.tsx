"use client"


import { useState } from "react"

import { Check, X, XCircle } from "lucide-react"
import { FormInput } from "@/components/Base/Form"
import { FeatureItemProps, PlanFeature } from "@/utils/type"
import Button from "@/components/Base/Button"

function FeatureItem({ text, included, index, isEditing, onToggle, onTextChange, onDelete }: FeatureItemProps) {
  return (
    <div className="flex items-center justify-between py-1 group">
      <div className="flex items-center flex-grow">
        {included ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-red-500 mr-2" />}
        {isEditing && onTextChange ? (
          <FormInput
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTextChange(index, e.target.value)}
            className="flex-grow text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <span className={`text-sm ${included ? "text-gray-700" : "text-gray-500 line-through"}`}>{text}</span>
        )}
      </div>
      {isEditing && (
        <div className="flex items-center ml-4 space-x-2">
          {/* {onToggle && (
            <button
              onClick={() => onToggle(index)}
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                included ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {included ? "Remove" : "Add"}
            </button>
          )} */}
          {onDelete && (
            <button
              onClick={() => onDelete(index)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete feature"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

interface PlanFeaturesBlockProps {
  features: PlanFeature[]
  isEditing?: boolean
  onFeatureTextChange?: (index: number, newText: string) => void
  onFeatureToggle?: (index: number) => void
  onFeatureDelete?: (index: number) => void
  onAddFeature?: (newFeatureText: string, included: boolean) => void
}

export function PlanFeaturesBlock({
  features,
  isEditing = false,
  onFeatureTextChange,
  onFeatureToggle,
  onFeatureDelete,
  onAddFeature,
}: PlanFeaturesBlockProps) {
  // When editing, we need to use the current index in the filtered array for keys and callbacks
  // When not editing, we can use originalIndex (if available) or just map index.
  // For simplicity and consistency in editing mode, we'll just use map index for keys and callbacks.
  // The actual state update in the modal will use this index.

  const includedFeatures = features.filter((f) => f.included)
  const limitations = features.filter((f) => !f.included)

  const [newFeatureText, setNewFeatureText] = useState("")

  const handleAddClick = (included: boolean) => {
    if (newFeatureText.trim() && onAddFeature) {
      onAddFeature(newFeatureText.trim(), included)
      setNewFeatureText("")
    }
  }

  return (
    <div className="dark:bg-[#151f33] p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold  mb-4">Plan Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
        <div>
          <h4 className="text-sm font-medium  mb-2">Included Features</h4>
          {includedFeatures.length > 0 ? (
            includedFeatures.map(
              (
                feature,
                idx, // Use idx for current index
              ) => (
                <FeatureItem
                  key={idx} // Key should be current index for stable re-renders in editing mode
                  index={features.indexOf(feature)} // Pass original index from the full features array
                  text={feature.text}
                  included={feature.included}
                  isEditing={isEditing}
                  onToggle={onFeatureToggle}
                  onTextChange={onFeatureTextChange}
                  onDelete={onFeatureDelete}
                />
              ),
            )
          ) : (
            <p className="text-sm ">No included features.</p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium  mb-2">Limitations</h4>
          {limitations.length > 0 ? (
            limitations.map(
              (
                feature,
                idx, // Use idx for current index
              ) => (
                <FeatureItem
                  key={idx} // Key should be current index for stable re-renders in editing mode
                  index={features.indexOf(feature)} // Pass original index from the full features array
                  text={feature.text}
                  included={feature.included}
                  isEditing={isEditing}
                  onToggle={onFeatureToggle}
                  onTextChange={onFeatureTextChange}
                  onDelete={onFeatureDelete}
                />
              ),
            )
          ) : (
            <p className="text-sm ">No limitations.</p>
          )}
        </div>
      </div>

      {isEditing && onAddFeature && (
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
          <FormInput
            type="text"
            placeholder="New feature text"
            value={newFeatureText}
            onChange={(e) => setNewFeatureText(e.target.value)}
            className="flex-grow"
          />
          <div className="flex gap-2">
            <Button onClick={() => handleAddClick(true)} disabled={!newFeatureText.trim()}>
              Add Included
            </Button>
            <Button onClick={() => handleAddClick(false)} disabled={!newFeatureText.trim()} variant="outline-secondary">
              Add Limitation
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
