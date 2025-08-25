"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon,
  DollarSignIcon,
  ZapIcon,
  Building2Icon
} from "@/components/ui/icons"
import { formatCurrency } from "@/lib/utils"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"

const kpiData = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    changeType: "positive",
    icon: Building2Icon,
  },
  {
    title: "Budget Utilization",
    value: "87.3%",
    change: "+2.1%",
    changeType: "positive",
    icon: DollarSignIcon,
  },
  {
    title: "Energy Output",
    value: "2,847 MW",
    change: "+5.2%",
    changeType: "positive",
    icon: ZapIcon,
  },
  {
    title: "Compliance Rate",
    value: "94.2%",
    change: "-1.3%",
    changeType: "negative",
    icon: CheckCircleIcon,
  },
]

const projectStatusData = [
  { name: "Planning", value: 8, color: "#8b5cf6" },
  { name: "In Progress", value: 12, color: "#10b981" },
  { name: "On Hold", value: 3, color: "#f59e0b" },
  { name: "Completed", value: 1, color: "#6b7280" },
]

const budgetData = [
  { month: "Jan", budgeted: 1200000, actual: 1150000 },
  { month: "Feb", budgeted: 1200000, actual: 1180000 },
  { month: "Mar", budgeted: 1200000, actual: 1220000 },
  { month: "Apr", budgeted: 1200000, actual: 1190000 },
  { month: "May", budgeted: 1200000, actual: 1210000 },
  { month: "Jun", budgeted: 1200000, actual: 1230000 },
]

const energyOutputData = [
  { month: "Jan", output: 2450 },
  { month: "Feb", output: 2380 },
  { month: "Mar", output: 2520 },
  { month: "Apr", output: 2480 },
  { month: "May", output: 2560 },
  { month: "Jun", output: 2847 },
]

const riskAlerts = [
  { id: 1, severity: "High", message: "Plant A maintenance overdue by 15 days", plant: "Plant A" },
  { id: 2, severity: "Medium", message: "License renewal due in 30 days", plant: "Plant B" },
  { id: 3, severity: "Low", message: "Budget variance exceeds 10%", plant: "Project X" },
]

export function ExecutiveSummary() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center text-xs">
                {kpi.changeType === "positive" ? (
                  <TrendingUpIcon className="h-3 w-3 text-green-400 mr-1" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3 text-red-400 mr-1" />
                )}
                                  <span className={kpi.changeType === "positive" ? "text-green-400" : "text-red-400"}>
                    {kpi.change} from last month
                  </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {projectStatusData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget vs Actual */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="budgeted" fill="#8b5cf6" name="Budgeted" />
                <Bar dataKey="actual" fill="#10b981" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Energy Output Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Output Trend (MW)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyOutputData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="output" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
            Risk Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === "High" ? "bg-red-400" :
                    alert.severity === "Medium" ? "bg-yellow-400" : "bg-green-400"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.plant}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.severity === "High" ? "bg-red-400/20 text-red-400" :
                  alert.severity === "Medium" ? "bg-yellow-400/20 text-yellow-400" : "bg-green-400/20 text-green-400"
                }`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 