import { Box } from '@mantine/core'
import DepositTabs from './DepositTabs'

export default function RecordTrackerToolbar({ locationId, deposits, selectedDepositId, onSelectDeposit }) {
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
