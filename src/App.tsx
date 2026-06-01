import { AppShell, Box, Container, Paper, ScrollArea, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AppHeader from './components/layout/AppHeader'
import AppNavbar, { navbarConfig } from './components/layout/AppNavbar'
import RecordTrackerToolbar from './components/record-tracker/RecordTrackerToolbar'
import MineralGrid from './components/record-tracker/MineralGrid'
import RecordsBar from './components/record-tracker/RecordsBar'
import VoidMineralInput from './components/record-tracker/VoidMineralInput'
import { usePersistedState } from './hooks/usePersistedState'
import { useIsMobile } from './hooks/useIsMobile'
import { useSwipe } from './hooks/useSwipe'
import locations from './data/index'
import mineralsData from './data/minerals.json'
import type { Location, Deposit, RawLocation, Rarity, Records } from './types'

const minerals = mineralsData as Record<string, Rarity>

function findLocation(id: string): Location | null {
  return locations.find(l => l.id === id) ?? null
}
function findDeposit(loc: Location | null, id: string): Deposit | null {
  return loc?.deposits.find(d => d.id === id) ?? null
}

export default function App() {
  const isMobile = useIsMobile()
  const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure(false)
  const { locationId, setLocationId, depositId, setDepositId, records, setRecords, voidMinerals, setVoidMinerals } = usePersistedState()

  const selectedLocation = findLocation(locationId)
  const selectedDeposit = findDeposit(selectedLocation, depositId)

  function selectLocation(loc: RawLocation) {
    setLocationId(loc.id)
    setDepositId(loc.deposits[0].id)
    if (isMobile) closeNav()
  }

  function toggleRecord(mineralName: string) {
    if (!selectedDeposit) return
    const id = selectedDeposit.id
    setRecords((prev: Records) => {
      const current = new Set(prev[id] ?? [])
      if (current.has(mineralName)) { current.delete(mineralName) } else { current.add(mineralName) }
      return { ...prev, [id]: current }
    })
  }

  function clearDepositRecords() {
    if (!selectedDeposit) return
    const id = selectedDeposit.id
    setRecords((prev: Records) => ({ ...prev, [id]: new Set() }))
  }

  function addVoidMineral(name: string) {
    setVoidMinerals(prev => [...prev, name])
  }

  function clearVoidMinerals() {
    setRecords((prev: Records) => {
      const current = new Set(prev['the-void-digsite'] ?? [])
      voidMinerals.forEach(name => current.delete(name))
      return { ...prev, 'the-void-digsite': current }
    })
    setVoidMinerals([])
  }

  function unrecordMinerals(names: Set<string>) {
    if (!selectedDeposit) return
    const id = selectedDeposit.id
    setRecords((prev: Records) => {
      const current = new Set(prev[id] ?? [])
      names.forEach(name => current.delete(name))
      return { ...prev, [id]: current }
    })
  }

  const depositRecords: Set<string> = selectedDeposit ? (records[selectedDeposit.id] ?? new Set()) : new Set()

  const isVoid = selectedLocation?.id === 'the-void'
  const displayedMinerals = isVoid
    ? [
        ...(selectedDeposit?.minerals ?? []),
        ...voidMinerals.map(name => ({ name, rarity: minerals[name] })),
      ]
    : selectedDeposit?.minerals ?? []
  const baseNames = selectedDeposit?.minerals.map(m => m.name) ?? []

  const deposits = selectedLocation?.deposits ?? []
  const depositIndex = deposits.findIndex(d => d.id === selectedDeposit?.id)
  const swipeHandlers = useSwipe({
    onSwipeLeft:  depositIndex < deposits.length - 1 ? () => setDepositId(deposits[depositIndex + 1].id) : undefined,
    onSwipeRight: depositIndex > 0                   ? () => setDepositId(deposits[depositIndex - 1].id) : undefined,
  })

  return (
    <AppShell
      navbar={{ ...navbarConfig, collapsed: { mobile: !navOpened, desktop: !navOpened } }}
    >
      <AppShell.Header withBorder style={{ display: 'flex', alignItems: 'center' }}>
        <AppHeader navOpened={navOpened} onToggleNav={toggleNav} />
      </AppShell.Header>

      <AppNavbar
        selectedLocationId={selectedLocation?.id}
        onSelectLocation={selectLocation}
      />

      <AppShell.Main
        style={{
          height: '100dvh',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <RecordTrackerToolbar
          locationId={selectedLocation?.id}
          deposits={selectedLocation?.deposits}
          selectedDepositId={selectedDeposit?.id}
          onSelectDeposit={dep => setDepositId(dep.id)}
        />

        <Box style={{ flex: 1, minHeight: 0, overflow: 'auto' }} {...swipeHandlers}>
          <Container size="md" py="lg" style={{ height: '100%' }}>
            <Stack gap="lg" style={{ height: '100%' }}>
              <Paper withBorder shadow="xl" p="md" bg="var(--mantine-color-default)" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                {isVoid && (
                  <VoidMineralInput
                    voidMinerals={voidMinerals}
                    baseNames={baseNames}
                    onAdd={addVoidMineral}
                    onClear={clearVoidMinerals}
                  />
                )}
                <ScrollArea style={{ flex: 1 }} scrollbars="y" scrollbarSize={6} styles={{ thumb: { opacity: 0.4 } }}>
                  <Box px="xs">
                    <MineralGrid
                      minerals={displayedMinerals}
                      records={depositRecords}
                      onToggle={toggleRecord}
                    />
                  </Box>
                </ScrollArea>
              </Paper>

              {depositRecords.size > 0 && (
                <RecordsBar records={depositRecords} minerals={displayedMinerals} onClear={clearDepositRecords} onUnrecord={unrecordMinerals} />
              )}
            </Stack>
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
