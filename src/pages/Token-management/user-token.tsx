// "use client"

// import { useState, useEffect } from "react"
// import clsx from "clsx"
// import Button from "@/components/Base/Button"
// import Pagination from "@/components/Base/Pagination"
// import { FormInput } from "@/components/Base/Form"
// import {
//   Search,
//   ChevronDownIcon,
//   Plus,
//   Minus,
//   History,
//   ChevronsLeft,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsRight,
// } from "lucide-react"
// import { Menu } from "@/components/Base/Headless"
// import Table from "@/components/Base/Table"
// import { getUserTokenData, getUserTokenHistory,  } from "@/utils/user-token-data" 
// import { AddTokensModal } from "./add-token-popup"
// import { UserDetailsModal } from "./user-history"
// // import { TokenHistoryModal } from "./user-history"
// // import { TokenHistoryModal } from "@/components/token-history-modal" 

// // Helper function for Plan badge styling
// const getPlanBadge = (plan: string) => {
//   const normalizedPlan = plan.toLowerCase()
//   let bgColor = "bg-gray-100 text-gray-600" // Default
//   if (normalizedPlan === "premium") {
//     bgColor = "bg-blue-100 text-blue-800"
//   } else if (normalizedPlan === "basic") {
//     bgColor = "bg-purple-100 text-purple-800"
//   }
//   return (
//     <span className={clsx("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium", bgColor)}>{plan}</span>
//   )
// }

// // Helper function for Current Tokens status badge styling
// const getTokenStatusBadge = (status: string) => {
//   const normalizedStatus = status.toLowerCase()
//   let bgColor = "bg-gray-100 text-gray-800" // Normal
//   if (normalizedStatus === "empty") {
//     bgColor = "bg-red-100 text-red-800"
//   } else if (normalizedStatus === "overflow") {
//     bgColor = "bg-purple-100 text-purple-800"
//   } else if (normalizedStatus === "low") {
//     bgColor = "bg-yellow-100 text-yellow-800"
//   }
//   return (
//     <span className={clsx("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium", bgColor)}>{status}</span>
//   )
// }

// // Helper function for User Status badge styling
// const getUserStatusBadge = (status: string) => {
//   const normalizedStatus = status.toLowerCase()
//   let bgColor = "bg-black text-white" // Active
//   if (normalizedStatus === "suspended") {
//     bgColor = "bg-red-500 text-white"
//   }
//   return (
//     <span className={clsx("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", bgColor)}>
//       {status}
//     </span>
//   )
// }

// export default function UserTokenBalances() {
//   const { users: initialUsers } = getUserTokenData()
//   const [allUsersData, setAllUsersData] = useState(initialUsers)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedBalanceFilter, setSelectedBalanceFilter] = useState("All Balances")
//   const [selectedPlanFilter, setSelectedPlanFilter] = useState("All Plans")
//   const [filteredUsers, setFilteredUsers] = useState(initialUsers)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(5) // Adjust items per page as needed

//   const [isAddTokensModalOpen, setIsAddTokensModalOpen] = useState(false)
//   const [selectedUserForTokens, setSelectedUserForTokens] = useState<any>(null)

//   const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
//   const [selectedUserForHistory, setSelectedUserForHistory] = useState<any>(null)
//   const [tokenHistory, setTokenHistory] = useState<any[]>([])

//   useEffect(() => {
//     let result = [...allUsersData]

//     // Apply search filter
//     if (searchTerm.trim()) {
//       const term = searchTerm.toLowerCase().trim()
//       result = result.filter(
//         (user) =>
//           user.name.toLowerCase().includes(term) ||
//           user.email.toLowerCase().includes(term) ||
//           user.plan.toLowerCase().includes(term),
//       )
//     }

//     // Apply balance filter
//     if (selectedBalanceFilter !== "All Balances") {
//       result = result.filter((user) => user.tokenStatus === selectedBalanceFilter)
//     }

//     // Apply plan filter
//     if (selectedPlanFilter !== "All Plans") {
//       result = result.filter((user) => user.plan === selectedPlanFilter)
//     }

//     setFilteredUsers(result)
//     setCurrentPage(1) // Reset to first page on filter/search change
//   }, [searchTerm, selectedBalanceFilter, selectedPlanFilter, allUsersData])

//   // Pagination logic
//   const totalItems = filteredUsers.length
//   const totalPages = Math.ceil(totalItems / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
//   const currentItems = filteredUsers.slice(startIndex, endIndex)

//   const handleOpenAddTokensModal = (user: any) => {
//     setSelectedUserForTokens(user)
//     setIsAddTokensModalOpen(true)
//   }

