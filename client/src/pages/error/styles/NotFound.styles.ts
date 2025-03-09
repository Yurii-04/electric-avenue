export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    rowGap: '25px',
    margin: '2em auto',
    flex: 1,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', md: 'flex-start' },
    mx: 'auto',
    maxWidth: '420px',
  },
  titleWithDescription: {
    wrapper: {
      textAlign: {
        md: 'left',
        xs: 'center'
      },
      mb: '32px'
    },
    title: {
      typography: {
        sm: 'h3',
        xs: 'h4'
      }
    },
    description: {
      typography: {
        sm: 'body1',
        xs: 'body2'
      }
    }
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
