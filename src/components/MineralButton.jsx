import { Button } from '@mantine/core'
import { useComputedColorScheme } from '@mantine/core'
import { RarityGradients } from '../constants/rarities'

function gradientAtOpacity(gradient, opacity) {
  return gradient.replace(/#([0-9a-fA-F]{6})/gi, (_, hex) => {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r},${g},${b},${opacity})`
  })
}

export default function MineralButton({ name, rarity, flagged, onClick }) {
  const isDark = useComputedColorScheme('dark') === 'dark'
  const gradient = RarityGradients[rarity]

  return (
    <Button
      fullWidth
      variant="filled"
      c={isDark ? 'white' : 'black'}
      className="btn-scale"
      onClick={onClick}
      style={{
        background: flagged ? gradient : gradientAtOpacity(gradient, 0.55),
        position: 'relative',
      }}
    >
      {name}
      {flagged && (
        <span style={{
          position: 'absolute',
          top: 4,
          right: 6,
          fontSize: '0.75em',
          lineHeight: 1,
          pointerEvents: 'none',
        }}>★</span>
      )}
    </Button>
  )
}