//   const handleAddTokens = (userId: string, tokensToAdd: number, reason: string) => {
//     console.log(`Adding ${tokensToAdd} tokens to user ${userId} for reason: ${reason}`)
//     // Here you would typically update your backend or global state
//     setAllUsersData((prevData) =>
//       prevData.map((user) =>
//         user.id === userId
//           ? {
//               ...user,
//               currentTokens: user.currentTokens + tokensToAdd,
//               // You might want to update tokenStatus based on new balance
//               tokenStatus:
//                 user.currentTokens + tokensToAdd > user.monthlyAllocation
//                   ? "Overflow"
//                   : user.currentTokens + tokensToAdd === 0
//                     ? "Empty"
//                     : user.currentTokens + tokensToAdd < user.monthlyAllocation / 2 &&
//                         user.currentTokens + tokensToAdd > 0
//                       ? "Low"
//                       : "Normal",
//               overflowAmount:
//                 user.currentTokens + tokensToAdd > user.monthlyAllocation
//                   ? user.currentTokens + tokensToAdd - user.monthlyAllocation
//                   : undefined,
//             }
//           : user,
//       ),
//     )
//   }

//   const handleOpenHistoryModal = (user: any) => {
//     setSelectedUserForHistory(user)
//     setTokenHistory(getUserTokenHistory(user.id)) // Fetch history for the selected user
//     setIsHistoryModalOpen(true)
//   }

//   return (
//     <div className="p-6  min-h-screen">
//       <h1 className="text-3xl font-bold ">User Token Balances</h1>
//       <p className="mt-1 ">View and manage token allocations for all users</p>

//       <div className="grid grid-cols-12 gap-6 mt-5">
//         <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
//           <div className="w-full sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
//             <div className="relative w-56 text-slate-500">
//               <FormInput
//                 type="text"
//                 className="w-56 pr-10 !box"
//                 placeholder="Search users by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
//             </div>
//           </div>

//           <Menu as="div" className="relative inline-block text-left z-50 ml-auto sm:ml-4">
//             <Menu.Button as={Button} className="px-4 py-2 bg-primary text-white rounded-md shadow-md">
//               {selectedBalanceFilter}
//               <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
//             </Menu.Button>
//             <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//               {["All Balances", "Normal", "Empty", "Low", "Overflow"].map((filter) => (
//                 <Menu.Item key={filter}>
//                   {({ active }) => (
//                     <button
//                       onClick={() => setSelectedBalanceFilter(filter)}
//                       className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
//                     >
//                       {filter}
//                     </button>
//                   )}
//                 </Menu.Item>
//               ))}
//             </Menu.Items>
//           </Menu>

//           <Menu as="div" className="relative inline-block text-left z-50 ml-4">
//             <Menu.Button as={Button} className="px-4 py-2 bg-primary text-white rounded-md shadow-md">
//               {selectedPlanFilter}
//               <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
//             </Menu.Button>
//             <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//               {["All Plans", "Basic", "Premium"].map((plan) => (
//                 <Menu.Item key={plan}>
//                   {({ active }) => (
//                     <button
//                       onClick={() => setSelectedPlanFilter(plan)}
//                       className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
//                     >
//                       {plan}
//                     </button>
//                   )}
//                 </Menu.Item>
//               ))}
//             </Menu.Items>
//           </Menu>
//         </div>

