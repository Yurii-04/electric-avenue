import { checkboxClasses } from '@mui/material/Checkbox'
import palette from './app.pallete.ts'

export const checkbox = {
  styleOverrides: {
    root: {
      color: palette.primary[300],
      [`&.${checkboxClasses.checked}`]: {
        color: palette.primary[700]
      }
    }
  }
}
