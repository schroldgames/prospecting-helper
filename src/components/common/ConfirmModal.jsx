import { Button, Group, Modal, Text } from '@mantine/core'

export default function ConfirmModal({ opened, onClose, onConfirm, title, message, confirmLabel = 'Confirm', confirmColor = 'red' }) {
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
