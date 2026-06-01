import { useState, useEffect } from 'react'
import type { Records } from '../types'
import locations from '../data/index'

const STORAGE_KEY = 'prospecting-helper-session'
const DEFAULT_LOCATION_ID = 'rubble-creek'
const DEFAULT_DEPOSIT_ID = 'rubble-creek-sands'

type StoredSession = {
  locationId?: string
  depositId?: string
  records?: Record<string, string[]>
  voidMinerals?: string[]
}

type Session = {
  locationId: string
  depositId: string
  records: Records
  voidMinerals: string[]
}

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredSession
    const records: Records = Object.fromEntries(
      Object.entries(parsed.records ?? {}).map(([k, v]) => [k, new Set(v)])
    )
    return {
      locationId: parsed.locationId ?? DEFAULT_LOCATION_ID,
      depositId: parsed.depositId ?? DEFAULT_DEPOSIT_ID,
      records,
      voidMinerals: parsed.voidMinerals ?? [],
    }
  } catch {
    return null
  }
}

function saveSession(locationId: string, depositId: string, records: Records, voidMinerals: string[]): void {
  try {
    const serializedRecords = Object.fromEntries(
      Object.entries(records).map(([k, v]) => [k, [...v]])
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      locationId,
      depositId,
      records: serializedRecords,
      voidMinerals,
    }))
  } catch {
    // localStorage unavailable (private browsing quota, etc.) — fail silently
  }
}

function resolveIds(savedLocationId: string, savedDepositId: string): { locationId: string; depositId: string } {
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
  const [records, setRecords] = useState<Records>(saved?.records ?? {})
  const [voidMinerals, setVoidMinerals] = useState<string[]>(saved?.voidMinerals ?? [])

  useEffect(() => {
    saveSession(locationId, depositId, records, voidMinerals)
  }, [locationId, depositId, records, voidMinerals])

  return { locationId, setLocationId, depositId, setDepositId, records, setRecords, voidMinerals, setVoidMinerals }
}
