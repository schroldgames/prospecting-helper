import { Button, Checkbox, Group, Modal, Stack, Text, UnstyledButton } from '@mantine/core'
import { useState } from 'react'
import { IconStarFilled } from '@tabler/icons-react'
import { RarityColors } from '../../constants/rarities'
import { sortByRarity } from '../../utils/minerals'
import type { Mineral, Rarity } from '../../types'

interface RecordsModalProps {
  opened: boolean
  onClose: () => void
  onConfirm: (names: Set<string>) => void
  records: Set<string>
  minerals: Mineral[]
}

function StarIcon({ className }: { className: string; indeterminate?: boolean }) {
  return <IconStarFilled className={className} />
}

export default function RecordsModal({ opened, onClose, onConfirm, records, minerals }: RecordsModalProps) {
  const [favorited, setFavorited] = useState<Set<string>>(new Set())

  const rarityByName: Record<string, Rarity> = Object.fromEntries(minerals.map(m => [m.name, m.rarity]))
  const sorted = sortByRarity([...records], name => rarityByName[name] ?? 'Common')

  function toggleFavorite(name: string) {
    setFavorited(prev => {
      const next = new Set(prev)
      if (next.has(name)) { next.delete(name) } else { next.add(name) }
      return next
    })
  }

  function handleClose() {
    setFavorited(new Set())
    onClose()
  }

  const allSelected = sorted.length > 0 && sorted.every(name => favorited.has(name))

  function toggleAll() {
    setFavorited(allSelected ? new Set() : new Set(sorted))
  }

  function handleConfirm() {
    onConfirm(favorited)
    setFavorited(new Set())
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      withCloseButton={false}
      overlayProps={{ blur: 4 }}
    >
      <Stack gap="xs">
        <Group justify="flex-end">
          <Button variant="light" size="xs" color="gray" px={4} onClick={toggleAll}>
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>
        </Group>
        <Stack gap={4}>
          {sorted.map(name => (
            <UnstyledButton key={name} w="100%" onClick={() => toggleFavorite(name)}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="sm" c={RarityColors[rarityByName[name] ?? 'Common']}>{name}</Text>
                <Checkbox
                  checked={favorited.has(name)}
                  onChange={() => { }}
                  aria-label={`Mark ${name} as favorited`}
                  icon={StarIcon}
                  color="yellow"
                  styles={{ input: { cursor: 'pointer' } }}
                />
              </Group>
            </UnstyledButton>
          ))}
        </Stack>

        <Group mt="sm" justify="flex-end">
          <Button className="btn-scale" onClick={handleConfirm}>
            Mark as Favorited
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
