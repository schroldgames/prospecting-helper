import { RarityOrder } from '../constants/rarities'

export function sortByRarity<T>(
  items: T[],
  getRarity: (item: T) => string,
  getLabel?: (item: T) => string,
): T[] {
  return [...items].sort((a, b) => {
    const rarityDiff =
      (RarityOrder as string[]).indexOf(getRarity(a)) -
      (RarityOrder as string[]).indexOf(getRarity(b))
    if (rarityDiff !== 0) return rarityDiff
    return getLabel ? getLabel(a).localeCompare(getLabel(b)) : 0
  })
}
