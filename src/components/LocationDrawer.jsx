import { Drawer, Stack, Text } from '@mantine/core'
import locations from '../data/locations.json'
import LocationGroup from './LocationGroup'

export default function LocationDrawer({ opened, onClose, selectedLocationId, onSelectLocation }) {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={<Text fw={600}>Select Location</Text>}
    >
      <Stack gap="lg">
        {['Regular', 'Limited Time'].map(group => (
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
