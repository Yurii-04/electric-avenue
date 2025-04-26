export const styles = {
  wrapper: {
    my: 1,
  },
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 0 },
    mt: 2,
    justifyContent: 'space-between',
  },
  productsWrapper: {
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