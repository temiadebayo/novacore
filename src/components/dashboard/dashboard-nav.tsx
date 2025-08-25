"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  BarChart3Icon,
  Building2Icon,
  CalendarIcon,
  FileTextIcon,
  GanttChartIcon,
  HomeIcon,
  ShieldIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
  AlertTriangleIcon,
  ClipboardListIcon,
  SettingsIcon,
  ChevronDownIcon
} from "@/components/ui/icons"

const navigation = {
  admin: [
    { name: "Executive Summary", href: "/dashboard", icon: HomeIcon },
    { name: "Project Status", href: "/dashboard/projects", icon: GanttChartIcon },
    { name: "CAPEX vs Budget", href: "/dashboard/budget", icon: TrendingUpIcon },
    { name: "Contractor Performance", href: "/dashboard/contractors", icon: UsersIcon },
    { name: "Energy Output", href: "/dashboard/energy", icon: ZapIcon },
    { name: "Plant Availability", href: "/dashboard/availability", icon: Building2Icon },
    { name: "Load Dispatch", href: "/dashboard/dispatch", icon: BarChart3Icon },
    { name: "Outage History", href: "/dashboard/outages", icon: AlertTriangleIcon },
    { name: "Maintenance Schedule", href: "/dashboard/maintenance", icon: CalendarIcon },
    { name: "License Status", href: "/dashboard/licenses", icon: ShieldIcon },
    { name: "Regulatory Filings", href: "/dashboard/filings", icon: FileTextIcon },
    { name: "HSE Compliance", href: "/dashboard/hse", icon: ClipboardListIcon },
    { name: "Offtaker Performance", href: "/dashboard/offtaker", icon: TrendingUpIcon },
  ],
  executive: [
    { name: "Executive Summary", href: "/dashboard", icon: HomeIcon },
    { name: "Project Status", href: "/dashboard/projects", icon: GanttChartIcon },
    { name: "CAPEX vs Budget", href: "/dashboard/budget", icon: TrendingUpIcon },
    { name: "Energy Output", href: "/dashboard/energy", icon: ZapIcon },
    { name: "Plant Availability", href: "/dashboard/availability", icon: Building2Icon },
    { name: "HSE Compliance", href: "/dashboard/hse", icon: ClipboardListIcon },
  ],
  contractor: [
    { name: "Project Status", href: "/dashboard/projects", icon: GanttChartIcon },
    { name: "Performance Metrics", href: "/dashboard/performance", icon: TrendingUpIcon },
    { name: "Maintenance Schedule", href: "/dashboard/maintenance", icon: CalendarIcon },
    { name: "HSE Compliance", href: "/dashboard/hse", icon: ClipboardListIcon },
  ],
  plant_operator: [
    { name: "Plant Overview", href: "/dashboard", icon: HomeIcon },
    { name: "Energy Output", href: "/dashboard/energy", icon: ZapIcon },
    { name: "Plant Availability", href: "/dashboard/availability", icon: Building2Icon },
    { name: "Outage History", href: "/dashboard/outages", icon: AlertTriangleIcon },
    { name: "Maintenance Schedule", href: "/dashboard/maintenance", icon: CalendarIcon },
  ],
  regulator: [
    { name: "Executive Summary", href: "/dashboard", icon: HomeIcon },
    { name: "Project Status", href: "/dashboard/projects", icon: GanttChartIcon },
    { name: "CAPEX vs Budget", href: "/dashboard/budget", icon: TrendingUpIcon },
    { name: "Contractor Performance", href: "/dashboard/contractors", icon: UsersIcon },
    { name: "Energy Output", href: "/dashboard/energy", icon: ZapIcon },
    { name: "Plant Availability", href: "/dashboard/availability", icon: Building2Icon },
    { name: "Load Dispatch", href: "/dashboard/dispatch", icon: BarChart3Icon },
    { name: "Outage History", href: "/dashboard/outages", icon: AlertTriangleIcon },
    { name: "Maintenance Schedule", href: "/dashboard/maintenance", icon: CalendarIcon },
    { name: "License Status", href: "/dashboard/licenses", icon: ShieldIcon },
    { name: "Regulatory Filings", href: "/dashboard/filings", icon: FileTextIcon },
    { name: "HSE Compliance", href: "/dashboard/hse", icon: ClipboardListIcon },
    { name: "Offtaker Performance", href: "/dashboard/offtaker", icon: TrendingUpIcon },
  ],
}

