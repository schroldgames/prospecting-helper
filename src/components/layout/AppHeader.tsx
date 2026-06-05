import { Burger, Group, Popover, Stack, Switch, Text, Title, rem } from '@mantine/core'
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSettings, IconSun, IconTextSize } from '@tabler/icons-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderButton from '../common/HeaderButton'
import { useScale } from '../../hooks/useScale'
import { useIsMobile } from '../../hooks/useIsMobile'

interface AppHeaderProps {
  navOpened?: boolean
  onToggleNav?: () => void
}

export default function AppHeader({ navOpened, onToggleNav }: AppHeaderProps) {
  const { setColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme('dark')
  const isDark = colorScheme === 'dark'
  const { scale, cycleScale } = useScale()
  const isMobile = useIsMobile()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [titleVisible, setTitleVisible] = useState(true)

  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setTitleVisible(el.scrollWidth <= el.offsetWidth)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <Group px="md" style={{ width: '100%' }} justify="space-between" wrap="nowrap">
      <Group gap="sm" wrap="nowrap" style={{ minWidth: 0, overflow: 'hidden' }}>
        {onToggleNav && (
          <Burger opened={isMobile && (navOpened ?? false)} onClick={onToggleNav} size="sm" />
        )}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
          <img src="/icon.svg" alt="" aria-hidden="true" style={{ height: rem(32), width: rem(32) }} />
        </Link>
        <Title ref={titleRef} order={4} style={{ lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', minWidth: 0, visibility: titleVisible ? 'visible' : 'hidden' }}>Prospecting Helper</Title>
      </Group>

      <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
        <Popover position="bottom-end" shadow="md">
          <Popover.Target>
            <HeaderButton aria-label="Settings">
              <IconSettings style={{ width: rem(18), height: rem(18) }} />
            </HeaderButton>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack gap="sm">
              <Group gap="sm" justify="space-between" style={{ cursor: 'pointer' }} onClick={() => setColorScheme(isDark ? 'light' : 'dark')}>
                <Group gap="xs">
                  {isDark ? <IconMoon style={{ width: rem(18), height: rem(18) }} /> : <IconSun style={{ width: rem(18), height: rem(18) }} />}
                  <Text size="sm">{isDark ? 'Dark mode' : 'Light mode'}</Text>
                </Group>
                <Switch
                  checked={isDark}
                  onChange={() => {}}
                  aria-label="Toggle color scheme"
                  style={{ pointerEvents: 'none' }}
                  styles={{ thumb: { transition: 'none' }, track: { transition: 'none' } }}
                />
              </Group>
              <Group gap="sm" justify="space-between" style={{ cursor: 'pointer' }} onClick={cycleScale}>
                <Text size="sm">Text size ({scale}x)</Text>
                <HeaderButton aria-label="Cycle text size" onClick={e => { e.stopPropagation(); cycleScale() }}>
                  <IconTextSize style={{ width: rem(18), height: rem(18) }} />
                </HeaderButton>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Group>
  )
}
