// src/types/index.ts
// Single source of truth for all data contracts

export interface Lead {
  id?: string // ID único del lead (generado en backend)
  email: string
  name: string
  anonId: string
  timestamp?: string // ISO 8601 string
  utm_source?: string
  utm_medium?: string
  clicks?: number
  timeOnScene?: number
}

export interface InteractionEvent {
  anonId: string
  eventType: 'hover' | 'click' | 'form_submit'
  timestamp: number
  metadata?: { [key: string]: any }
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}
