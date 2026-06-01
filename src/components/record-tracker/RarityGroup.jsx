import { Box, Divider, SimpleGrid, Text } from '@mantine/core'
import MineralButton from './MineralButton'

export default function RarityGroup({ rarity, minerals, records, onToggle }) {
  return (
    <Box>
      <Divider
        size="sm"
        my="xs"
        labelPosition='center'
        label={
          <Text size="xs" fw={500} tt="uppercase" c="dimmed">{rarity}</Text>
        }>
      </Divider>

      <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="xs">
        {minerals.map(mineral => (
          <MineralButton
            key={mineral.name}
            name={mineral.name}
            rarity={rarity}
            flagged={records.has(mineral.name)}
            onClick={() => onToggle(mineral.name)}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
