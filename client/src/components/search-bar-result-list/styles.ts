import { commonShadow } from '~/styles/app-theme';
import { appScrollbar } from '~/styles/app-theme/app.scrollbar';
import { textClampStyle } from '~/styles/common-styles/common-styles';

export const styles = {
  resultsList: {
    boxSizing: 'border-box',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow,
    ...appScrollbar,
    overflowY: 'auto',
    position: 'absolute',
    zIndex: '100',
    marginTop: '2px',
    maxHeight: '300px',
    paddingX: '15px',
    borderRadius: '5px',
    width: '100%',
    '& .MuiTypography-body1': {
      ...textClampStyle,
    },
  },
};