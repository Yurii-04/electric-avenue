import { theme } from '~/styles/app-theme';

export const styles = {
  card: {
    maxWidth: '500px',
    height: '440px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'divider',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    backgroundColor: '#fff',
    borderRadius: '6px 6px 0 0',
    p: 2,
  },
  title: {
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    height: '40px',
  },
  descriptionWrapper: {
    p: 2,
    '& > .MuiBox-root': {
      mt: 2,
      display: 'flex',
      justifyContent: 'space-between',
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
    transition: '.5s',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    }
  },
};