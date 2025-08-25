"use client"

// import { SessionProvider } from "next-auth/react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Temporarily disabled for demo purposes
  // return <SessionProvider>{children}</SessionProvider>
  return <>{children}</>
} 