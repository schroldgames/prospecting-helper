import { ActionIcon, Badge, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowBackUp } from '@tabler/icons-react'
import RecordsModal from './RecordsModal'

export default function RecordsBar({ records, minerals, onClear, onUnflag }) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <RecordsModal opened={opened} onClose={close} onConfirm={onUnflag} records={records} minerals={minerals} />

      <Group gap="xs" justify="space-between" wrap="nowrap">
        <Badge size="lg" variant="dot" color="yellow" style={{ cursor: 'pointer', fontSize: 'var(--mantine-font-size-xs)' }} onClick={open}>
          {[...records].length} new records
        </Badge>
        <ActionIcon variant="subtle" color="red" aria-label="Clear records" onClick={onClear}>
          <IconArrowBackUp />
        </ActionIcon>
      </Group>
    </>
  )
}
