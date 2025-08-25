"use client"

import { useSession, signOut } from "next-auth/react"
import { BellIcon, UserIcon, LogOutIcon } from "@/components/ui/icons"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Compliance Oversight Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Welcome back, {session?.user?.name || "User"}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <BellIcon className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">{session?.user?.name}</p>
              <p className="text-muted-foreground capitalize">{session?.user?.role?.toLowerCase()}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Sign out"
            >
              <LogOutIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 