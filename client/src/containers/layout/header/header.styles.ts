import { mainShadow } from '~/styles/app-theme';
import { commonStyles } from '~/styles/common-styles/common-styles';

export const styles = {
  header: {
    marginY: '10px',
    backgroundColor: 'basic.white',
    color: 'basic.black',
    borderRadius: '15px',
    height: '50px',
    boxShadow: mainShadow,
    position: 'static',
    ...commonStyles.alignItemsCenter,
    flexDirection: 'row',
    '& .MuiToolbar-root': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      '& > div': {
        height: '32px',
      },
    },
  },
  leftSection: {
    ...commonStyles.alignItemsCenter,
    '& img': {
      width: '120px',
      marginRight: { md: '20px' },
      display: {xs: 'none', md: 'inline-block'},
    },
  },
  centerSection: {
    width: { xs: '90%', sm: '55%' },
    marginLeft: '10px',
    position: 'relative',
    '& > div': {
      width: '100%',
    },
  },
  lastSection: {
    ...commonStyles.alignItemsCenter,
    display: {xs: 'none', sm: 'flex'},
    justifyContent: 'center',
  },
  iconsWrapper: {
    ...commonStyles.alignItemsCenter,
    gap: '20px',
    marginX: '15px',
    '& MuiSvgIcon-root': {
      cursor: 'pointer',
    },
  },
  profileIcon: {
    ...commonStyles.alignItemsCenter,
    justifyContent: 'center',
  },
} as const;
