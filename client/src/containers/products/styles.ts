export const styles = {
  container: {
    display: { xs: 'block', md: 'flex' },
    justifyContent: 'space-between',
    mb: 1
  },
  wrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gridTemplateRows: 'repeat(auto-fill, 440px)',
    mb: 3,
  },
  notFoundTitle: {
    textAlign: 'center'
  }
}