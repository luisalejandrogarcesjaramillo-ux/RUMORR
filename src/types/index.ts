import { z } from 'zod';

export const LeadSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  name: z.string().min(1, { message: 'Name is required' }),
  anonId: z.string().min(1, { message: 'Anonymous ID is required' }),
});

export type Lead = z.infer<typeof LeadSchema>;

export interface InteractionEvent {
  anonId: string
  eventType: 'hover' | 'click' | 'form_submit'
  timestamp: number
  metadata?: Record<string, unknown>
}

export interface APIResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// Artefacto: core domain model for objects that orbit inside the Templo/Templo UI
export type AuraColor = 'primary' | 'secondary' | 'accent';

export interface Artefacto {
  id: string;
  name: string;
  essay: string;
  globalRelevance: number; // determines scale/brightness in the scene (0-10)
  auraColor: AuraColor;
}

export type Artefactos = Artefacto[];
