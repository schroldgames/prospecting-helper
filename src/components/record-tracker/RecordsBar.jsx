import { ActionIcon, Badge, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowBackUp } from '@tabler/icons-react'
import RecordsModal from './RecordsModal'
import ConfirmModal from '../common/ConfirmModal'

export default function RecordsBar({ records, minerals, onClear, onUnrecord }) {
  const [recordsOpened, { open: openRecords, close: closeRecords }] = useDisclosure(false)
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false)

  return (
    <>
      <RecordsModal opened={recordsOpened} onClose={closeRecords} onConfirm={onUnrecord} records={records} minerals={minerals} />
      <ConfirmModal
        opened={confirmOpened}
        onClose={closeConfirm}
        onConfirm={onClear}
        title="Reset all records"
        message="This will reset all currently recorded minerals for this deposit."
      />

      <Group gap="xs" justify="space-between" wrap="nowrap">
        <Badge size="lg" variant="dot" color="yellow" style={{ cursor: 'pointer', fontSize: 'var(--mantine-font-size-xs)' }} onClick={openRecords}>
          {[...records].length} new records
        </Badge>
        <ActionIcon variant="subtle" color="red" aria-label="Clear records" onClick={openConfirm}>
          <IconArrowBackUp />
        </ActionIcon>
      </Group>
    </>
  )
}
