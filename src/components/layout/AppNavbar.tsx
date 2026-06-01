import { AppShell } from '@mantine/core'
import LocationNav from '../record-tracker/LocationNav'
import type { Location } from '../../types'

interface AppNavbarProps {
  selectedLocationId: string | undefined
  onSelectLocation: (location: Location) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const navbarConfig = { width: 300, breakpoint: 'sm' }

export default function AppNavbar({ selectedLocationId, onSelectLocation }: AppNavbarProps) {
  return (
    <AppShell.Navbar>
      <LocationNav
        selectedLocationId={selectedLocationId}
        onSelectLocation={onSelectLocation}
      />
    </AppShell.Navbar>
  )
}
