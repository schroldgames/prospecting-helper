import { Burger, Group, Popover, Stack, Switch, Text, Title } from '@mantine/core'
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSettings, IconSun, IconTextSize } from '@tabler/icons-react'
import HeaderButton from './HeaderButton'
import { useScale } from '../hooks/useScale'
import { useIsMobile } from '../hooks/useIsMobile'

export default function AppHeader({ navOpened, onToggleNav }) {
  const { setColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme('dark')
  const isDark = colorScheme === 'dark'
  const { scale, cycleScale } = useScale()
  const isMobile = useIsMobile()

  return (
    <Group px="md" style={{ width: '100%' }} justify="space-between" wrap="nowrap">
      <Group gap="sm" wrap="nowrap">
        <Burger opened={isMobile && navOpened} onClick={onToggleNav} size="sm" />
        <Title order={4} style={{ lineHeight: 1 }}>Prospecting Helper</Title>
      </Group>

      <Group gap="xs" wrap="nowrap">
        <Popover position="bottom-end" shadow="md">
          <Popover.Target>
            <HeaderButton aria-label="Settings">
              <IconSettings />
            </HeaderButton>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack gap="sm">
              <Group gap="sm" justify="space-between">
                <Group gap="xs">
                  {isDark ? <IconMoon /> : <IconSun />}
                  {isDark ? <Text size="sm">Dark mode</Text> : <Text size="sm">Light mode</Text>}
                </Group>
                <Switch
                  checked={isDark}
                  onChange={() => setColorScheme(isDark ? 'light' : 'dark')}
                  aria-label="Toggle color scheme"
                />
              </Group>
              <Group gap="sm" justify="space-between">
                <Text size="sm">Text size ({scale}x)</Text>
                <HeaderButton aria-label="Cycle text size" onClick={cycleScale}>
                  <IconTextSize />
                </HeaderButton>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Group>
  )
}
