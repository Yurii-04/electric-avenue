export const styles = {
  container: {
    display: { xs: 'block', md: 'flex' },
    justifyContent: 'space-between',
    mb: 1,
  },
  wrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(auto-fit, minmax(150px, 1fr))',
      sm: 'repeat(auto-fit, minmax(220px, 1fr))',
    },
    gridTemplateRows: {
      xs: 'repeat(auto-fill, 370px)',
      sm: 'repeat(auto-fill, 470px)',
    },
    mb: 3,
  },
  notFoundTitle: {
    textAlign: 'center',
  },
};