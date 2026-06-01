import type { Location, Rarity } from '../types'
import locationsRaw from './locations.json'
import mineralsRaw from './minerals.json'

const minerals = mineralsRaw as Record<string, Rarity>

const locations: Location[] = locationsRaw.map(location => ({
  id: location.id,
  name: location.name,
  group: location.group as Location['group'],
  deposits: location.deposits.map(deposit => ({
    id: deposit.id,
    name: deposit.name,
    minerals: deposit.minerals.map(name => ({
      name,
      rarity: minerals[name],
    })),
  })),
}))

export default locations
