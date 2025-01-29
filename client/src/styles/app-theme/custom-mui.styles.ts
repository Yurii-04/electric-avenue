import { createTheme } from '@mui/material';
import { appTypography, button, checkbox, menuItem, svgIcon, textField } from './index.ts';
import palette from './app.pallete.ts';
import tooltip from './app.tooltip.ts';

export const theme = createTheme({
  typography: appTypography,
  palette,
  components: {
    MuiButton: button,
    MuiCheckbox: checkbox,
    MuiMenuItem: menuItem,
    MuiSvgIcon: svgIcon,
    MuiTextField: textField,
    MuiTooltip: tooltip,
  },
});