const gencos = [
  { name: "Egbin Power Plc", location: "Lagos", type: "Thermal" },
  { name: "Geregu Power Plc", location: "Kogi State", type: "Thermal" },
  { name: "Sapele Power Plc", location: "Delta State", type: "Thermal" },
  { name: "Omotosho Electric Energy", location: "Ondo State", type: "Thermal" },
  { name: "Olorunsogo Generation", location: "Ogun State", type: "Thermal" },
  { name: "Afam Power Plc", location: "Rivers State", type: "Thermal" },
  { name: "Alaoji Generation Company", location: "Abia State", type: "Thermal" },
  { name: "Calabar Generation Company", location: "Cross River State", type: "Thermal" },
  { name: "Gbarain Generation Company", location: "Bayelsa State", type: "Thermal" },
  { name: "Omoku Generation Company", location: "Rivers State", type: "Thermal" },
  { name: "Odukpani Generation Company", location: "Cross River", type: "Thermal" },
  { name: "Okpai IPP", location: "Delta State", type: "Thermal" },
  { name: "Azura-Edo Power Plant", location: "Edo State", type: "Thermal" },
  { name: "Transcorp Power", location: "Delta State", type: "Thermal" },
  { name: "Mainstream Energy Solutions", location: "Kainji & Jebba", type: "Hydro" },
  { name: "Kainji Hydro Electric Plc", location: "Mainstream Energy", type: "Hydro" },
  { name: "Jebba Hydro Electric Plc", location: "Mainstream Energy", type: "Hydro" },
  { name: "Shiroro Hydro Electric Plc", location: "North South Power", type: "Hydro" },
  { name: "Zungeru Hydro Power", location: "Government/IPPs", type: "Hydro" },
]

const discos = [
  { name: "Abuja Electricity Distribution", location: "FCT, Kogi, Nasarawa, Niger" },
  { name: "Benin Electricity Distribution", location: "Edo, Delta, Ekiti, Ondo" },
  { name: "Eko Electricity Distribution", location: "Lagos South" },
  { name: "Enugu Electricity Distribution", location: "Enugu, Abia, Anambra, Ebonyi, Imo" },
  { name: "Ibadan Electricity Distribution", location: "Oyo, Ogun, Osun, Kwara, part of Niger, Kogi" },
  { name: "Ikeja Electricity Distribution", location: "Lagos North" },
  { name: "Jos Electricity Distribution", location: "Plateau, Bauchi, Gombe, Benue" },
  { name: "Kaduna Electricity Distribution", location: "Kaduna, Kebbi, Sokoto, Zamfara" },
  { name: "Kano Electricity Distribution", location: "Kano, Katsina, Jigawa" },
  { name: "Port Harcourt Electricity Distribution", location: "Rivers, Cross River, Bayelsa, Akwa Ibom" },
  { name: "Yola Electricity Distribution", location: "Adamawa, Taraba, Borno, Yobe" },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  
  const userRole = session?.user?.role?.toLowerCase() || "contractor"
  const menuItems = navigation[userRole as keyof typeof navigation] || navigation.contractor

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const handleMouseEnter = (dropdown: string) => {
    setOpenDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  return (
    <div className="flex flex-col w-64 bg-background border-r border-border">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">NovaCore</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
                                   className={cn(
                       "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                       isActive
                         ? "bg-primary/10 text-primary"
                         : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                     )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}

        {/* GENCOs Dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter('gencos')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => handleDropdownToggle('gencos')}
                               className={cn(
                     "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                     openDropdown === 'gencos'
                       ? "bg-primary/10 text-primary"
                       : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                   )}
          >
            <div className="flex items-center">
              <ZapIcon className="mr-3 h-5 w-5" />
              GENCOs
            </div>
            <ChevronDownIcon className={cn(
              "h-4 w-4 transition-transform",
              openDropdown === 'gencos' ? "rotate-180" : ""
            )} />
          </button>
          
                           {openDropdown === 'gencos' && (
                   <div className="absolute left-0 right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                     {gencos.map((genco) => (
                       <Link
                         key={genco.name}
                         href={`/dashboard/genco/${encodeURIComponent(genco.name)}`}
                         className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent border-b border-border/50 last:border-b-0"
                       >
                                           <div className="font-medium">{genco.name}</div>
                         <div className="text-xs text-muted-foreground">{genco.location} • {genco.type}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* DISCOs Dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter('discos')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => handleDropdownToggle('discos')}
                               className={cn(
                     "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                     openDropdown === 'discos'
                       ? "bg-primary/10 text-primary"
                       : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                   )}
          >
            <div className="flex items-center">
              <Building2Icon className="mr-3 h-5 w-5" />
              DISCOs
            </div>
            <ChevronDownIcon className={cn(
              "h-4 w-4 transition-transform",
              openDropdown === 'discos' ? "rotate-180" : ""
            )} />
          </button>
          
                           {openDropdown === 'discos' && (
                   <div className="absolute left-0 right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                     {discos.map((disco) => (
                       <Link
                         key={disco.name}
                         href={`/dashboard/disco/${encodeURIComponent(disco.name)}`}
                         className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent border-b border-border/50 last:border-b-0"
                       >
                         <div className="font-medium">{disco.name}</div>
                         <div className="text-xs text-muted-foreground">{disco.location}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      
                   <div className="p-4 border-t border-border">
               <Link
                 href="/dashboard/settings"
                 className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground"
               >
          <SettingsIcon className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  )
} 