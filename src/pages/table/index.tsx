"use client"

import type React from "react"
import clsx from "clsx"
import { useState, useRef, useEffect } from "react"
import Button from "@/components/Base/Button"
import Pagination from "@/components/Base/Pagination"
import { FormInput } from "@/components/Base/Form"
import Lucide from "@/components/Base/Lucide"
import Tippy from "@/components/Base/Tippy"
import { Dialog, Menu } from "@/components/Base/Headless"
import Table from "@/components/Base/Table"
import { ChevronDownIcon } from "lucide-react"
import UserFormModal from "./user-form-model"
import UserDetailModal from "./view-model"


// Define the User interface (needs to be consistent across files)
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

// Original getUserData function provided by the user
export function getUserData() {
  const data: User[] = [
    {
      id: 1,
      name: "Electronics",
      email: "electronics@example.com",
      role: "Counselors",
      plan: "Pro",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-29",
    },
    {
      id: 2,
      name: "Fashion",
      email: "fashion@example.com",
      role: "Client",
      plan: "Free",
      status: false,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-28",
    },
    {
      id: 3,
      name: "Home Goods",
      email: "homegoods@example.com",
      role: "Counselors",
      plan: "Premium",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-27",
    },
    {
      id: 4,
      name: "Books",
      email: "books@example.com",
      role: "Client",
      plan: "Free",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-26",
    },
    {
      id: 5,
      name: "Sports",
      email: "sports@example.com",
      role: "Counselors",
      plan: "Pro",
      status: false,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-25",
    },
    {
      id: 6,
      name: "Automotive",
      email: "automotive@example.com",
      role: "Client",
      plan: "Premium",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-24",
    },
    {
      id: 7,
      name: "Toys",
      email: "toys@example.com",
      role: "Counselors",
      plan: "Free",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-23",
    },
    {
      id: 8,
      name: "Health",
      email: "health@example.com",
      role: "Client",
      plan: "Pro",
      status: false,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-22",
    },
    {
      id: 9,
      name: "Beauty",
      email: "beauty@example.com",
      role: "Counselors",
      plan: "Premium",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-21",
    },
    {
      id: 10,
      name: "Food",
      email: "food@example.com",
      role: "Client",
      plan: "Free",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-20",
    },
    {
      id: 11,
      name: "Travel",
      email: "travel@example.com",
      role: "Counselors",
      plan: "Pro",
      status: false,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-19",
    },
    {
      id: 12,
      name: "Music",
      email: "music@example.com",
      role: "Client",
      plan: "Premium",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
      uploadedAt: "2025-07-18",
    },
  ]
  return { data }
}

