import { ProjectStatusTracker } from "@/components/dashboard/project-status-tracker"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Project Status Tracker</h1>
        <p className="text-gray-600">Monitor project progress, phases, and risk levels</p>
      </div>
      
      <ProjectStatusTracker />
    </div>
  )
} 