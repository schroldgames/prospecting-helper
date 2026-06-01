import { Drawer, Stack, Text } from '@mantine/core'
import locations from '../../data/index'
import LocationGroup from './LocationGroup'
import type { Location } from '../../types'

interface LocationDrawerProps {
  opened: boolean
  onClose: () => void
  selectedLocationId: string | undefined
  onSelectLocation: (location: Location) => void
}

export default function LocationDrawer({ opened, onClose, selectedLocationId, onSelectLocation }: LocationDrawerProps) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={<Text fw={600}>Select Location</Text>}
    >
      <Stack gap="lg">
        {(['Regular', 'Limited Time'] as const).map(group => (
          <LocationGroup
            key={group}
            group={group}
            locations={locations.filter(l => l.group === group)}
            selectedLocationId={selectedLocationId}
            onSelectLocation={onSelectLocation}
          />
        ))}
      </Stack>
    </Drawer>
  )
}