//         <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
//           <Table className="border-spacing-y-[10px] border-separate -mt-2">
//             <Table.Thead>
//               <Table.Tr>
//                 <Table.Th>User</Table.Th>
//                 <Table.Th>Plan</Table.Th>
//                 <Table.Th>Current Tokens</Table.Th>
//                 <Table.Th>Monthly Allocation</Table.Th>
//                 <Table.Th>Status</Table.Th>
//                 <Table.Th>Next Refill</Table.Th>
//                 <Table.Th className="text-center">Actions</Table.Th>
//               </Table.Tr>
//             </Table.Thead>
//             <Table.Tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map((user, idx) => (
//                   <Table.Tr key={idx} className="intro-x">
//                     <Table.Td className="box rounded-l-[0.6rem] border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
//                       <div className="font-medium whitespace-nowrap">{user.name}</div>
//                       <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{user.email}</div>
//                     </Table.Td>
//                     <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
//                       {getPlanBadge(user.plan)}
//                     </Table.Td>
//                     <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
//                       <div className="flex items-center gap-2">
//                         <span className="font-medium">{user.currentTokens}</span>
//                         {getTokenStatusBadge(user.tokenStatus)}
//                         {user.tokenStatus === "Overflow" && (
//                           <span className="text-xs text-purple-600">+ {user.overflowAmount} overflow</span>
//                         )}
//                       </div>
//                     </Table.Td>
//                     <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
//                       <div className="font-medium">{user.monthlyAllocation}</div>
//                       <div className="text-slate-500 text-xs mt-0.5">per month</div>
//                     </Table.Td>
//                     <Table.Td className="box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
//                       {getUserStatusBadge(user.status)}
//                     </Table.Td>
//                     <Table.Td className="box border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005]">
//                       {user.nextRefill}
//                     </Table.Td>
//                     <Table.Td className="box rounded-r-[0.6rem] border-x-0 dark:bg-darkmode-600 shadow-[5px_3px_5px_#00000005] text-center">
//                       <div className="flex items-center justify-center gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline-secondary"
//                           className="px-2"
//                           onClick={() => handleOpenAddTokensModal(user)}
//                         >
//                           <Plus className="w-4 h-4" />
//                         </Button>
//                         <Button size="sm" variant="outline-secondary" className="px-2">
//                           <Minus className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline-secondary"
//                           className="px-2"
//                           onClick={() => handleOpenHistoryModal(user)}
//                         >
//                           <History className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </Table.Td>
//                   </Table.Tr>
//                 ))
//               ) : (
//                 <Table.Tr>
//                   <Table.Td colSpan={7} className="text-center py-8">
//                     No users found
//                   </Table.Td>
//                 </Table.Tr>
//               )}
//             </Table.Tbody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap mt-4">
//           <div className="hidden mx-auto md:block text-slate-500">
//             Showing {startIndex + 1} to {endIndex} of {totalItems} entries
//           </div>
//           <Pagination className="w-full sm:w-auto sm:mr-auto">
//             <Pagination.Link onClick={() => currentPage !== 1 && setCurrentPage(1)}>
//               <ChevronsLeft className="w-4 h-4" />
//             </Pagination.Link>
//             <Pagination.Link onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
//               <ChevronLeft className="w-4 h-4" />
//             </Pagination.Link>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <Pagination.Link key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
//                 {page}
//               </Pagination.Link>
//             ))}
//             <Pagination.Link onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
//               <ChevronRight className="w-4 h-4" />
//             </Pagination.Link>
//             <Pagination.Link onClick={() => currentPage !== totalPages && setCurrentPage(totalPages)}>
//               <ChevronsRight className="w-4 h-4" />
//             </Pagination.Link>
//           </Pagination>
//         </div>
//       </div>

//       <AddTokensModal
//         isOpen={isAddTokensModalOpen}
//         onClose={() => setIsAddTokensModalOpen(false)}
//         user={selectedUserForTokens}
//         onAddTokens={handleAddTokens}
//       />

//       {/* Token History Modal */}
//       <UserDetailsModal
//         isOpen={isHistoryModalOpen}
//         onClose={() => setIsHistoryModalOpen(false)}
//         user={selectedUserForHistory}
//       />
//     </div>
//   )
// }





