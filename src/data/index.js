import locations from './locations.json'
import minerals from './minerals.json'

export default locations.map(location => ({
  ...location,
  deposits: location.deposits.map(deposit => ({
    ...deposit,
    minerals: deposit.minerals.map(name => ({
      name,
      rarity: minerals[name],
    })),
  })),
}))
