"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  AlertTriangleIcon, 
  DollarSignIcon,
  BarChart3Icon
} from "@/components/ui/icons"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"

const budgetData = [
  {
    category: "Equipment",
    budgeted: 15000000,
    actual: 14200000,
    variance: -800000,
    variancePercent: -5.3,
  },
  {
    category: "Labor",
    budgeted: 8000000,
    actual: 8500000,
    variance: 500000,
    variancePercent: 6.3,
  },
  {
    category: "Materials",
    budgeted: 5000000,
    actual: 5200000,
    variance: 200000,
    variancePercent: 4.0,
  },
  {
    category: "Contractors",
    budgeted: 3000000,
    actual: 2800000,
    variance: -200000,
    variancePercent: -6.7,
  },
  {
    category: "Permits & Fees",
    budgeted: 1000000,
    actual: 950000,
    variance: -50000,
    variancePercent: -5.0,
  },
  {
    category: "Contingency",
    budgeted: 2000000,
    actual: 1800000,
    variance: -200000,
    variancePercent: -10.0,
  },
]

const monthlyData = [
  { month: "Jan", budgeted: 1200000, actual: 1150000, variance: -50000 },
  { month: "Feb", budgeted: 1200000, actual: 1180000, variance: -20000 },
  { month: "Mar", budgeted: 1200000, actual: 1220000, variance: 20000 },
  { month: "Apr", budgeted: 1200000, actual: 1190000, variance: -10000 },
  { month: "May", budgeted: 1200000, actual: 1210000, variance: 10000 },
  { month: "Jun", budgeted: 1200000, actual: 1230000, variance: 30000 },
  { month: "Jul", budgeted: 1200000, actual: 1250000, variance: 50000 },
  { month: "Aug", budgeted: 1200000, actual: 1240000, variance: 40000 },
]

const varianceAlerts = [
  {
    id: 1,
    severity: "High",
    message: "Labor costs exceeded budget by 6.3%",
    category: "Labor",
    amount: 500000,
  },
  {
    id: 2,
    severity: "Medium",
    message: "Materials cost variance of 4.0%",
    category: "Materials",
    amount: 200000,
  },
  {
    id: 3,
    severity: "Low",
    message: "Contingency fund utilization at 90%",
    category: "Contingency",
    amount: -200000,
  },
]

const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgeted, 0)
const totalActual = budgetData.reduce((sum, item) => sum + item.actual, 0)
const totalVariance = totalActual - totalBudgeted
const totalVariancePercent = (totalVariance / totalBudgeted) * 100

const pieData = budgetData.map(item => ({
  name: item.category,
  value: item.actual,
  color: item.variancePercent > 5 ? "#EF4444" : item.variancePercent > 0 ? "#F59E0B" : "#10B981"
}))

export function BudgetTracker() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(totalBudgeted)}
            </div>
            <p className="text-xs text-muted-foreground">Planned expenditure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Actual Spend
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(totalActual)}
            </div>
            <p className="text-xs text-muted-foreground">Current expenditure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Variance
            </CardTitle>
            {totalVariance > 0 ? (
              <TrendingUpIcon className="h-4 w-4 text-red-400" />
            ) : (
              <TrendingDownIcon className="h-4 w-4 text-green-400" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalVariance > 0 ? "text-red-400" : "text-green-400"}`}>
              {formatCurrency(Math.abs(totalVariance))}
            </div>
            <p className={`text-xs ${totalVariance > 0 ? "text-red-400" : "text-green-400"}`}>
              {totalVariance > 0 ? "Over budget" : "Under budget"} ({formatPercentage(Math.abs(totalVariancePercent))})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget Utilization
            </CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatPercentage((totalActual / totalBudgeted) * 100)}
            </div>
            <p className="text-xs text-muted-foreground">Of total budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line 
                  type="monotone" 
                  dataKey="budgeted" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Budgeted"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground">Budgeted</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground">Actual</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground">Variance</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground">% Variance</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {budgetData.map((item) => (
                  <tr key={item.category} className="border-b border-border hover:bg-accent">
                    <td className="py-3 px-4 font-medium">{item.category}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(item.budgeted)}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(item.actual)}</td>
                    <td className={`py-3 px-4 text-right font-medium ${
                      item.variance > 0 ? "text-red-400" : "text-green-400"
                    }`}>
                      {item.variance > 0 ? "+" : ""}{formatCurrency(item.variance)}
                    </td>
                    <td className={`py-3 px-4 text-right ${
                      item.variancePercent > 5 ? "text-red-400" : 
                      item.variancePercent > 0 ? "text-yellow-400" : "text-green-400"
                    }`}>
                      {item.variancePercent > 0 ? "+" : ""}{formatPercentage(item.variancePercent)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.variancePercent > 5 ? "bg-red-400/20 text-red-400" :
                        item.variancePercent > 0 ? "bg-yellow-400/20 text-yellow-400" : "bg-green-400/20 text-green-400"
                      }`}>
                        {item.variancePercent > 5 ? "Over Budget" :
                         item.variancePercent > 0 ? "Near Limit" : "On Track"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Variance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
            Budget Variance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {varianceAlerts.map((alert) => (
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
                    <p className="text-xs text-muted-foreground">{alert.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    alert.amount > 0 ? "text-red-400" : "text-green-400"
                  }`}>
                    {alert.amount > 0 ? "+" : ""}{formatCurrency(alert.amount)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === "High" ? "bg-red-400/20 text-red-400" :
                    alert.severity === "Medium" ? "bg-yellow-400/20 text-yellow-400" : "bg-green-400/20 text-green-400"
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 