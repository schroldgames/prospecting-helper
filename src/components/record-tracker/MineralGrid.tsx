import { Stack } from '@mantine/core'
import { RarityOrder } from '../../constants/rarities'
import RarityGroup from './RarityGroup'
import type { Mineral, Rarity } from '../../types'

interface MineralGridProps {
  minerals: Mineral[]
  records: Set<string>
  onToggle: (name: string) => void
}

export default function MineralGrid({ minerals, records, onToggle }: MineralGridProps) {
  const mineralsByRarity = RarityOrder.reduce<{ rarity: Rarity; minerals: Mineral[] }[]>((acc, rarity) => {
    const group = minerals.filter(m => m.rarity === rarity)
    if (group.length) acc.push({ rarity, minerals: group })
    return acc
  }, [])

  return (
    <Stack gap="md">
      {mineralsByRarity.map(({ rarity, minerals: group }) => (
        <RarityGroup
          key={rarity}
          rarity={rarity}
          minerals={group}
          records={records}
          onToggle={onToggle}
        />
      ))}
    </Stack>
  )
}
