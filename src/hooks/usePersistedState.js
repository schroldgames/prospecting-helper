import { useState, useEffect } from 'react'

const STORAGE_KEY = 'prospecting-helper-session'

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Rehydrate records: { depositId: string[] } → { depositId: Set }
    const records = Object.fromEntries(
      Object.entries(parsed.records ?? {}).map(([k, v]) => [k, new Set(v)])
    )
    return { ...parsed, records }
  } catch {
    return null
  }
}

function saveSession(locationId, depositId, records) {
  try {
    // Serialize records: { depositId: Set } → { depositId: string[] }
    const serializedRecords = Object.fromEntries(
      Object.entries(records).map(([k, v]) => [k, [...v]])
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      locationId,
      depositId,
      records: serializedRecords,
    }))
  } catch {
    // localStorage unavailable (private browsing quota, etc.) — fail silently
  }
}

export function usePersistedState() {
  const saved = loadSession()

  const [locationId, setLocationId] = useState(saved?.locationId ?? null)
  const [depositId, setDepositId] = useState(saved?.depositId ?? null)
  const [records, setRecords] = useState(saved?.records ?? {})

  useEffect(() => {
    saveSession(locationId, depositId, records)
  }, [locationId, depositId, records])

  return { locationId, setLocationId, depositId, setDepositId, records, setRecords }
}
