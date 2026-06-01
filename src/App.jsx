import { AppShell, Box, Container, Paper, ScrollArea, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AppHeader from './components/layout/AppHeader'
import AppNavbar, { navbarConfig } from './components/layout/AppNavbar'
import RecordTrackerToolbar from './components/record-tracker/RecordTrackerToolbar'
import MineralGrid from './components/record-tracker/MineralGrid'
import RecordsBar from './components/record-tracker/RecordsBar'
import { usePersistedState } from './hooks/usePersistedState'
import { useIsMobile } from './hooks/useIsMobile'
import { useSwipe } from './hooks/useSwipe'
import locations from './data/index.js'
function findLocation(id) { return locations.find(l => l.id === id) ?? null }
function findDeposit(loc, id) { return loc?.deposits.find(d => d.id === id) ?? null }

export default function App() {
  const isMobile = useIsMobile()
  const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure(false)
  const { locationId, setLocationId, depositId, setDepositId, records, setRecords } = usePersistedState()

  const selectedLocation = findLocation(locationId)
  const selectedDeposit = findDeposit(selectedLocation, depositId)

  function selectLocation(loc) {
    setLocationId(loc.id)
    setDepositId(loc.deposits[0].id)
    setRecords({})
    if (isMobile) closeNav()
  }

  function toggleRecord(mineralName) {
    const id = selectedDeposit.id
    setRecords(prev => {
      const current = new Set(prev[id] ?? [])
      current.has(mineralName) ? current.delete(mineralName) : current.add(mineralName)
      return { ...prev, [id]: current }
    })
  }

  function clearAll() {
    setRecords({})
  }

  function unflagMinerals(names) {
    const id = selectedDeposit.id
    setRecords(prev => {
      const current = new Set(prev[id] ?? [])
      names.forEach(name => current.delete(name))
      return { ...prev, [id]: current }
    })
  }

  const depositRecords = selectedDeposit ? (records[selectedDeposit.id] ?? new Set()) : new Set()

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
              <Paper withBorder shadow="xl" p="md" bg="var(--mantine-color-default)" style={{ flex: 1, minHeight: 0 }}>
                <ScrollArea h="100%" scrollbars="y" scrollbarSize={6} styles={{ thumb: { opacity: 0.4 } }}>
                  <Box px="xs">
                    <MineralGrid
                      minerals={selectedDeposit.minerals}
                      records={depositRecords}
                      onToggle={toggleRecord}
                    />
                  </Box>
                </ScrollArea>
              </Paper>

              {depositRecords.size > 0 && (
                <RecordsBar records={depositRecords} minerals={selectedDeposit.minerals} onClear={clearAll} onUnflag={unflagMinerals} />
              )}
            </Stack>
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
