import { styled } from '@mui/system';
import { Menu } from '@mui/material';

export const CustomMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    elevation: 3,
    overflow: 'visible',
    marginTop: theme.spacing(1.5),
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: theme.palette.background.paper,
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}));