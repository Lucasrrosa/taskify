import { MuiTheme } from '@/config/theme/MuiTheme'
import { ThemeProvider } from '@mui/material/styles'
import { type PropsWithChildren } from 'react'

export default function AppThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={MuiTheme}>{children}</ThemeProvider>
}