"use client"
import { useState, useEffect } from "react"
import clsx from "clsx"
import Button from "@/components/Base/Button"
import Pagination from "@/components/Base/Pagination"
import { FormInput } from "@/components/Base/Form"
import {
  Search,
  ChevronDownIcon,
  Plus,
  Minus,
  History,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"
import { Menu } from "@/components/Base/Headless"
import Table from "@/components/Base/Table"
import { getUserTokenData, getUserTokenHistory, type User } from "@/utils/user-token-data" // Import User type
import { AddTokensModal } from "./add-token-popup"
import { UserDetailsModal } from "./user-history"
// import { AddTokensModal } from "@/components/add-token-popup" // Ensure correct import path
// import { UserDetailsModal } from "@/components/user-history"

// Helper function for Plan badge styling
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

// Helper function for Current Tokens status badge styling
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

// Helper function for User Status badge styling
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

export default function UserTokenBalances() {
  const { users: initialUsers } = getUserTokenData()
  const [allUsersData, setAllUsersData] = useState<User[]>(initialUsers as User[]) // Use User type
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBalanceFilter, setSelectedBalanceFilter] = useState("All Balances")
  const [selectedPlanFilter, setSelectedPlanFilter] = useState("All Plans")
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers as User[]) // Use User type
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // Adjust items per page as needed
  const [isAddTokensModalOpen, setIsAddTokensModalOpen] = useState(false)
  const [selectedUserForTokens, setSelectedUserForTokens] = useState<User | null>(null) // Use User type
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<User | null>(null) // Use User type
  const [tokenHistory, setTokenHistory] = useState<any[]>([])

  useEffect(() => {
    let result = [...allUsersData]
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.plan.toLowerCase().includes(term),
      )
    }
    // Apply balance filter
    if (selectedBalanceFilter !== "All Balances") {
      result = result.filter((user) => user.tokenStatus === selectedBalanceFilter)
    }
    // Apply plan filter
    if (selectedPlanFilter !== "All Plans") {
      result = result.filter((user) => user.plan === selectedPlanFilter)
    }
    setFilteredUsers(result)
    setCurrentPage(1) // Reset to first page on filter/search change
  }, [searchTerm, selectedBalanceFilter, selectedPlanFilter, allUsersData])

  // Pagination logic
  const totalItems = filteredUsers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredUsers.slice(startIndex, endIndex)

  const handleOpenAddTokensModal = (user: User) => {
    setSelectedUserForTokens(user)
    setIsAddTokensModalOpen(true)
  }

  const handleAddTokens = (userId: string, tokensToAdd: number, newMonthlyAllocation: number, reason: string) => {
    console.log(
      `Updating user ${userId}: Adding ${tokensToAdd} tokens, New Monthly Allocation: ${newMonthlyAllocation}, Reason: ${reason}`,
    )
    setAllUsersData((prevData) =>
      prevData.map((user) => {
        if (user.id === userId) {
          const newCurrentTokens = user.currentTokens + tokensToAdd
          return {
            ...user,
            currentTokens: newCurrentTokens,
            monthlyAllocation: newMonthlyAllocation, // Update monthly allocation
            tokenStatus:
              newCurrentTokens > newMonthlyAllocation
                ? "Overflow"
                : newCurrentTokens === 0
                  ? "Empty"
                  : newCurrentTokens < newMonthlyAllocation / 2 && newCurrentTokens > 0
                    ? "Low"
                    : "Normal",
            overflowAmount:
              newCurrentTokens > newMonthlyAllocation ? newCurrentTokens - newMonthlyAllocation : undefined,
          }
        }
        return user
      }),
    )
  }

  const handleOpenHistoryModal = (user: User) => {
    setSelectedUserForHistory(user)
    setTokenHistory(getUserTokenHistory(user.id)) // Fetch history for the selected user
    setIsHistoryModalOpen(true)
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold ">User Token Balances</h1>
      <p className="mt-1 ">View and manage token allocations for all users</p>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div className="w-full sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
            </div>
          </div>
          <Menu as="div" className="relative inline-block text-left z-50 ml-auto sm:ml-4">
            <Menu.Button as={Button} className="px-4 py-2 bg-primary text-white rounded-md shadow-md">
              {selectedBalanceFilter}
              <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
            </Menu.Button>
            <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {["All Balances", "Normal", "Empty", "Low", "Overflow"].map((filter) => (
                <Menu.Item key={filter}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedBalanceFilter(filter)}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
                    >
                      {filter}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          <Menu as="div" className="relative inline-block text-left z-50 ml-4">
            <Menu.Button as={Button} className="px-4 py-2 bg-primary text-white rounded-md shadow-md">
              {selectedPlanFilter}
              <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 inline" />
            </Menu.Button>
            <Menu.Items className="absolute z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {["All Plans", "Basic", "Premium"].map((plan) => (
                <Menu.Item key={plan}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedPlanFilter(plan)}
                      className={`${active ? "dark:bg-[#1b253b]" : ""} w-full text-left px-4 py-2 text-sm `}
                    >
                      {plan}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">User</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">Plan</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">Current Tokens</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">Monthly Allocation</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">Status</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">Next Refill</Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {currentItems.length > 0 ? (
                currentItems.map((user, idx) => (
                  <Table.Tr key={idx} className="intro-x">
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <div className="font-medium whitespace-nowrap">{user.name}</div>
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{user.email}</div>
                    </Table.Td>
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      {getPlanBadge(user.plan)}
                    </Table.Td>
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.currentTokens}</span>
                        {getTokenStatusBadge(user.tokenStatus)}
                        {user.tokenStatus === "Overflow" && (
                          <span className="text-xs text-purple-600">+ {user.overflowAmount} overflow</span>
                        )}
                      </div>
                    </Table.Td>
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <div className="font-medium">{user.monthlyAllocation}</div>
                      <div className="text-slate-500 text-xs mt-0.5">per month</div>
                    </Table.Td>
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      {getUserStatusBadge(user.status)}
                    </Table.Td>
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      {user.nextRefill}
                    </Table.Td>
                    <Table.Td className="box w-60 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="px-2"
                          onClick={() => handleOpenAddTokensModal(user)} // Only Plus button opens the modal
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline-secondary" className="px-2">
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="px-2"
                          onClick={() => handleOpenHistoryModal(user)}
                        >
                          <History className="w-4 h-4" />
                        </Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={7} className="text-center py-8">
                    No users found
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap mt-4">
          <div className="hidden mx-auto md:block text-slate-500">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div>
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
      <AddTokensModal
        isOpen={isAddTokensModalOpen}
        onClose={() => setIsAddTokensModalOpen(false)}
        user={selectedUserForTokens}
        onAddTokens={handleAddTokens}
      />
      {/* Token History Modal */}
      <UserDetailsModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        user={selectedUserForHistory}
      />
    </div>
  )
}
