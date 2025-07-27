import { createTheme } from '@mui/material'

export const MuiTheme = createTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        variant: 'outlined'
      }
    }
  }
})