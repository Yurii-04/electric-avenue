export const styles = {
  root: {
    flex: 1,
    ml: 4,
  },
  wrapper: {
    display: 'flex', gap: 5, flexWrap: 'wrap',
  },
  groupWrapper: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  imgIcon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
    mr: 1,
  },
  ul: {
    listStyle: 'none',
    p: 0,
    m: 0,
  },
  li: {
    mb: 1,
    color: 'text.secondary',
    '&:hover': { color: 'primary.main', cursor: 'pointer' },
  }
};