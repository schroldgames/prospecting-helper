import { useRef, useCallback } from 'react'

const THRESHOLD = 50

export function useSwipe({ onSwipeLeft, onSwipeRight }) {
  const startX = useRef(null)

  const onTouchStart = useCallback(e => {
    startX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback(e => {
    if (startX.current === null) return
    const delta = e.changedTouches[0].clientX - startX.current
    startX.current = null
    if (delta < -THRESHOLD) onSwipeLeft?.()
    else if (delta > THRESHOLD) onSwipeRight?.()
  }, [onSwipeLeft, onSwipeRight])

  return { onTouchStart, onTouchEnd }
}
