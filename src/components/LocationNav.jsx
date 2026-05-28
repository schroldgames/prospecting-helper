import { AppShell, Divider, Group, HoverCard, ScrollArea, Stack, Text } from '@mantine/core'
import { IconHelp } from '@tabler/icons-react'
import locations from '../data/locations.json'
import LocationGroup from './LocationGroup'
import HeaderButton from './HeaderButton'

export default function LocationNav({ selectedLocationId, onSelectLocation }) {
  return (
    <>
      <AppShell.Section grow component={ScrollArea}>
        <Stack gap="lg" p="md">
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
      </AppShell.Section>

      <AppShell.Section>
        <Divider />
        <Group px="md" py="xs">
          <HoverCard position="top-start" shadow="md" openDelay={200}>
            <HoverCard.Target>
              <HeaderButton aria-label="Help">
                <IconHelp />
              </HeaderButton>
            </HoverCard.Target>
            <HoverCard.Dropdown style={{ maxWidth: 'min(400px, calc(100vw - var(--mantine-spacing-md) * 2))' }}>
              <Text size="sm">Select minerals to indicate record weights during a prospecting session.
                Remember to mark them as favorites in your inventory so you don't accidentally sell them!</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </AppShell.Section>
    </>
  )
}
