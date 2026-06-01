import { ActionIcon, Group, Select, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEraser } from '@tabler/icons-react'
import type { ComboboxLikeRenderOptionInput, ComboboxItem } from '@mantine/core'
import mineralsRaw from '../../data/minerals.json'
import { RarityColors } from '../../constants/rarities'
import { sortByRarity } from '../../utils/minerals'
import ConfirmModal from '../common/ConfirmModal'
import type { Rarity } from '../../types'

const minerals = mineralsRaw as Record<string, Rarity>

interface MineralOption {
  value: string
  label: string
  rarity: Rarity
}

const ALL_MINERAL_OPTIONS: MineralOption[] = sortByRarity(
  Object.entries(minerals).map(([name, rarity]) => ({ value: name, label: name, rarity })),
  m => m.rarity,
  m => m.label,
)

interface VoidMineralInputProps {
  voidMinerals: string[]
  baseNames: string[]
  onAdd: (name: string) => void
  onClear: () => void
}

function RarityDot({ rarity }: { rarity: Rarity }) {
  const color = RarityColors[rarity]
  return (
    <div style={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: `var(--mantine-color-${color}-5)`,
      flexShrink: 0,
    }} />
  )
}

function renderOption({ option }: ComboboxLikeRenderOptionInput<ComboboxItem>) {
  const { label, rarity } = option as MineralOption
  return (
    <Group justify="space-between" style={{ width: '100%' }} wrap="nowrap">
      <Text size="sm">{label}</Text>
      <RarityDot rarity={rarity} />
    </Group>
  )
}

export default function VoidMineralInput({ voidMinerals, baseNames, onAdd, onClear }: VoidMineralInputProps) {
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false)

  const existingNames = new Set([...baseNames, ...voidMinerals])
  const options = ALL_MINERAL_OPTIONS.filter(m => !existingNames.has(m.value))

  function handleChange(name: string | null) {
    if (!name) return
    onAdd(name)
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

  return (
    <>
      <ConfirmModal
        opened={confirmOpened}
        onClose={closeConfirm}
        onConfirm={onClear}
        title="Remove added minerals"
        message="This will remove all minerals you've added to The Void."
      />
      <Group mb="sm" gap="xs">
        <Select
          placeholder="Add a mineral..."
          data={options}
          value={null}
          onChange={handleChange}
          searchable
          clearable
          renderOption={renderOption}
          style={{ flex: 1 }}
        />
        <ActionIcon
          variant="subtle"
          color="red"
          disabled={voidMinerals.length === 0}
          onClick={openConfirm}
          aria-label="Clear added minerals"
        >
          <IconEraser />
        </ActionIcon>
      </Group>
    </>
  )
}
