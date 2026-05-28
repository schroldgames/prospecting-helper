import { ActionIcon } from '@mantine/core'

export default function HeaderButton({ children, ...props }) {
  return (
    <ActionIcon variant="subtle" color="gray" {...props}>
      {children}
    </ActionIcon>
  )
}
