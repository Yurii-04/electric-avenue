import { AlertColor } from '@mui/material';

export type SetAlertProps = {
  severity: AlertColor;
  message: string;
  duration?: number;
}

export type SnackbarContextOutput = {
  setAlert: (options: SetAlertProps) => void
}