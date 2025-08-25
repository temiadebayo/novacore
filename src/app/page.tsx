"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Building2Icon, BarChart3Icon, ShieldIcon, TrendingUpIcon } from "@/components/ui/icons"

export default function HomePage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building2Icon className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">NovaCore</h1>
            </div>
            <a
              href="/auth/signin"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              Compliance Oversight &
              <span className="text-primary"> Performance Tracking</span>
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Central regulatory body oversight system for power/energy sector compliance 
              and performance tracking. Monitor KPIs, budgets, licenses, and operational health.
            </p>
            <div className="mt-10">
              <a
                href="/auth/signin"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center">
                <BarChart3Icon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">Real-time Dashboards</h3>
              <p className="mt-2 text-muted-foreground">
                Visual representations of structured data with charts, graphs, and trend analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <ShieldIcon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">Compliance Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Centralized oversight of regulatory compliance, licenses, and safety standards.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <TrendingUpIcon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">Performance Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor project progress, budget utilization, and operational KPIs.
              </p>
            </div>
          </div>

          {/* Key Modules */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">
              Key Modules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Project Status Tracker",
                "CAPEX vs Budget Tracker", 
                "Contractor Performance Metrics",
                "Energy Output Viewer",
                "Plant Availability",
                "Load Dispatch Compliance",
                "Outage History",
                "Maintenance Schedule Tracker",
                "License Status",
                "Regulatory Filings",
                "HSE Compliance",
                "Executive Summary",
                "Offtaker Performance"
              ].map((module) => (
                <div key={module} className="bg-card p-6 rounded-lg shadow-sm border border-border">
                  <h4 className="font-medium text-foreground">{module}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 NovaCore. Central regulatory body oversight system.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
