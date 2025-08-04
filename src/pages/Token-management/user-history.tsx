"use client"

import { Dialog } from "@/components/Base/Headless"
import Button from "@/components/Base/Button"
import clsx from "clsx"

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    plan: string
    currentTokens: number
    tokenStatus: string
    overflowAmount?: number
    monthlyAllocation: number
    status: string
    nextRefill: string
  } | null
}

// Helper function for Plan badge styling (re-used from user-token-balances.tsx)
const getPlanBadge = (plan: string) => {
  const normalizedPlan = plan.toLowerCase()
  let bgColor = "bg-gray-100 text-gray-600" // Default
  if (normalizedPlan === "premium") {
    bgColor = "bg-blue-100 text-blue-800"
  } else if (normalizedPlan === "basic") {
    bgColor = "bg-purple-100 text-purple-800"
  }
  return (
    <span className={clsx("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium", bgColor)}>{plan}</span>
  )
}

// Helper function for Current Tokens status badge styling (re-used from user-token-balances.tsx)
const getTokenStatusBadge = (status: string) => {
  const normalizedStatus = status.toLowerCase()
  let bgColor = "bg-gray-100 text-gray-800" // Normal
  if (normalizedStatus === "empty") {
    bgColor = "bg-red-100 text-red-800"
  } else if (normalizedStatus === "overflow") {
    bgColor = "bg-purple-100 text-purple-800"
  } else if (normalizedStatus === "low") {
    bgColor = "bg-yellow-100 text-yellow-800"
  }
  return (
    <span className={clsx("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium", bgColor)}>{status}</span>
  )
}

// Helper function for User Status badge styling (re-used from user-token-balances.tsx)
const getUserStatusBadge = (status: string) => {
  const normalizedStatus = status.toLowerCase()
  let bgColor = "bg-black text-white" // Active
  if (normalizedStatus === "suspended") {
    bgColor = "bg-red-500 text-white"
  }
  return (
    <span className={clsx("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", bgColor)}>
      {status}
    </span>
  )
}

export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-0 shadow-lg">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold ">User Details - {user.name}</h3>
          <p className="text-sm  mt-1">Comprehensive information about the user's token balance.</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid gap-4 py-4 text-sm">
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">User ID:</span>
              <span className="col-span-2 font-medium">{user.id}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">Name:</span>
              <span className="col-span-2">{user.name}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">Email:</span>
              <span className="col-span-2">{user.email}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">Plan:</span>
              <span className="col-span-2">{getPlanBadge(user.plan)}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">Current Tokens:</span>
              <span className="col-span-2 flex items-center gap-2">
                <span className="font-medium">{user.currentTokens}</span>
                {getTokenStatusBadge(user.tokenStatus)}
                {user.tokenStatus === "Overflow" && (
                  <span className="text-xs text-purple-600">+ {user.overflowAmount} overflow</span>
                )}
              </span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">Monthly Allocation:</span>
              <span className="col-span-2">{user.monthlyAllocation} per month</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">Account Status:</span>
              <span className="col-span-2">{getUserStatusBadge(user.status)}</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-gray-500">Next Refill:</span>
              <span className="col-span-2">{user.nextRefill}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 pt-4 border-t border-gray-200">
          <Button type="button" onClick={onClose} variant="outline-secondary">
            Close
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
