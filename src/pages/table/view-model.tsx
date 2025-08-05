"use client"
import { Dialog } from "@/components/Base/Headless"
import Button from "@/components/Base/Button"
// import Image from "next/image"

interface User {
  id: number
  name: string
  email: string
  role: "Counselors" | "Client" | "Admin" | "Viewer"
  plan: string
  status: boolean
  image: string
  uploadedAt: string
}

interface UserDetailModalProps {
  open: boolean
  onClose: () => void
  user: User | null
}

export default function UserDetailModal({ open, onClose, user }: UserDetailModalProps) {
  if (!user) return null

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Panel className="max-w-lg">
        <div className="p-5 text-center">
          <h3 className="text-xl font-medium leading-6">User Details</h3>
          <div className="mt-4 flex flex-col items-center">
            <img
              src={user.image || "/placeholder.svg?height=80&width=80"}
              alt="User Avatar"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border object-cover"
            />
            <h4 className="mt-3 text-lg font-semibold">{user.name}</h4>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
          <div className="mt-6 text-left grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Role:</p>
              <p className="text-base font-semibold">{user.role}</p>
            </div>
            {user.role !== "Counselors" && (
              <div>
                <p className="text-sm font-medium text-slate-600">Plan:</p>
                <p className="text-base font-semibold">{user.plan}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-slate-600">Status:</p>
              <p className={`text-base font-semibold ${user.status ? "text-green-600" : "text-red-600"}`}>
                {user.status ? "Active" : "Inactive"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Uploaded At:</p>
              <p className="text-base font-semibold">{user.uploadedAt}</p>
            </div>
          </div>
        </div>
        <div className="px-5 pb-8 text-center">
          <Button variant="outline-secondary" type="button" onClick={onClose} className="w-24">
            Close
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
