import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function getRiskColor(riskLevel: string): string {
  switch (riskLevel.toLowerCase()) {
    case 'low':
      return 'text-green-400 bg-green-400/20'
    case 'medium':
      return 'text-yellow-400 bg-yellow-400/20'
    case 'high':
      return 'text-orange-400 bg-orange-400/20'
    case 'critical':
      return 'text-red-400 bg-red-400/20'
    default:
      return 'text-muted-foreground bg-muted'
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'approved':
    case 'active':
      return 'text-green-400 bg-green-400/20'
    case 'in_progress':
    case 'submitted':
      return 'text-blue-400 bg-blue-400/20'
    case 'on_hold':
    case 'pending':
      return 'text-yellow-400 bg-yellow-400/20'
    case 'cancelled':
    case 'rejected':
    case 'overdue':
      return 'text-red-400 bg-red-400/20'
    default:
      return 'text-muted-foreground bg-muted'
  }
} 