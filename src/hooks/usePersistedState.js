import { useState, useEffect } from 'react'
import locations from '../data/index.js'

const STORAGE_KEY = 'prospecting-helper-session'
const DEFAULT_LOCATION_ID = 'rubble-creek'
const DEFAULT_DEPOSIT_ID = 'rubble-creek-sands'

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

function resolveIds(savedLocationId, savedDepositId) {
  const location = locations.find(l => l.id === savedLocationId)
  if (!location) return { locationId: DEFAULT_LOCATION_ID, depositId: DEFAULT_DEPOSIT_ID }
  const deposit = location.deposits.find(d => d.id === savedDepositId)
  return {
    locationId: location.id,
    depositId: deposit ? deposit.id : location.deposits[0].id,
  }
}

export function usePersistedState() {
  const saved = loadSession()
  const { locationId: initialLocationId, depositId: initialDepositId } = resolveIds(
    saved?.locationId ?? DEFAULT_LOCATION_ID,
    saved?.depositId ?? DEFAULT_DEPOSIT_ID,
  )

  const [locationId, setLocationId] = useState(initialLocationId)
  const [depositId, setDepositId] = useState(initialDepositId)
  const [records, setRecords] = useState(saved?.records ?? {})

  useEffect(() => {
    saveSession(locationId, depositId, records)
  }, [locationId, depositId, records])

  return { locationId, setLocationId, depositId, setDepositId, records, setRecords }
}
