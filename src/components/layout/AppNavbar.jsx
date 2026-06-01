import { AppShell } from '@mantine/core'
import LocationNav from '../record-tracker/LocationNav'

export const navbarConfig = { width: 300, breakpoint: 'sm' }

export default function AppNavbar({ selectedLocationId, onSelectLocation }) {
  return (
    <AppShell.Navbar>
      <LocationNav
        selectedLocationId={selectedLocationId}
        onSelectLocation={onSelectLocation}
      />
    </AppShell.Navbar>
  )
}
