"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  GanttChartIcon, 
  CalendarIcon, 
  DollarSignIcon, 
  AlertTriangleIcon,
  FilterIcon,
  SearchIcon
} from "@/components/ui/icons"
import { formatCurrency, formatDate, getRiskColor, getStatusColor } from "@/lib/utils"

const mockProjects = [
  {
    id: 1,
    name: "Solar Farm Expansion",
    description: "Expansion of existing solar farm capacity by 50MW",
    status: "IN_PROGRESS",
    phase: "EXECUTION",
    riskLevel: "MEDIUM",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    budget: 25000000,
    actualSpend: 16500000,
    manager: "Sarah Johnson",
    location: "Texas",
  },
  {
    id: 2,
    name: "Wind Turbine Maintenance",
    description: "Comprehensive maintenance of 25 wind turbines",
    status: "PLANNING",
    phase: "PLANNING",
    riskLevel: "LOW",
    progress: 25,
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    budget: 5000000,
    actualSpend: 1250000,
    manager: "Mike Chen",
    location: "California",
  },
  {
    id: 3,
    name: "Grid Infrastructure Upgrade",
    description: "Upgrade of transmission lines and substations",
    status: "ON_HOLD",
    phase: "MONITORING",
    riskLevel: "HIGH",
    progress: 40,
    startDate: "2023-11-01",
    endDate: "2024-10-31",
    budget: 15000000,
    actualSpend: 6000000,
    manager: "David Rodriguez",
    location: "Florida",
  },
  {
    id: 4,
    name: "Battery Storage Installation",
    description: "Installation of 100MWh battery storage system",
    status: "COMPLETED",
    phase: "CLOSURE",
    riskLevel: "LOW",
    progress: 100,
    startDate: "2023-06-01",
    endDate: "2024-02-28",
    budget: 8000000,
    actualSpend: 7800000,
    manager: "Lisa Wang",
    location: "Nevada",
  },
  {
    id: 5,
    name: "Hydroelectric Plant Refurbishment",
    description: "Major refurbishment of hydroelectric plant equipment",
    status: "IN_PROGRESS",
    phase: "EXECUTION",
    riskLevel: "CRITICAL",
    progress: 30,
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    budget: 35000000,
    actualSpend: 10500000,
    manager: "Robert Smith",
    location: "Washington",
  },
]

const statusOptions = ["All", "PLANNING", "IN_PROGRESS", "ON_HOLD", "COMPLETED"]
const riskOptions = ["All", "LOW", "MEDIUM", "HIGH", "CRITICAL"]

export function ProjectStatusTracker() {
  const [statusFilter, setStatusFilter] = useState("All")
  const [riskFilter, setRiskFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = mockProjects.filter(project => {
    const matchesStatus = statusFilter === "All" || project.status === statusFilter
    const matchesRisk = riskFilter === "All" || project.riskLevel === riskFilter
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesRisk && matchesSearch
  })

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-400"
    if (progress >= 60) return "bg-blue-400"
    if (progress >= 40) return "bg-yellow-400"
    return "bg-red-400"
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FilterIcon className="h-5 w-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent bg-input text-foreground"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status.replace("_", " ")}
                </option>
              ))}
            </select>
            
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent bg-input text-foreground"
            >
              {riskOptions.map(risk => (
                <option key={risk} value={risk}>
                  {risk === "All" ? "All Risk Levels" : risk}
                </option>
              ))}
            </select>
            
            <div className="text-sm text-muted-foreground flex items-center">
              {filteredProjects.length} of {mockProjects.length} projects
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.replace("_", " ")}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(project.riskLevel)}`}>
                    {project.riskLevel}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Phase</p>
                  <p className="font-medium">{project.phase.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Manager</p>
                  <p className="font-medium">{project.manager}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{project.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Timeline</p>
                  <p className="font-medium">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                </div>
              </div>

              {/* Budget Information */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(project.budget)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="font-medium">{formatCurrency(project.actualSpend)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="font-medium">{formatCurrency(project.budget - project.actualSpend)}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Budget Utilization</span>
                    <span>{((project.actualSpend / project.budget) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                                         <div 
                       className={`h-1 rounded-full ${
                         (project.actualSpend / project.budget) > 0.9 ? "bg-red-400" :
                         (project.actualSpend / project.budget) > 0.7 ? "bg-yellow-400" : "bg-green-400"
                       }`}
                      style={{ width: `${Math.min((project.actualSpend / project.budget) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
                  <CardContent className="text-center py-12">
          <GanttChartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No projects found matching your criteria</p>
        </CardContent>
        </Card>
      )}
    </div>
  )
} 