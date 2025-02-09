import { SxProps, Theme } from '@mui/material';

export const spliceSx = (
  defaultStyles?: SxProps<Theme>,
  newStyles?: SxProps<Theme>,
) => ({
  ...defaultStyles,
  ...newStyles,
}) as SxProps;