function UserTable() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  // State to manage all user data, initialized from getUserData()
  const [allUserData, setAllUserData] = useState<User[]>(getUserData().data)

  // State for the add/edit form modal
  const [showFormModal, setShowFormModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Omit<User, "id" | "uploadedAt">>({
    name: "",
    email: "",
    role: "Client", // Default role for new users
    plan: "Free", // Default plan for new users
    status: true, // Default status for new users
    image: "/placeholder.svg?height=40&width=40", // Default image for new users
  })

  // State for view detail modal
  const [showViewDetailModal, setShowViewDetailModal] = useState(false)
  const [currentViewingUser, setCurrentViewingUser] = useState<User | null>(null)

  // State for filters and pagination
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // Locked to 10 items per page
  const [filteredData, setFilteredData] = useState<User[]>(allUserData)

  // State for user to be deleted
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null)

  // Filter and search logic
  useEffect(() => {
    let result = allUserData
    // Filter by role
    if (selectedRole !== "All Roles") {
      result = result.filter((user) => user.role === selectedRole)
    }
    // Search by name or email
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
      )
    }
    setFilteredData(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedRole, searchTerm, allUserData])

  // Pagination logic
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredData.slice(startIndex, endIndex)

  const handleSelectRole = (role: string) => {
    setSelectedRole(role)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Function to open the Add New User form
  const handleAddUserClick = () => {
    setIsEditing(false)
    setCurrentEditingUser(null)
    setFormData({
      name: "",
      email: "",
      role: "Client",
      plan: "Free",
      status: true,
      image: "/placeholder.svg?height=40&width=40",
    })
    setShowFormModal(true)
  }

  // Function to open the Edit User form
  const handleEditUserClick = (user: User) => {
    setIsEditing(true)
    setCurrentEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      plan: user.plan,
      status: user.status,
      image: user.image,
    })
    setShowFormModal(true)
  }

  // Function to open the View User Detail modal
  const handleViewDetailClick = (user: User) => {
    setCurrentViewingUser(user)
    setShowViewDetailModal(true)
  }

  // Handle form input changes (passed to modal)
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value as any })) // Cast to any for role/plan
    }
  }

  // Handle form submission (Add or Update) (passed to modal)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing && currentEditingUser) {
      // Update existing user
      setAllUserData((prev) =>
        prev.map((user) =>
          user.id === currentEditingUser.id
            ? { ...user, ...formData, uploadedAt: new Date().toISOString().split("T")[0] }
            : user,
        ),
      )
    } else {
      // Add new user
      const newId = allUserData.length > 0 ? Math.max(...allUserData.map((user) => user.id)) + 1 : 1
      const newUser: User = {
        id: newId,
        ...formData,
        uploadedAt: new Date().toISOString().split("T")[0],
      }
      setAllUserData((prev) => [...prev, newUser])
    }
    setShowFormModal(false)
  }

  // Handle actual deletion after confirmation
  const handleDeleteUser = () => {
    if (userToDeleteId !== null) {
      setAllUserData((prev) => prev.filter((user) => user.id !== userToDeleteId))
      setDeleteConfirmationModal(false)
      setUserToDeleteId(null)
    }
  }

  return (
    <>
      <h2 className="mt-10 text-3xl font-bold intro-y">Users</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md" onClick={handleAddUserClick}>
            Add New User
          </Button>
          <Menu as="div" className="relative inline-block text-left ">
            <Menu.Button as={Button} className="px-4 py-2 bg-primary text-white  rounded-md shadow-md">
              {selectedRole}
              <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
            </Menu.Button>
            <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      onClick={() => handleSelectRole("All Roles")}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
                    >
                      All Roles
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      onClick={() => handleSelectRole("Counselors")}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
                    >
                      Counselors
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      onClick={() => handleSelectRole("Client")}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
                    >
                      Client
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      onClick={() => handleSelectRole("Admin")}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
                    >
                      Admin
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Lucide icon="Search" className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">IMAGES</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">EMAIL</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">ROLE</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">PLAN</Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">STATUS</Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">ACTIONS</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {currentItems.length > 0 ? (
                currentItems.map((user, userKey) => (
                  <Table.Tr key={userKey} className="intro-x">
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <Tippy
                            as="img"
                            alt="Category Image"
                            className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            src={user.image}
                            content={`Uploaded at ${user.uploadedAt}`}
                          />
                        </div>
                        <div>
                          <h1 className="font-medium whitespace-nowrap">{user.name}</h1>
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td className="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <p>{user.email}</p>
                    </Table.Td>
                    <Table.Td className="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <div
                        className={clsx("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", {
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300": user.role === "Counselors",
                          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300":
                            user.role === "Client",
                          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300":
                            user.role === "Admin",
                          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300": user.role === "Viewer",
                        })}
                      >
                        {user.role}
                      </div>
                    </Table.Td>
                    <Table.Td className="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      {user.role !== "Counselors" ? <p>{user.plan}</p> : <p className="text-slate-400">- N/A -</p>}
                    </Table.Td>
                    <Table.Td className="box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <div
                        className={clsx([
                          "flex items-center justify-center",
                          { "text-green-600": user.status },
                          { "text-red-600": !user.status },
                        ])}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                        {user.status ? "Active" : "Inactive"}
                      </div>
                    </Table.Td>
                    <Table.Td
                      className={clsx([
                        "box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600",
                        "before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400",
                      ])}
                    >
                      <div className="flex items-center justify-center">
                        <a
                          className="flex items-center mr-3"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handleViewDetailClick(user)
                          }}
                        >
                          <Lucide icon="Eye" className="w-4 h-4 mr-1" />
                          View
                        </a>
                        <a
                          className="flex items-center mr-3"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handleEditUserClick(user)
                          }}
                        >
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                          Edit
                        </a>
                        <a
                          className="flex items-center text-red-600"
                          href="#"
                          onClick={(event) => {
                            event.preventDefault()
                            setUserToDeleteId(user.id) // Set the ID of the user to be deleted
                            setDeleteConfirmationModal(true)
                          }}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                        </a>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6} className="text-center">
                    No users found
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link
              onClick={() => currentPage !== 1 && handlePageChange(1)}
              className={clsx({ "pointer-events-none opacity-50": currentPage === 1 })}
            >
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link
              onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)}
              className={clsx({ "pointer-events-none opacity-50": currentPage === 1 })}
            >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Link key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                {page}
              </Pagination.Link>
            ))}
            <Pagination.Link
              onClick={() => currentPage !== totalPages && handlePageChange(currentPage + 1)}
              className={clsx({ "pointer-events-none opacity-50": currentPage === totalPages })}
            >
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link
              onClick={() => currentPage !== totalPages && handlePageChange(totalPages)}
              className={clsx({ "pointer-events-none opacity-50": currentPage === totalPages })}
            >
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false)
          setUserToDeleteId(null) // Clear the user ID on close
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-red-600" />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false)
                setUserToDeleteId(null)
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button variant="danger" type="button" className="w-24" ref={deleteButtonRef} onClick={handleDeleteUser}>
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
      {/* BEGIN: Add/Edit User Form Modal (now a separate component) */}
      <UserFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        isEditing={isEditing}
        formData={formData}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      {/* END: Add/Edit User Form Modal */}
      {/* BEGIN: View User Detail Modal */}
      <UserDetailModal
        open={showViewDetailModal}
        onClose={() => setShowViewDetailModal(false)}
        user={currentViewingUser}
      />
      {/* END: View User Detail Modal */}
    </>
  )
}

export default UserTable
