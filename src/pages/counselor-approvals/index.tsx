"use client"
import clsx from "clsx"
import { useState, useRef, useEffect } from "react"
import Button from "@/components/Base/Button"
import Pagination from "@/components/Base/Pagination"
import { FormInput } from "@/components/Base/Form"
import {
  Eye,
  CheckCircle,
  XCircle,
  Search,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDownIcon,
  MoreVertical,
} from "lucide-react"
import Tippy from "@/components/Base/Tippy"
import { Dialog, Menu } from "@/components/Base/Headless"
import Table from "@/components/Base/Table"
import DashboardStats from "./statuses"
import { ConselorApprovalData } from "@/utils/conselor-approval"

function CounselorApprovals() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [allUserData, setAllUserData] = useState(ConselorApprovalData().data)
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [filteredData, setFilteredData] = useState(allUserData)

  const [viewDetailsModal, setViewDetailsModal] = useState(false)
  type User = {
    id: string | number
    firstName: string
    lastName: string
    email: string
    image?: string
    status?: string
    uploadedAt?: string
    // add other fields as needed
  }
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    let result = [...allUserData]

    if (selectedStatus !== "All") {
      result = result.filter((user) => {
        const userStatus = String(user.status || "")
          .toLowerCase()
          .trim()
        const filterStatus = selectedStatus.toLowerCase().trim()

        switch (filterStatus) {
          case "pending review":
            return (
              userStatus === "pending review" ||
              userStatus === "pending" ||
              userStatus === "under review" ||
              userStatus === "reviewing"
            )
          case "approved":
            return userStatus === "approved"
          case "rejected":
            return userStatus === "rejected"
          default:
            return userStatus === filterStatus
        }
      })
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      result = result.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(term) ||
          user.lastName?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term),
      )
    }

    setFilteredData(result)
    setCurrentPage(1)
  }, [selectedStatus, searchTerm, allUserData])

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredData.slice(startIndex, endIndex)

  const getStatusDisplay = (status:any) => {
    if (!status) return "Pending Review"
    const statusString = String(status).toLowerCase().trim()
    switch (statusString) {
      case "pending review":
      case "pending":
      case "under review":
      case "reviewing":
        return "Pending Review"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      default:
        return "Pending Review"
    }
  }

  const getStatusClasses = (status:any) => {
    const normalizedStatus = status ? String(status as any).toLowerCase().trim() : "pending"
    return clsx("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", {
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300":
        normalizedStatus === "pending review" ||
        normalizedStatus === "pending" ||
        normalizedStatus === "under review" ||
        normalizedStatus === "reviewing" ||
        !normalizedStatus,
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": normalizedStatus === "approved",
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": normalizedStatus === "rejected",
    })
  }

  const handleViewDetails = (user:any) => {
    setSelectedUser(user)
    setViewDetailsModal(true)
  }

  const handleApprove = (userId:any) => {
    setAllUserData((prevData) => prevData.map((user) => (user.id === userId ? { ...user, status: "Approved" } : user)))
    setViewDetailsModal(false)
  }

  const handleReject = (userId:any) => {
    setAllUserData((prevData) => prevData.map((user) => (user.id === userId ? { ...user, status: "Rejected" } : user)))
    setViewDetailsModal(false)
  }

  return (
    <>
    <div className="pt-6">
      <h1 className="mt-6 text-3xl font-bold intro-y">Counselor Applications</h1>
      <p className="mt-2 text-slate-500">Review pending counselor applications and manage approvals</p>
        <h2 className="text-[20px] font-medium my-4">Stats</h2>
      <DashboardStats />
    </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button as={Button} className="px-4 py-2 bg-primary text-white rounded-md shadow-md">
              {selectedStatus}
              <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
            </Menu.Button>
            <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {["All", "Pending Review", "Approved", "Rejected"].map((status) => (
                <Menu.Item key={status}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedStatus(status)}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-1 py-2 text-sm `}
                    >
                      {status}
                    </button>
                  )}
                </Menu.Item>
              ))}
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
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
            </div>
          </div>
        </div>
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>First Name</Table.Th> {/* <-- Yahan First Name header hai */}
                <Table.Th>Last Name</Table.Th> {/* <-- Yahan Last Name header hai */}
                <Table.Th>Email</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">STATUS</Table.Th>
                <Table.Th className="text-center">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {currentItems.length > 0 ? (
                currentItems.map((user, idx) => {
                  const canApproveOrReject =
                    String(user.status).toLowerCase().trim() !== "approved" &&
                    String(user.status).toLowerCase().trim() !== "rejected"

                  return (
                    <Table.Tr key={idx} className="intro-x">
                      <Table.Td className="box rounded-l-[0.6rem] border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 image-fit zoom-in">
                            <Tippy
                              as="img"
                              src={user.image || "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRvRlZrRuVz40FYmb2ksQpK4CrxwcEFJx8vmrQD6PaJmFmARid7ujgfaLhPYIIJIeS9YQgbu0IVD6rq86rG4cZ_Z_ncwB746TAVrSOj9jg"}
                              className="rounded-full"
                              content={`Name: ${user.firstName} ${user.lastName}`}
                            />
                          </div>
                          <div className="whitespace-nowrap font-medium">{user.firstName}</div>{" "}
                          {/* <-- Yahan First Name display ho raha hai */}
                        </div>
                      </Table.Td>
                      <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                        <div className="whitespace-nowrap font-medium">{user.lastName}</div>{" "}
                        {/* <-- Yahan Last Name display ho raha hai */}
                      </Table.Td>
                      <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                        {user.email}
                      </Table.Td>
                      <Table.Td className="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                        <div className={getStatusClasses(user.status)}>{getStatusDisplay(user.status)}</div>
                      </Table.Td>

                      <Table.Td className="box rounded-r-[0.6rem] border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005] text-center">
                        <Menu as="div" className="relative inline-block text-left">
                          <Menu.Button as={Button} size="sm" variant="outline-secondary" className="px-2">
                            <MoreVertical className="w-4 h-4" />
                          </Menu.Button>
                          <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleViewDetails(user)}
                                  className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm  flex items-center`}
                                >
                                  <Eye className="w-4 h-4 mr-2" /> View
                                </button>
                              )}
                            </Menu.Item>
                            {canApproveOrReject && (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleApprove(user.id)}
                                      className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center`}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleReject(user.id)}
                                      className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center`}
                                    >
                                      <XCircle className="w-4 h-4 mr-2" /> Reject
                                    </button>
                                  )}
                                </Menu.Item>
                              </>
                            )}
                          </Menu.Items>
                        </Menu>
                      </Table.Td>
                    </Table.Tr>
                  )
                })
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5} className="text-center py-8">
                    No users found
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link onClick={() => currentPage !== 1 && setCurrentPage(1)}>
              <ChevronsLeft className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Pagination.Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Link key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                {page}
              </Pagination.Link>
            ))}
            <Pagination.Link onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
              <ChevronRight className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link onClick={() => currentPage !== totalPages && setCurrentPage(totalPages)}>
              <ChevronsRight className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
        </div>
      </div>

      {/* View Details Modal */}
      <Dialog open={viewDetailsModal} onClose={() => setViewDetailsModal(false)}>
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-0 shadow-lg">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-200">
            <h3 className="text-2xl font-bold ">Applicant Details</h3>
            <p className="text-sm  mt-1">Complete information about the applicant.</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {selectedUser && (
              <>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedUser.image as string || "/placeholder.svg?height=80&width=80&query=person"}
                    alt={`${selectedUser.firstName as string} ${selectedUser.lastName}`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="text-xl font-semibold ">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </p>
                    <p className="text-sm ">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="font-medium ">Applicant ID:</p>
                    <p className="">{selectedUser.id}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="font-medium ">Status:</p>
                    <div className={getStatusClasses(selectedUser.status)}>{getStatusDisplay(selectedUser.status)}</div>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium ">Application Date:</p>
                    <p className="t">{selectedUser.uploadedAt}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 pt-4 border-t border-gray-200">
            <Button type="button" onClick={() => setViewDetailsModal(false)} variant="outline-secondary">
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default CounselorApprovals
