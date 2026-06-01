export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Exotic'

export type LocationGroupLabel = 'Regular' | 'Special' | 'Limited Time'

export interface Mineral {
  name: string
  rarity: Rarity
}

export interface Deposit {
  id: string
  name: string
  minerals: Mineral[]
}

export interface Location {
  id: string
  name: string
  group: LocationGroupLabel
  deposits: Deposit[]
}


export type Records = Record<string, Set<string>>
