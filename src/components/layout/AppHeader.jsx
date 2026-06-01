import { Burger, Group, Popover, Stack, Switch, Text, Title } from '@mantine/core'
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSettings, IconSun, IconTextSize } from '@tabler/icons-react'
import HeaderButton from '../common/HeaderButton'
import { useScale } from '../../hooks/useScale'
import { useIsMobile } from '../../hooks/useIsMobile'

export default function AppHeader({ navOpened, onToggleNav }) {
  const { setColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme('dark')
  const isDark = colorScheme === 'dark'
  const { scale, cycleScale } = useScale()
  const isMobile = useIsMobile()

  return (
    <Group px="md" style={{ width: '100%' }} justify="space-between" wrap="nowrap">
      <Group gap="sm" wrap="nowrap" style={{ minWidth: 0, overflow: 'hidden' }}>
        <Burger opened={isMobile && navOpened} onClick={onToggleNav} size="sm" />
        <img src="/icon.svg" alt="" aria-hidden="true" style={{ height: '2rem', width: '2rem', flexShrink: 0 }} />
        <Title order={4} style={{ lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', minWidth: 0 }}>Prospecting Helper</Title>
      </Group>

      <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
        <Popover position="bottom-end" shadow="md">
          <Popover.Target>
            <HeaderButton aria-label="Settings">
              <IconSettings />
            </HeaderButton>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack gap="sm">
              <Group gap="sm" justify="space-between" style={{ cursor: 'pointer' }} onClick={() => setColorScheme(isDark ? 'light' : 'dark')}>
                <Group gap="xs">
                  {isDark ? <IconMoon /> : <IconSun />}
                  <Text size="sm">{isDark ? 'Dark mode' : 'Light mode'}</Text>
                </Group>
                <Switch
                  checked={isDark}
                  onChange={() => setColorScheme(isDark ? 'light' : 'dark')}
                  aria-label="Toggle color scheme"
                  onClick={e => e.stopPropagation()}
                />
              </Group>
              <Group gap="sm" justify="space-between" style={{ cursor: 'pointer' }} onClick={cycleScale}>
                <Text size="sm">Text size ({scale}x)</Text>
                <HeaderButton aria-label="Cycle text size" onClick={e => { e.stopPropagation(); cycleScale() }}>
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
