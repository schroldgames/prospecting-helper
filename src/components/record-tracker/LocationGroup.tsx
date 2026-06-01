import { Box, Stack, Text } from '@mantine/core'
import LocationButton from './LocationButton'
import type { Location } from '../../types'

interface LocationGroupProps {
  group: string
  locations: Location[]
  selectedLocationId: string | undefined
  onSelectLocation: (location: Location) => void
}

export default function LocationGroup({ group, locations, selectedLocationId, onSelectLocation }: LocationGroupProps) {
  return (
    <Box>
      <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb="xs">{group}</Text>
      <Stack gap={4}>
        {locations.map(loc => (
          <LocationButton
            key={loc.id}
            location={loc}
            selected={selectedLocationId === loc.id}
            onClick={() => onSelectLocation(loc)}
          />
        ))}
      </Stack>
    </Box>
  )
}
