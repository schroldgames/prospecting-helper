import { useState, useLayoutEffect } from 'react'
import { useIsMobile } from './useIsMobile'

const STORAGE_KEY = 'prospecting-helper-scale'
const SCALE_STEPS = [1, 1.5, 2]

function loadScale(isMobile) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? parseFloat(raw) : (isMobile ? 1.5 : 1)
  } catch {
    return isMobile ? 1.5 : 1
  }
}

export function useScale() {
  const isMobile = useIsMobile()
  const [scale, setScale] = useState(() => loadScale(isMobile))

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--mantine-scale', String(scale))
  }, [scale])

  function cycleScale() {
    setScale(current => {
      const next = SCALE_STEPS[(SCALE_STEPS.indexOf(current) + 1) % SCALE_STEPS.length]
      try { localStorage.setItem(STORAGE_KEY, String(next)) } catch { /* localStorage unavailable */ }
      return next
    })
  }

  return { scale, cycleScale }
}
