import { ActionIcon, Group, Select, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEraser } from '@tabler/icons-react'
import minerals from '../../data/minerals.json'
import { RarityColors } from '../../constants/rarities'
import { sortByRarity } from '../../utils/minerals'
import ConfirmModal from '../common/ConfirmModal'

const ALL_MINERAL_OPTIONS = sortByRarity(
  Object.entries(minerals).map(([name, rarity]) => ({ value: name, label: name, rarity })),
  m => m.rarity,
  m => m.label,
)

function RarityDot({ rarity }) {
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

function renderOption({ option }) {
  return (
    <Group justify="space-between" style={{ width: '100%' }} wrap="nowrap">
      <Text size="sm">{option.label}</Text>
      <RarityDot rarity={option.rarity} />
    </Group>
  )
}

export default function VoidMineralInput({ voidMinerals, baseNames, onAdd, onClear }) {
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false)

  const existingNames = new Set([...baseNames, ...voidMinerals])
  const options = ALL_MINERAL_OPTIONS.filter(m => !existingNames.has(m.value))

  function handleChange(name) {
    if (!name) return
    onAdd(name)
    document.activeElement?.blur()
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
