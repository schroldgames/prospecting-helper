import { AppShell, Box, Container, Divider, Group, HoverCard, Text, Title, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHelp, IconStarFilled } from '@tabler/icons-react'
import AppHeader from '../components/layout/AppHeader'
import AppCard from '../components/home/AppCard'
import HeaderButton from '../components/common/HeaderButton'
import { navbarConfig } from '../components/layout/AppNavbar'

export default function Home() {
  const [navOpened, { toggle: toggleNav }] = useDisclosure(false)

  return (
    <AppShell
      navbar={{ ...navbarConfig, collapsed: { mobile: !navOpened, desktop: !navOpened } }}
    >
      <AppShell.Header withBorder style={{ display: 'flex', alignItems: 'center' }}>
        <AppHeader navOpened={navOpened} onToggleNav={toggleNav} />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section>
          <Divider />
          <Group px="md" py="xs">
            <HoverCard position="right-start" shadow="md" openDelay={200}>
              <HoverCard.Target>
                <HeaderButton aria-label="Help">
                  <IconHelp />
                </HeaderButton>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ maxWidth: 'min(400px, calc(100vw - var(--mantine-spacing-md) * 2))' }}>
                <Text size="sm">Prospecting Helper is a companion app for the game Prospecting! Use it to track record-weight minerals across locations and deposits during your sessions.</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container py="xl">
          <Title order={3} mb={4} ta="center">Tools</Title>
          <Text c="dimmed" size="sm" mb="xl" ta="center">Select a tool to get started.</Text>
          <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--mantine-spacing-md)', width: `min(${rem(296)}, 100%)`, margin: '0 auto' }}>
            <AppCard icon={<IconStarFilled style={{ width: rem(40), height: rem(40) }} />} label="Record Tracker" to="/tracker" color="var(--mantine-color-green-6)" />
          </Box>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
