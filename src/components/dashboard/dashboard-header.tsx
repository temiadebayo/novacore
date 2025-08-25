"use client"

import { BellIcon, SearchIcon } from "@/components/ui/icons"
// import { ThemeToggle } from "@/components/ui/theme-toggle"

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Temporarily disabled for demo */}
          {/* <ThemeToggle /> */}
          
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">A</span>
            </div>
            <span className="text-sm font-medium text-foreground">Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
} 