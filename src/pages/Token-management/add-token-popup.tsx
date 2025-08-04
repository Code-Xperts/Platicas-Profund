"use client"

import { useState, useEffect } from "react"
import { Dialog } from "@/components/Base/Headless"
import Button from "@/components/Base/Button"
import { FormInput } from "@/components/Base/Form"

interface AddTokensModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    currentTokens: number
  } | null
  onAddTokens: (userId: string, tokensToAdd: number, reason: string) => void
}

export function AddTokensModal({ isOpen, onClose, user, onAddTokens }: AddTokensModalProps) {
  const [tokens, setTokens] = useState<number | string>("")
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (!isOpen) {
      // Reset form fields when modal closes
      setTokens("")
      setReason("")
    }
  }, [isOpen])

  const handleAddTokens = () => {
    if (user && typeof tokens === "number" && tokens > 0 && reason.trim()) {
      onAddTokens(user.id, tokens, reason.trim())
      onClose()
    } else {
      alert("Please enter a valid number of tokens and a reason for adjustment.")
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Panel className="w-full max-w-md rounded-lg p-0 shadow-lg">
        {/* Header */}
        <div className="p-6 pb-4 border-b ">
          <h3 className="text-2xl font-bold ">Add Tokens - {user.name}</h3>
          <p className="text-sm  mt-1">Current balance: {user.currentTokens} tokens</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="numTokens" className="block text-sm font-medium mb-1">
              Number of Tokens
            </label>
            <FormInput
              id="numTokens"
              type="number"
              placeholder="Enter number of tokens"
              value={tokens}
              onChange={(e) => setTokens(Number(e.target.value))}
              className="w-full"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium  mb-1">
              Reason for Adjustment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              rows={3}
              placeholder="Explain why you're adjusting tokens (required for audit trail)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border  border-gray-300 dark:bg-[#1b253b] rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y"
              required
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 pt-4 border-t border-gray-200">
          <Button type="button" onClick={onClose} variant="outline-secondary" className="mr-2">
            Cancel
          </Button>
          <Button type="button" onClick={handleAddTokens} className="bg-green-600 text-white hover:bg-green-700">
            Add Tokens
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
