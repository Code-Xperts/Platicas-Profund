// DashboardStats.tsx
import { Clock, Eye, Check, X } from "lucide-react";

interface StatItem {
  label: string;
  count: number;
  icon: JSX.Element;
}

const stats: StatItem[] = [
  {
    label: "Pending Applications",
    count: 3,
    icon: <Clock className="text-yellow-500 w-4 h-4" />,
  },
  {
    label: "Under Review",
    count: 1,
    icon: <Eye className="text-blue-500 w-4 h-4" />,
  },
  {
    label: "Approved This Month",
    count: 12,
    icon: <Check className="text-green-600 w-4 h-4" />,
  },
  {
    label: "Rejected This Month",
    count: 3,
    icon: <X className="text-red-500 w-4 h-4" />,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="p-4 border rounded-md shadow-sm dark:bg-[#1b253b] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-sm font-medium ">
            {item.label}
            {item.icon}
          </div>
          <div className="mt-2 text-2xl font-bold ">{item.count}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
