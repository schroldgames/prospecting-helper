import { Button, Group, Modal, Text } from '@mantine/core'

interface ConfirmModalProps {
  opened: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message?: string
  confirmLabel?: string
  confirmColor?: string
}

export default function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  confirmColor = 'red',
}: ConfirmModalProps) {
  function handleConfirm() {
    onConfirm()
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered size="sm" withCloseButton={false}>
      {message && <Text size="sm" mb="md">{message}</Text>}
      <Group justify="flex-end" gap="xs">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button color={confirmColor} onClick={handleConfirm}>{confirmLabel}</Button>
      </Group>
    </Modal>
  )
}
