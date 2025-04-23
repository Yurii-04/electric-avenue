import { theme } from '~/styles/app-theme';
import { borderDivider, textClampStyle } from '~/styles/common-styles/common-styles';

export const styles = {
  card: {
    maxWidth: '500px',
    backgroundColor: '#fff',
    ...borderDivider,
    cursor: 'pointer',
    transition: '.3s',
    p: 2,
    '&:focus, &:hover': {
      border: '1px solid',
      outline: 'none',
      borderColor: 'basic.turquoise',
    },
  },
  image: {
    width: '100%',
    height: { xs: '210px', sm: '300px' },
    objectFit: 'scale-down',
    backgroundColor: '#fff',
    borderRadius: '6px 6px 0 0',
  },
  title: {
    ...textClampStyle,
    height: '39px',
  },
  descriptionWrapper: {
    '& > .price': {
      mt: 1,
    },
  },
  iconWrapper: {
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 2,
    ml: 'auto',
    transition: '.5s',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.success.dark,
    },
  },
};