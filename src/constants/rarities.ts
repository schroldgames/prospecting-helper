import type { Rarity } from '../types'

export const RarityOrder: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Exotic']

export const RarityColors: Record<Rarity, string> = {
  Common:    'gray',
  Uncommon:  'green',
  Rare:      'blue',
  Epic:      'violet',
  Legendary: 'yellow',
  Mythic:    'pink',
  Exotic:    'red',
}

export const RarityGradients: Record<Rarity, string> = {
  Common:    'linear-gradient(90deg,#919191,#cccccc,#919191)',
  Uncommon:  'linear-gradient(90deg,#05b302,#1fd13a,#05b302)',
  Rare:      'linear-gradient(90deg,#0062c4,#0059ff,#0062c4)',
  Epic:      'linear-gradient(90deg,#a100c2,#b11ae8,#a100c2)',
  Legendary: 'linear-gradient(90deg,#e66300,#FFFF00,#e66300)',
  Mythic:    'linear-gradient(90deg,#81008a,#cf0064,#81008a)',
  Exotic:    'linear-gradient(90deg,#d60059,#ff0011,#d60059)',
}
