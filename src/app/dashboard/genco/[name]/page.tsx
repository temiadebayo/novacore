"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon,
  ZapIcon,
  ShieldIcon
} from "@/components/ui/icons"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts"

// Mock data for GENCOs
const gencoData = {
  "Egbin Power Plc": {
    name: "Egbin Power Plc",
    location: "Lagos",
    type: "Thermal",
    capacity: "1320 MW",
    currentOutput: "1150 MW",
    availability: "87.1%",
    efficiency: "92.3%",
    fuelType: "Natural Gas",
    operator: "KEPCO Energy",
    commissioningDate: "1985",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-07-15",
    complianceRate: "96.8%",
    budgetUtilization: "89.2%",
    monthlyOutput: [
      { month: "Jan", output: 1050, target: 1200 },
      { month: "Feb", output: 1080, target: 1200 },
      { month: "Mar", output: 1120, target: 1200 },
      { month: "Apr", output: 1150, target: 1200 },
      { month: "May", output: 1180, target: 1200 },
      { month: "Jun", output: 1150, target: 1200 },
    ],
    units: [
      { unit: "Unit 1", status: "Online", output: "220 MW", efficiency: "91.2%" },
      { unit: "Unit 2", status: "Online", output: "220 MW", efficiency: "92.1%" },
      { unit: "Unit 3", status: "Online", output: "220 MW", efficiency: "93.5%" },
      { unit: "Unit 4", status: "Online", output: "220 MW", efficiency: "91.8%" },
      { unit: "Unit 5", status: "Maintenance", output: "0 MW", efficiency: "0%" },
      { unit: "Unit 6", status: "Online", output: "220 MW", efficiency: "92.7%" },
    ],
    alerts: [
      { severity: "Medium", message: "Unit 5 scheduled maintenance", date: "2024-01-15" },
      { severity: "Low", message: "Fuel efficiency below target", date: "2024-01-10" },
    ]
  },
  "Geregu Power Plc": {
    name: "Geregu Power Plc",
    location: "Kogi State",
    type: "Thermal",
    capacity: "434 MW",
    currentOutput: "410 MW",
    availability: "94.5%",
    efficiency: "89.7%",
    fuelType: "Natural Gas",
    operator: "Amperion Power Distribution",
    commissioningDate: "2007",
    lastMaintenance: "2024-02-01",
    nextMaintenance: "2024-08-01",
    complianceRate: "98.2%",
    budgetUtilization: "85.1%",
    monthlyOutput: [
      { month: "Jan", output: 380, target: 400 },
      { month: "Feb", output: 395, target: 400 },
      { month: "Mar", output: 405, target: 400 },
      { month: "Apr", output: 410, target: 400 },
      { month: "May", output: 408, target: 400 },
      { month: "Jun", output: 410, target: 400 },
    ],
    units: [
      { unit: "Unit 1", status: "Online", output: "145 MW", efficiency: "88.9%" },
      { unit: "Unit 2", status: "Online", output: "145 MW", efficiency: "90.1%" },
      { unit: "Unit 3", status: "Online", output: "120 MW", efficiency: "89.3%" },
    ],
    alerts: [
      { severity: "Low", message: "Minor efficiency optimization needed", date: "2024-01-20" },
    ]
  }
}

export default function GencoPage() {
  const params = useParams()
  const gencoName = decodeURIComponent(params.name as string)
  const genco = gencoData[gencoName as keyof typeof gencoData]

  if (!genco) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GENCO Not Found</h1>
          <p className="text-gray-600">The requested generation company could not be found.</p>
        </div>
      </div>
    )
  }

  const kpiData = [
    {
      title: "Current Output",
      value: genco.currentOutput,
      change: "+2.1%",
      changeType: "positive",
      icon: ZapIcon,
    },
    {
      title: "Availability",
      value: genco.availability,
      change: "+1.3%",
      changeType: "positive",
      icon: CheckCircleIcon,
    },
    {
      title: "Efficiency",
      value: genco.efficiency,
      change: "-0.5%",
      changeType: "negative",
      icon: TrendingUpIcon,
    },
    {
      title: "Compliance Rate",
      value: genco.complianceRate,
      change: "+0.8%",
      changeType: "positive",
      icon: ShieldIcon,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{genco.name}</h1>
        <p className="text-gray-600">{genco.location} • {genco.type} Power Plant</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
              <div className="flex items-center text-xs">
                {kpi.changeType === "positive" ? (
                  <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={kpi.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                  {kpi.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plant Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Installed Capacity</p>
                <p className="text-lg font-semibold">{genco.capacity}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fuel Type</p>
                <p className="text-lg font-semibold">{genco.fuelType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Operator</p>
                <p className="text-lg font-semibold">{genco.operator}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commissioned</p>
                <p className="text-lg font-semibold">{genco.commissioningDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Maintenance</p>
              <p className="text-lg font-semibold">{genco.lastMaintenance}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Next Maintenance</p>
              <p className="text-lg font-semibold text-blue-400">{genco.nextMaintenance}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Output Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Output vs Target (MW)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genco.monthlyOutput}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="output" fill="#8b5cf6" name="Actual Output" />
              <Bar dataKey="target" fill="#10b981" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Unit Status */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {genco.units.map((unit) => (
              <div 
                key={unit.unit}
                className={`p-4 border border-border rounded-lg ${
                  unit.status === "Online" 
                    ? "border-green-400/20 bg-green-400/10" 
                    : "border-yellow-400/20 bg-yellow-400/10"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{unit.unit}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    unit.status === "Online" 
                      ? "bg-green-400/20 text-green-400" 
                      : "bg-yellow-400/20 text-yellow-400"
                  }`}>
                    {unit.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Output: {unit.output}</p>
                <p className="text-sm text-muted-foreground">Efficiency: {unit.efficiency}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {genco.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {genco.alerts.map((alert, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === "High" ? "bg-red-500" :
                      alert.severity === "Medium" ? "bg-yellow-500" : "bg-green-500"
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === "High" ? "bg-red-100 text-red-700" :
                    alert.severity === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
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