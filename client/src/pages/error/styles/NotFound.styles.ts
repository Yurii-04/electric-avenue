export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    rowGap: '25px',
    margin: { xs: '5em 16px 0', md: '0 60px' },
    flex: 1,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', md: 'flex-start' },
    mx: 'auto',
    maxWidth: '420px',
  },
  textWrapper: {
    textAlign: { xs: 'center', md: 'left' },
    '& .MuiTypography-h4': {
      mb: '10px',
    },
    '& .MuiTypography-subtitle2': {
      lineHeight: '24px',
      fontWeight: '300',
    },
  },
  homePageLink: {
    mt: 4,
  },
  manImg: {
    width: '100%',
    maxHeight: { sm: '50vh', md: '90vh' },
    maxWidth: { xs: '420px', md: '520px' },
    margin: 'auto',
  },
};
