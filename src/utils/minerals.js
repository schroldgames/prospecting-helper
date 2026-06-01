import { RarityOrder } from '../constants/rarities'

export function sortByRarity(items, getRarity, getLabel = null) {
  return [...items].sort((a, b) => {
    const rarityDiff = RarityOrder.indexOf(getRarity(a)) - RarityOrder.indexOf(getRarity(b))
    if (rarityDiff !== 0) return rarityDiff
    return getLabel ? getLabel(a).localeCompare(getLabel(b)) : 0
  })
}
