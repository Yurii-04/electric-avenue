import { mainShadow } from '~/styles/app-theme';
import palette from '~/styles/app-theme/app.pallete';

const alignItemsCenter = {
  display: 'flex',
  alignItems: 'center',
} as const;

export const styles = {
  header: {
    marginY: '15px',
    backgroundColor: palette.basic.white,
    color: palette.basic.black,
    borderRadius: '15px',
    height: '50px',
    boxShadow: mainShadow,
    ...alignItemsCenter,
    flexDirection: 'row',
    '& .MuiToolbar-root': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      '& div': {
        height: '32px',
      },
    },
  },
  leftSection: {
    ...alignItemsCenter,
    '& img': {
      width: '120px',
      marginRight: { md: '20px' },
      cursor: 'pointer',
    },
  },
  centerSection: {
    width: { xs: '90%', sm: '55%' },
    marginLeft: '10px',
    '& > div': {
      width: '100%',
    },
  },
  lastSection: {
    ...alignItemsCenter,
    justifyContent: 'center',
  },
  iconsWrapper: {
    ...alignItemsCenter,
    gap: '20px',
    marginX: '15px',
    '& MuiSvgIcon-root': {
      cursor: 'pointer',
    },
  },
  profileIcon: {
    ...alignItemsCenter,
    justifyContent: 'center',
  },
} as const;
