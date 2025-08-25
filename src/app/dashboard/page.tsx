import { ExecutiveSummary } from "@/components/dashboard/executive-summary"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Executive Summary</h1>
        <p className="text-gray-600">Overview of compliance and performance metrics</p>
      </div>
      
      <ExecutiveSummary />
    </div>
  )
} 