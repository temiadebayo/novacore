"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon,
  DollarSignIcon,
  ZapIcon,
  Building2Icon,
  UsersIcon,
  ShieldIcon
} from "@/components/ui/icons"
import { formatCurrency, formatPercentage } from "@/lib/utils"
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

// Mock data for DISCOs
const discoData = {
  "Ikeja Electricity Distribution": {
    name: "Ikeja Electricity Distribution Company",
    location: "Lagos North",
    coverage: "Lagos North",
    totalCustomers: "1,250,000",
    activeCustomers: "1,180,000",
    collectionEfficiency: "94.2%",
    technicalLosses: "8.1%",
    commercialLosses: "12.3%",
    revenueCollection: "₦45.2B",
    targetCollection: "₦48.1B",
    customerSatisfaction: "87.5%",
    outageFrequency: "2.3/month",
    averageRestorationTime: "4.2 hours",
    monthlyRevenue: [
      { month: "Jan", actual: 42.1, target: 45.0 },
      { month: "Feb", actual: 43.8, target: 45.0 },
      { month: "Mar", actual: 44.2, target: 45.0 },
      { month: "Apr", actual: 44.9, target: 45.0 },
      { month: "May", actual: 45.1, target: 45.0 },
      { month: "Jun", actual: 45.2, target: 45.0 },
    ],
    customerSegments: [
      { segment: "Residential", customers: 850000, percentage: 68.0 },
      { segment: "Commercial", customers: 320000, percentage: 25.6 },
      { segment: "Industrial", customers: 80000, percentage: 6.4 },
    ],
    feederPerformance: [
      { feeder: "Alausa 11kV", status: "Normal", load: "85%", customers: 2500 },
      { feeder: "Ogba 11kV", status: "Overloaded", load: "110%", customers: 3200 },
      { feeder: "Iju 11kV", status: "Normal", load: "78%", customers: 1800 },
      { feeder: "Agege 11kV", status: "Maintenance", load: "0%", customers: 0 },
      { feeder: "Ikeja 11kV", status: "Normal", load: "92%", customers: 4100 },
    ],
    alerts: [
      { severity: "Medium", message: "Ogba feeder overloaded", date: "2024-01-20" },
      { severity: "Low", message: "Agege feeder maintenance scheduled", date: "2024-01-18" },
    ]
  },
  "Eko Electricity Distribution": {
    name: "Eko Electricity Distribution Company",
    location: "Lagos South",
    coverage: "Lagos South",
    totalCustomers: "980,000",
    activeCustomers: "925,000",
    collectionEfficiency: "96.8%",
    technicalLosses: "7.2%",
    commercialLosses: "10.1%",
    revenueCollection: "₦38.7B",
    targetCollection: "₦40.2B",
    customerSatisfaction: "91.2%",
    outageFrequency: "1.8/month",
    averageRestorationTime: "3.1 hours",
    monthlyRevenue: [
      { month: "Jan", actual: 36.5, target: 38.0 },
      { month: "Feb", actual: 37.2, target: 38.0 },
      { month: "Mar", actual: 37.8, target: 38.0 },
      { month: "Apr", actual: 38.1, target: 38.0 },
      { month: "May", actual: 38.4, target: 38.0 },
      { month: "Jun", actual: 38.7, target: 38.0 },
    ],
    customerSegments: [
      { segment: "Residential", customers: 650000, percentage: 66.3 },
      { segment: "Commercial", customers: 280000, percentage: 28.6 },
      { segment: "Industrial", customers: 50000, percentage: 5.1 },
    ],
    feederPerformance: [
      { feeder: "Victoria Island 11kV", status: "Normal", load: "88%", customers: 2800 },
      { feeder: "Lekki 11kV", status: "Normal", load: "82%", customers: 3200 },
      { feeder: "Surulere 11kV", status: "Normal", load: "75%", customers: 2100 },
      { feeder: "Ikoyi 11kV", status: "Normal", load: "90%", customers: 1800 },
    ],
    alerts: [
      { severity: "Low", message: "Routine maintenance scheduled", date: "2024-01-22" },
    ]
  }
}

export default function DiscoPage() {
  const params = useParams()
  const discoName = decodeURIComponent(params.name as string)
  const disco = discoData[discoName as keyof typeof discoData]

  if (!disco) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DISCO Not Found</h1>
          <p className="text-gray-600">The requested distribution company could not be found.</p>
        </div>
      </div>
    )
  }

  const kpiData = [
    {
      title: "Collection Efficiency",
      value: disco.collectionEfficiency,
      change: "+1.2%",
      changeType: "positive",
      icon: DollarSignIcon,
    },
    {
      title: "Active Customers",
      value: disco.activeCustomers,
      change: "+2.1%",
      changeType: "positive",
      icon: UsersIcon,
    },
    {
      title: "Technical Losses",
      value: disco.technicalLosses,
      change: "-0.3%",
      changeType: "positive",
      icon: TrendingDownIcon,
    },
    {
      title: "Customer Satisfaction",
      value: disco.customerSatisfaction,
      change: "+1.8%",
      changeType: "positive",
      icon: CheckCircleIcon,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{disco.name}</h1>
        <p className="text-muted-foreground">{disco.location} • Distribution Company</p>
      </div>

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

      {/* Company Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-lg font-semibold">{disco.totalCustomers}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coverage Area</p>
                <p className="text-lg font-semibold">{disco.coverage}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commercial Losses</p>
                <p className="text-lg font-semibold">{disco.commercialLosses}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outage Frequency</p>
                <p className="text-lg font-semibold">{disco.outageFrequency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue Collection</p>
              <p className="text-lg font-semibold">{disco.revenueCollection}</p>
              <p className="text-sm text-muted-foreground">Target: {disco.targetCollection}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Restoration Time</p>
              <p className="text-lg font-semibold">{disco.averageRestorationTime}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue vs Target (₦B)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={disco.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="actual" fill="#8b5cf6" name="Actual Revenue" />
              <Bar dataKey="target" fill="#10b981" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Segments */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={disco.customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="customers"
                >
                  {disco.customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#8b5cf6" : index === 1 ? "#10b981" : "#f59e0b"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {disco.customerSegments.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{segment.segment}</p>
                    <p className="text-sm text-muted-foreground">{segment.customers.toLocaleString()} customers</p>
                  </div>
                  <span className="text-lg font-semibold">{segment.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feeder Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Feeder Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disco.feederPerformance.map((feeder) => (
              <div 
                key={feeder.feeder}
                className={`p-4 border border-border rounded-lg ${
                  feeder.status === "Normal" 
                    ? "border-green-400/20 bg-green-400/10" 
                    : feeder.status === "Overloaded"
                    ? "border-red-400/20 bg-red-400/10"
                    : "border-yellow-400/20 bg-yellow-400/10"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{feeder.feeder}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feeder.status === "Normal" 
                      ? "bg-green-400/20 text-green-400" 
                      : feeder.status === "Overloaded"
                      ? "bg-red-400/20 text-red-400"
                      : "bg-yellow-400/20 text-yellow-400"
                  }`}>
                    {feeder.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Load: {feeder.load}</p>
                <p className="text-sm text-muted-foreground">Customers: {feeder.customers.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {disco.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {disco.alerts.map((alert, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === "High" ? "bg-red-400" :
                      alert.severity === "Medium" ? "bg-yellow-400" : "bg-green-400"
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.date}</p>
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
      )}
    </div>
  )
} 