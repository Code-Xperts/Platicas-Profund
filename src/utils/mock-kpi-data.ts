export interface KpiData {
  sessions: { value: string; change: string; changeType: "positive" | "negative" }
  activeUsers: { value: string; change: string; changeType: "positive" | "negative" }
  tokenUtilization: { value: string; description: string }
  monthlyRevenue: { value: string; change: string; changeType: "positive" | "negative" }
}

export interface BreakdownData {
  clients: number
  counselors: number
  newThisPeriod: number
}

export interface TokenAnalyticsData {
  totalUsage: string
  utilizationRate: string
  transcription: number
  analysis: number
  avgPerSession: number
}

export interface RevenueTargetData {
  current: number
  target: number
}

export interface SubscriptionPlanData {
  users: number
  revenue: number
}

export interface SubscriptionBreakdownData {
  basic: SubscriptionPlanData
  premium: SubscriptionPlanData
  professional: SubscriptionPlanData
}

export interface SessionTrendItem {
  date: string
  count: number
}

export interface DashboardData {
  kpis: KpiData
  activeUsersBreakdown: BreakdownData
  tokenUsageAnalytics: TokenAnalyticsData
  revenueTarget: RevenueTargetData
  subscriptionBreakdown: SubscriptionBreakdownData
  sessionActivityTrends: SessionTrendItem[]
}

export const mockDashboardData: Record<string, DashboardData> = {
  "this-month": {
    kpis: {
      sessions: { value: "1,247", change: "+7.9% vs last month", changeType: "positive" },
      activeUsers: { value: "2,847", change: "+12.3% total platform users", changeType: "positive" },
      tokenUtilization: { value: "73.9%", description: "1,847,293 used of total token limit" },
      monthlyRevenue: { value: "$158,895", change: "+1.6% vs last month", changeType: "positive" },
    },
    activeUsersBreakdown: { clients: 2691, counselors: 156, newThisPeriod: 342 },
    tokenUsageAnalytics: {
      totalUsage: "1 / 5",
      utilizationRate: "73.9%",
      transcription: 1203,
      analysis: 6434,
      avgPerSession: 1482,
    },
    revenueTarget: { current: 158895, target: 175000 },
    subscriptionBreakdown: {
      basic: { users: 1245, revenue: 18675 },
      premium: { users: 1156, revenue: 86700 },
      professional: { users: 446, revenue: 53520 },
    },
    sessionActivityTrends: [
      { date: "Jan 1", count: 42 },
      { date: "Jan 2", count: 38 },
      { date: "Jan 3", count: 45 },
      { date: "Jan 4", count: 52 },
      { date: "Jan 5", count: 48 },
      { date: "Jan 6", count: 41 },
      { date: "Jan 7", count: 39 },
    ],
  },
  "last-month": {
    kpis: {
      sessions: { value: "1,150", change: "-2.1% vs previous month", changeType: "negative" },
      activeUsers: { value: "2,500", change: "+5.0% total platform users", changeType: "positive" },
      tokenUtilization: { value: "68.5%", description: "1,712,500 used of total token limit" },
      monthlyRevenue: { value: "$150,000", change: "-0.5% vs previous month", changeType: "negative" },
    },
    activeUsersBreakdown: { clients: 2300, counselors: 200, newThisPeriod: 250 },
    tokenUsageAnalytics: {
      totalUsage: "1,712,500 / 2,500,000",
      utilizationRate: "68.5%",
      transcription: 1100000,
      analysis: 612500,
      avgPerSession: 1300,
    },
    revenueTarget: { current: 150000, target: 170000 },
    subscriptionBreakdown: {
      basic: { users: 1100, revenue: 16500 },
      premium: { users: 1000, revenue: 75000 },
      professional: { users: 400, revenue: 48000 },
    },
    sessionActivityTrends: [
      { date: "Dec 25", count: 35 },
      { date: "Dec 26", count: 40 },
      { date: "Dec 27", count: 37 },
      { date: "Dec 28", count: 48 },
      { date: "Dec 29", count: 42 },
      { date: "Dec 30", count: 39 },
      { date: "Dec 31", count: 36 },
    ],
  },
  "last-7-days": {
    kpis: {
      sessions: { value: "300", change: "+1.5% vs previous 7 days", changeType: "positive" },
      activeUsers: { value: "2,900", change: "+0.5% total platform users", changeType: "positive" },
      tokenUtilization: { value: "75.0%", description: "1,875,000 used of total token limit" },
      monthlyRevenue: { value: "$40,000", change: "+0.2% vs previous 7 days", changeType: "positive" },
    },
    activeUsersBreakdown: { clients: 2750, counselors: 150, newThisPeriod: 80 },
    tokenUsageAnalytics: {
      totalUsage: "1,875,000 / 2,500,000",
      utilizationRate: "75.0%",
      transcription: 1250000,
      analysis: 625000,
      avgPerSession: 1500,
    },
    revenueTarget: { current: 40000, target: 45000 },
    subscriptionBreakdown: {
      basic: { users: 300, revenue: 4500 },
      premium: { users: 280, revenue: 21000 },
      professional: { users: 100, revenue: 12000 },
    },
    sessionActivityTrends: [
      { date: "Jan 29", count: 50 },
      { date: "Jan 30", count: 45 },
      { date: "Jan 31", count: 55 },
      { date: "Feb 1", count: 60 },
      { date: "Feb 2", count: 52 },
      { date: "Feb 3", count: 48 },
      { date: "Feb 4", count: 53 },
    ],
  },
}
