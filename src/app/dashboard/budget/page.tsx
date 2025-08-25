import { BudgetTracker } from "@/components/dashboard/budget-tracker"

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CAPEX vs Budget Tracker</h1>
        <p className="text-gray-600">Monitor budget vs actual spend and variance alerts</p>
      </div>
      
      <BudgetTracker />
    </div>
  )
} 