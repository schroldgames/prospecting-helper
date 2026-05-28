import { Button } from '@mantine/core'
import { LocationGradients } from '../constants/locations'

export default function LocationButton({ location, selected, onClick }) {
  const gradient = LocationGradients[location.id]

  return (
    <Button
      fullWidth
      justify="start"
      variant="default"
      className="btn-scale"
      onClick={onClick}
      style={{
        background: `linear-gradient(var(--mantine-color-default), var(--mantine-color-default)) padding-box, ${gradient} border-box`,
        border: `${selected ? 5 : 2}px solid transparent`,
        color: 'var(--mantine-color-text)',
        fontWeight: selected ? 600 : 400,
      }}
    >
      {location.name}
    </Button>
  )
}
