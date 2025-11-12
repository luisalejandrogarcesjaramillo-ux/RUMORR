import { useCallback } from 'react';
import { useExperienceState } from './useExperienceState';

interface AnalyticsEvent {
  event: string;
  projectId?: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export function useAnalytics() {
  const currentProjectId = useExperienceState((state) => state.currentProjectId);

  const trackEvent = useCallback(
    (event: string, data?: Record<string, unknown>) => {
      const analyticsEvent: AnalyticsEvent = {
        event,
        projectId: currentProjectId || 'unknown',
        timestamp: Date.now(),
        data,
      };

      // Apunta al endpoint correcto para registrar eventos y leads.
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analyticsEvent),
      }).catch((error) => {
        console.error('Analytics error:', error);
      });
    },
    [currentProjectId]
  );

  return { trackEvent };
}
