import { createTheme, MantineColorsTuple } from '@mantine/core'

const myColor: MantineColorsTuple = [
  '#f6eeff',
  '#e7d9f7',
  '#cab1ea',
  '#ad86dd',
  '#9462d2',
  '#854bcb',
  '#7d3fc9',
  '#6b31b2',
  '#5f2ba0',
  '#52238d'
];

export const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
  fontFamily: 'system-ui, sans-serif',
  scale: 1,
  autoContrast: true,
  defaultRadius: 'sm',

  components: {
    Container: {
      defaultProps: {
        size: 'lg',
      },
    },
    Drawer: {
      defaultProps: {
        size: 'xs',
        padding: 'md',
      },
    },
    ActionIcon: {
      defaultProps: {
        variant: 'default',
        size: 'lg',
      },
    },
    Text: {
      defaultProps: {
        c: 'text',
      },
    },
    Badge: {
      defaultProps: {
        variant: 'light',
      }
    },
    AppShell: {
      defaultProps: {
        padding: 0,
        header: { height: 60 },
      },
    },
  },
})
