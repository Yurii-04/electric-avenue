import { createTheme } from '@mui/material';
import { appTypography, button, checkbox, menuItem, svgIcon, textField } from './index';
import palette from './app.pallete';
import tooltip from './app.tooltip';

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
