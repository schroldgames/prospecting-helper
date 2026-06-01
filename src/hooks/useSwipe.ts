import { useRef, useCallback } from 'react'
import type React from 'react'

const THRESHOLD = 50

interface UseSwipeOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: UseSwipeOptions) {
  const startX = useRef<number | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (startX.current === null) return
    const delta = e.changedTouches[0].clientX - startX.current
    startX.current = null
    if (delta < -THRESHOLD) onSwipeLeft?.()
    else if (delta > THRESHOLD) onSwipeRight?.()
  }, [onSwipeLeft, onSwipeRight])

  return { onTouchStart, onTouchEnd }
}
