import { Box } from '@mantine/core'
import DepositTabs from './DepositTabs'
import type { Deposit } from '../../types'

interface RecordTrackerToolbarProps {
  locationId: string | undefined
  deposits: Deposit[] | undefined
  selectedDepositId: string | undefined
  onSelectDeposit: (deposit: Deposit) => void
}

export default function RecordTrackerToolbar({ locationId, deposits, selectedDepositId, onSelectDeposit }: RecordTrackerToolbarProps) {
  if (!deposits) return null

  return (
    <Box style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}>
      <DepositTabs
        locationId={locationId}
        deposits={deposits}
        selectedDepositId={selectedDepositId}
        onSelectDeposit={onSelectDeposit}
      />
    </Box>
  )
}
