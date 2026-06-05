import { Paper, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface AppCardProps {
  icon: ReactNode
  label: string
  to: string
  color?: string
}

export default function AppCard({ icon, label, to, color }: AppCardProps) {
  const navigate = useNavigate()

  return (
    <Paper
      withBorder={!color}
      shadow="sm"
      className="btn-scale"
      onClick={() => navigate(to)}
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--mantine-spacing-xs)',
        cursor: 'pointer',
        willChange: 'transform',
        borderRadius: 'var(--mantine-radius-lg)',
        background: color,
        color: color ? 'white' : undefined,
      }}
    >
      {icon}
      <Text size="md" fw={600} ta="center" c={color ? 'white' : undefined}>{label}</Text>
    </Paper>
  )
}
