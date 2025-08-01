"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Download,
  CalendarDays,
  ChevronDownIcon,
  MoreVertical,
  Eye,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"
import Button from "@/components/Base/Button" // Using existing Button
import { FormInput } from "@/components/Base/Form" // Using existing FormInput
import Table from "@/components/Base/Table" // Using existing Table
import { Dialog, Menu } from "@/components/Base/Headless" // Using existing Dialog and Menu
import Pagination from "@/components/Base/Pagination" // Importing Pagination component
import clsx from "clsx"
import { getSessionData } from "@/utils/session-meta"

// Helper function for status badge styling
const getStatusBadge = (status: string) => {
  const normalizedStatus = status.toLowerCase()
  let bgColor = "bg-gray-100 text-gray-800" // Default
  if (normalizedStatus === "completed") {
    bgColor = "bg-green-100 text-green-800"
  } else if (normalizedStatus === "pending") {
    bgColor = "bg-yellow-100 text-yellow-800"
  } else if (normalizedStatus === "cancelled") {
    bgColor = "bg-red-100 text-red-800"
  }
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", bgColor)}>
      {status}
    </span>
  )
}

// Helper function for token usage bar
const getTokenUsageBar = (used: number, limit: number) => {
  const percentage = (used / limit) * 100
  const barColor = percentage > 80 ? "bg-red-500" : percentage > 50 ? "bg-orange-500" : "bg-green-500"
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium">{used}</span>
      <span className="text-gray-500">/{limit}</span>
      <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className={clsx("h-full rounded-full", barColor)} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

export default function SessionMetadataLog() {
  const { stats, sessions: initialSessions } = getSessionData()
  const [sessions, setSessions] = useState(initialSessions) // Keeping this for potential future updates to the base data
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedType, setSelectedType] = useState("all")
  const [filteredSessions, setFilteredSessions] = useState(initialSessions) // Data after search/filter
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // You can adjust items per page here

  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  useEffect(() => {
    let result = [...initialSessions]

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      result = result.filter(
        (session) =>
          session.client.toLowerCase().includes(term) ||
          session.counselor.toLowerCase().includes(term) ||
          session.id.toLowerCase().includes(term),
      )
    }

    // Apply status filter
    if (selectedStatus !== "All Status") {
      result = result.filter((session) => session.status === selectedStatus)
    }

    // Apply type filter (placeholder for now)
    if (selectedType !== "all") {
      // Add actual filtering logic here if 'type' data is added
    }

    setFilteredSessions(result)
    setCurrentPage(1) // Reset to first page on filter/search change
  }, [searchTerm, selectedStatus, selectedType, initialSessions])

  // Pagination logic
  const totalItems = filteredSessions.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredSessions.slice(startIndex, endIndex)

  const handleViewDetails = (session: any) => {
    setSelectedSession(session)
    setViewDetailsModalOpen(true)
  }

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold ">Session Metadata Log</h1>
      {/* <p className="mt-1 ">Detailed session tracking with AI token usage and analytics</p> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 bg">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="p-4 flex items-center justify-between shadow-sm rounded-lg dark:bg-[#1b253b]">
              <div>
                <p className="text-sm ">{stat.title}</p>
                <p className="text-2xl font-bold  mt-1">{stat.value}</p>
              </div>
              <Icon className={clsx("w-6 h-6", stat.color)} />
            </div>
          )
        })}
      </div>

      {/* Session Metadata Section */}
      <div className="mt-8  p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold ">Session Metadata</h2>
            {/* <p className="text-sm ">Comprehensive session tracking with AI token usage</p> */}
          </div>
          <Button  className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" /> Export Data
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <FormInput
              type="text"
              placeholder="Search sessions, clients, or counselors..."
              className="pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Menu as="div" className="relative inline-block text-left z-50 text-teal-50">
            <Menu.Button as={Button} className="px-4 py-2 bg-primary  rounded-md shadow-md">
              {selectedStatus} <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
            </Menu.Button>
            <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md bg-white dark:text-[white] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {["All Status", "Completed", "Pending", "Cancelled"].map((status) => (
                <Menu.Item key={status}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedStatus(status)}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm  flex items-center`}
                    >
                      {status}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>

          {/* <Menu as="div" className="relative inline-block text-left z-50">
            <Menu.Button as={Button} className="px-4 py-2 bg-primary text-white rounded-md shadow-md">
              {selectedType} <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
            </Menu.Button>
            <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {["all", "type A", "type B"].map((type) => (
                <Menu.Item key={type}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedType(type)}
                      className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-gray-700`}
                    >
                      {type}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu> */}

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <FormInput
              type="date"
              placeholder="From date"
              className="pl-9 pr-3 py-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <FormInput type="date" placeholder="To date" className="pl-9 pr-3 py-2 rounded-md border border-gray-300" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Session ID</Table.Th>
                <Table.Th>Client</Table.Th>
                <Table.Th>Counselor</Table.Th>
                <Table.Th>Date & Time</Table.Th>
                <Table.Th>Duration</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Tokens Used</Table.Th>
                {/* <Table.Th>AI Usage</Table.Th> */}
                <Table.Th className="text-center">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {currentItems.length > 0 ? (
                currentItems.map((session) => (
                  <Table.Tr key={session.id} className="intro-x">
                    <Table.Td className="box rounded-l-[0.6rem] border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005] font-medium">
                      {session.id}
                    </Table.Td>
                    <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                      {session.client}
                    </Table.Td>
                    <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                      {session.counselor}
                    </Table.Td>
                    <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                      <div>{session.date}</div>
                      <div className="text-gray-500 text-sm">{session.time}</div>
                    </Table.Td>
                    <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                      <div>{session.duration}</div>
                      <div className="text-gray-500 text-sm">Actual: {session.actualDuration}</div>
                    </Table.Td>
                    <Table.Td className="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      {getStatusBadge(session.status)}
                    </Table.Td>
                    <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
                      {getTokenUsageBar(session.tokensUsed, session.tokenLimit)}
                    </Table.Td>
                    <Table.Td className="box rounded-r-[0.6rem] border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005] text-center">
                      <Menu as="div" className="relative inline-block text-left z-10">
                        <Menu.Button as={Button} size="sm" variant="outline-secondary" className="px-2">
                          <MoreVertical className="w-4 h-4" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleViewDetails(session)}
                                className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-1 py-2 text-sm  flex items-center`}
                              >
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={9} className="h-24 text-center text-gray-500">
                    No sessions found.
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap mt-4 justify-center">
          {/* <div className="hidden mx-auto md:block text-slate-500">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div> */}
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
      <Dialog open={viewDetailsModalOpen} onClose={() => setViewDetailsModalOpen(false)}>
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-0 shadow-lg">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-200">
            <h3 className="text-2xl font-bold ">Session Details</h3>
            <p className="text-sm  mt-1">Detailed information about the selected session.</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {selectedSession && (
              <div className="grid gap-4 py-4 text-sm">
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">Session ID:</span>
                  <span className="col-span-2 font-medium">{selectedSession.id}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">Client:</span>
                  <span className="col-span-2">{selectedSession.client}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">Counselor:</span>
                  <span className="col-span-2">{selectedSession.counselor}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">Date & Time:</span>
                  <span className="col-span-2">
                    {selectedSession.date} at {selectedSession.time}
                  </span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">Duration:</span>
                  <span className="col-span-2">
                    {selectedSession.duration} (Actual: {selectedSession.actualDuration})
                  </span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">Status:</span>
                  <span className="col-span-2">{getStatusBadge(selectedSession.status)}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">Tokens Used:</span>
                  <span className="col-span-2">
                    {selectedSession.tokensUsed} / {selectedSession.tokenLimit}
                  </span>
                </div>
                {/* <div className="grid grid-cols-3 items-center gap-4">
                  <span className="text-gray-500">AI Usage:</span>
                  <span className="col-span-2">
                    {selectedSession.aiUsageEnabled
                      ? `Enabled (T: ${selectedSession.aiTokensTotal} | A: ${selectedSession.aiTokensActual})`
                      : "Disabled"}
                  </span>
                </div> */}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 pt-4 border-t border-gray-200">
            <Button type="button" onClick={() => setViewDetailsModalOpen(false)} variant="outline-secondary">
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
