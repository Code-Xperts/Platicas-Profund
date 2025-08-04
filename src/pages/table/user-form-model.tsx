"use client"

import type React from "react"
import { useRef } from "react"
import Button from "@/components/Base/Button"
import { FormInput } from "@/components/Base/Form"
import { Dialog } from "@/components/Base/Headless"

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

interface UserFormModalProps {
  open: boolean
  onClose: () => void
  isEditing: boolean
  formData: Omit<User, "id" | "uploadedAt">
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onFormSubmit: (e: React.FormEvent) => void
}

export default function UserFormModal({
  open,
  onClose,
  isEditing,
  formData,
  onFormChange,
  onFormSubmit,
}: UserFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onFormChange({
          target: {
            name: "image",
            value: reader.result as string,
          },
        } as React.ChangeEvent<HTMLInputElement>)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Panel>
        <div className="p-5 text-center">
          <h3 className="text-xl font-medium leading-6">{isEditing ? "Edit User" : "Add New User"}</h3>
          <div className="mt-2 text-sm text-slate-500">
            {isEditing ? "Edit the user details." : "Add a new user to your list."}
          </div>
        </div>

        <form onSubmit={onFormSubmit} className="p-5">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <FormInput
              id="name"
              name="name"
              value={formData.name}
              onChange={onFormChange}
              className="w-full"
              required
            />
          </div>

          {/* Avatar Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <img
                src={formData.image || "/placeholder.svg?height=40&width=40"}
                alt="Avatar"
                className="w-12 h-12 rounded-full border object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <FormInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onFormChange}
              className="w-full"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={onFormChange}
              className="form-select dark:bg-[#1b253b] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="Client">Client</option>
              <option value="Counselors">Counselors</option>
              <option value="Admin">Admin</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          {/* Plan Dropdown */}
          <div className="mb-4">
            <label htmlFor="plan" className="block text-sm font-medium mb-1">
              Plan
            </label>
            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={onFormChange}
              className="form-select dark:bg-[#1b253b] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Plan</option>
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {/* Status Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={formData.status}
              onChange={onFormChange}
              className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <label htmlFor="status" className="ml-2 block text-sm">
              Active
            </label>
          </div>

          {/* Buttons */}
          <div className="px-5 pb-8 text-center">
            <Button variant="outline-secondary" type="button" onClick={onClose} className="w-24 mr-1">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="w-44">
              {isEditing ? "Update User" : "Add User"}
            </Button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  )
}
