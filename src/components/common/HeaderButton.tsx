import { ActionIcon } from '@mantine/core'
import type { ActionIconProps } from '@mantine/core'
import type { ButtonHTMLAttributes } from 'react'

type HeaderButtonProps = ActionIconProps & ButtonHTMLAttributes<HTMLButtonElement>

export default function HeaderButton({ children, ...props }: HeaderButtonProps) {
  return (
    <ActionIcon variant="subtle" color="gray" {...props}>
      {children}
    </ActionIcon>
  )
}
