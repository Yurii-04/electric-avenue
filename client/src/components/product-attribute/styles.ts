export const styles = {
  wrapper: {
    backgroundColor: '#fff',
    p: 3,
    '& > .MuiTypography-root': {
      mb: 2
    }
  },
  item: {
    display: 'flex',
    justifyContent: { xs: 'space-between', sm: 'flex-start' },
    borderBottom: '1px solid',
    borderColor: 'divider',
    alignItems: 'center',
    '& > .MuiTypography-root': {
      lineHeight: 3,
      whiteSpace: 'normal',
      wordBreak: 'break-word'
    },
    '& > .MuiTypography-root:nth-of-type(1)': {
      width: {xs: 'auto', sm: '30%' },
      pr: 2
    }
  }
}