"use client"

import { useState } from "react"
import { useTheme } from "@/components/providers/theme-provider"
import { MoonIcon, SunIcon, MonitorIcon } from "@/components/ui/icons"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    {
      name: "Light",
      value: "light" as const,
      icon: SunIcon,
    },
    {
      name: "Dark",
      value: "dark" as const,
      icon: MoonIcon,
    },
    {
      name: "System",
      value: "system" as const,
      icon: MonitorIcon,
    },
  ]

  const currentTheme = themes.find((t) => t.value === theme) || themes[2]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Toggle theme"
      >
        <currentTheme.icon className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-40 rounded-md border border-border bg-popover p-1 shadow-md z-50">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value)
                    setIsOpen(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {themeOption.name}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
} 