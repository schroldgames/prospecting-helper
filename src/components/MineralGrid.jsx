import { Stack } from '@mantine/core'
import { RarityOrder } from '../constants/rarities'
import RarityGroup from './RarityGroup'

export default function MineralGrid({ minerals, records, onToggle }) {
  const mineralsByRarity = RarityOrder.reduce((acc, rarity) => {
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
