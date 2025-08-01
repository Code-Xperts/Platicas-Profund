export interface PlanFeature {
  text: string
  included: boolean // true for check, false for cross
}

export interface Plan {
  id: string
  tag: string // e.g., "Basic", "Premium", "Professional"
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  discount?: string
  monthlyTokenCount: number
  tokenRolloverEnabled: boolean
  rolloverPercentage?: number
  maxRolloverTokens?: number
  features: PlanFeature[]
  statusActive: boolean
  currentSubscribers: number
}

export interface StatCardProps {
  tag: string
  monthlyPrice: number
  monthlyTokenCount: number
  rolloverStatus: string
  users: number
}

export interface FeatureItemProps {
  text: string
  included: boolean
  index: number // Added for easier identification in callbacks
  isEditing?: boolean // Added for editing mode
  onToggle?: (index: number) => void
  onTextChange?: (index: number, newText: string) => void
  onDelete?: (index: number) => void
}

export interface ToggleSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}
