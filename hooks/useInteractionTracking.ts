import { useState, useCallback } from 'react'
import { getOrCreateAnonId } from '../lib/useAnonId'
import { API_ENDPOINTS } from '../src/config'

export function useInteractionTracking() {
  const [clickCount, setClickCount] = useState(0)
  const [timeOnScene, setTimeOnScene] = useState(0)
  const anonId = getOrCreateAnonId()

  // Track a click/interaction
  const trackClick = useCallback(() => {
  const newCount = clickCount + 1
  setClickCount(newCount)
  // Aquí podrías enviar el evento a una API de analítica
  }, [clickCount, anonId])

  // Track time on scene (for future use in analytics)
  const trackTimeOnScene = useCallback((seconds: number) => {
  setTimeOnScene(seconds)
  // Aquí podrías registrar el tiempo en una API o analytics
  }, [anonId])

  return {
    clickCount,
    timeOnScene,
    anonId,
    trackClick,
    trackTimeOnScene,
  }
}
